import { useState, useEffect } from "react";
import "./InventoryTeknisi.css";
import iconLeft from "./assets/left.png";

const dummyItems = [
  { id: 1, nama: "Router", stok: 150 },
  { id: 2, nama: "Kabel Fiber Optic", stok: 1000 },
  { id: 3, nama: "Optical Fiber Cable", stok: 500 },
  { id: 4, nama: "Switch Hub", stok: 75 },
];

export default function InventoryTeknisi({ onBack }) {
  const [search, setSearch] = useState("");
 const [selectedItem, setSelectedItem] = useState(null);
  const [jumlah, setJumlah] = useState(2);
  const [showDropdown, setShowDropdown] = useState(false);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    fetch("https://backend-appv2-production.up.railway.app/api/inventory")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.log(err));
  }, []);
  
  const filtered = items.filter((i) =>
    i.nama.toLowerCase().includes(search.toLowerCase())
  );

  const handleKurang = () => {
    if (jumlah > 1) setJumlah(jumlah - 1);
  };

  const handleTambah = () => setJumlah(jumlah + 1);

const handleUpdate = () => {
  if (!selectedItem) {
    alert("Pilih item dulu!");
    return;
  }

  const formData = new FormData();
  formData.append("id", selectedItem);
  formData.append("jumlah", jumlah);

  fetch("https://backend-appv2-production.up.railway.app/api/inventory/update-stok", {
    method: "POST",
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      console.log("RESPONSE:", data);

      if (data.error) {
        alert(data.error);
        return;
      }

      fetch("https://backend-appv2-production.up.railway.app/api/inventory")
        .then(res => res.json())
        .then(data => setItems(data));
    })
    .catch(err => console.log(err));
};

  return (
    <div>
      {/* Header */}
      <div className="inv-header">
        <button className="inv-back-btn" onClick={onBack}>
          <img src={iconLeft} alt="Kembali" width={24} height={24} />
        </button>
        <h2>Inventory</h2>
      </div>

      {/* Content */}
      <div className="inv-content">

        {/* Search */}
        <div className="inv-search-wrapper">
          <svg className="inv-search-icon" width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="inv-search-input"
            type="text"
            placeholder="Cari Items di Inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Item Tersedia */}
        <p className="inv-section-title">Item Tersedia</p>
        <div className="inv-list">
          {filtered.map((item) => (
            <div key={item.id} className="inv-item-card">
              <p className="inv-item-nama">{item.nama}</p>
              <p className="inv-item-stok">Stok : {item.stok} Unit</p>
            </div>
          ))}
        </div>

        {/* Permintaan Item */}
        <p className="inv-section-title">Permintaan Item</p>
        <div className="inv-request-card">
          <p className="inv-request-label">Pilih Item</p>

          {/* Dropdown */}
          <div className="inv-request-row">
            <div className="inv-dropdown" onClick={() => setShowDropdown(!showDropdown)}>
              <span>
                {items.find(i => i.id === selectedItem)?.nama || "Pilih Item"}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#555" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
              {showDropdown && (
                <div className="inv-dropdown-menu">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="inv-dropdown-item"
                      onClick={() => {
                      setSelectedItem(item.id);
                      setShowDropdown(false);
                    }}
                  >
                    {item.nama}
                  </div>
                ))}
                </div>
              )}
            </div>

            {/* Counter */}
            <div className="inv-counter">
              <button className="inv-counter-btn" onClick={handleKurang}>−</button>
              <span className="inv-counter-val">{jumlah}</span>
              <button className="inv-counter-btn" onClick={handleTambah}>+</button>
            </div>
          </div>

          {/* Update Button */}
          <button className="inv-btn-update" onClick={handleUpdate}>
            Update Inventory
          </button>
        </div>

      </div>
    </div>
  );
}