import { useEffect, useState } from "react";
import "./Inventory.css";

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#aaa" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// CARD
function InventoryCard({ item, onChange, onDelete }) {
  return (
    <div className="inv-card">
      <div className="inv-card-left">
        <span className="inv-card-name">{item.nama}</span>
        <span className="inv-card-stok">Stok : {item.stok} Unit</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div className="inv-counter">
          <button
            className="inv-counter-btn"
            onClick={() => onChange(item.id, -1)}
          >−</button>

          <span className="inv-counter-val">{item.perubahan ?? 0}</span>

          <button
            className="inv-counter-btn"
            onClick={() => onChange(item.id, 1)}
          >+</button>
        </div>

        <button
          className="inv-btn-delete"
          onClick={() => onDelete(item.id)}
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default function Inventory({ onBack }) {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  // FORM
  const [showForm, setShowForm] = useState(false);
  const [namaBaru, setNamaBaru] = useState("");
  const [stokBaru, setStokBaru] = useState("");
  

  // GET DATA
  useEffect(() => {
    fetch("https://backend-appv2-production.up.railway.app/api/inventory")
      .then(res => res.json())
      .then(data => {
        setItems(data.map(i => ({ ...i, perubahan: 0 })));
      });
  }, []);

  // COUNTER
  const handleChange = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, perubahan: Math.max(0, item.perubahan + delta) }
          : item
      )
    );
  };

  //UPDATE STOK
  const handleUpdate = () => {
    items.forEach(item => {
      if (item.perubahan > 0) {
        const newStok = item.stok + item.perubahan;

        fetch(`https://backend-appv2-production.up.railway.app/api/inventory/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stok: newStok })
        });
      }
    });

    // update local
    setItems(prev =>
      prev.map(item => ({
        ...item,
        stok: item.stok + item.perubahan,
        perubahan: 0
      }))
    );

  };

  // TAMBAH BARANG
  const handleTambahBarang = () => {
    if (!namaBaru || !stokBaru) {
      alert("Isi semua field!");
      return;
    }

    fetch("https://backend-appv2-production.up.railway.app/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nama: namaBaru,
        stok: Number(stokBaru)
      })
    })
      .then(res => res.json())
      .then(data => {
        setItems(prev => [...prev, { ...data, perubahan: 0 }]);
      });

    setNamaBaru("");
    setStokBaru("");
    setShowForm(false);
  };

  const handleDelete = async (id) => {
  try {
    await fetch(`https://backend-appv2-production.up.railway.app/api/inventory/${id}`, {
      method: "DELETE",
    });

    // baru update state setelah backend sukses
    setItems((prev) => prev.filter((item) => item.id !== id));

  } catch (error) {
    console.error("Gagal hapus:", error);
  }
};

  const filtered = items.filter(i =>
    i.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      {/* HEADER */}
      <div className="inv-header">
        <button className="inv-back-btn" onClick={onBack}>
          ←
        </button>
        <h1 className="inv-title">Inventory</h1>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="inv-form">
          <input
            className="inv-input"
            placeholder="Nama barang"
            value={namaBaru}
            onChange={(e) => setNamaBaru(e.target.value)}
          />
          <input
            className="inv-input"
            type="number"
            placeholder="Jumlah stok"
            value={stokBaru}
            onChange={(e) => setStokBaru(e.target.value)}
          />
          <button className="inv-btn-save" onClick={handleTambahBarang}>
            Simpan
          </button>
        </div>
      )}

      {/* SEARCH */}
      <div className="inv-search-row">
        <div className="inv-search-wrapper">
          <span className="inv-search-icon"><SearchIcon /></span>
          <input
            className="inv-search-input"
            placeholder="Cari barang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="inv-btn-update" onClick={handleUpdate}>
          Update
        </button>
      </div>

      {/* LIST */}
      <div className="inv-content">
        {filtered.map((item) => (
          <InventoryCard
            key={item.id}
            item={item}
            onChange={handleChange}
            onDelete={handleDelete}
        />
      ))}
      </div>

      {/* FLOAT BUTTON */}
      <button
        className="inv-btn-add"
        onClick={() => setShowForm(!showForm)}
      >
        +
      </button>

    </div>
  );
}