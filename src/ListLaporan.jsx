import "./ListLaporan.css";
import { useEffect, useState } from "react";

// ── CARD ─────────────────────────────────────────
function LaporanCard({ item, onKirimTeknisi, onViewFoto }) {
  return (
    <div className="ll-card">
      <div className="ll-row">
        <span className="ll-label">Nama</span>
        <span className="ll-sep">:</span>
        <span className="ll-value">{item.nama}</span>
      </div>

      <div className="ll-row">
        <span className="ll-label">No Hp</span>
        <span className="ll-sep">:</span>
        <span className="ll-value">{item.no_hp}</span>
      </div>

      <div className="ll-row">
        <span className="ll-label">Lampiran</span>
        <span className="ll-sep">:</span>
        <span
          className="ll-value"
          style={{
            cursor: "pointer",
            color: "#5b7fe8",
            textDecoration: "underline",
            fontWeight: "600",
          }}
          onClick={() => onViewFoto(item)}
        >
          lihat.png
        </span>
      </div>

      <div className="ll-row">
        <span className="ll-label">Deskripsi</span>
        <span className="ll-sep">:</span>
        <span className="ll-value">{item.deskripsi}</span>
      </div>

      {/* 🔥 ACTION / STATUS */}
      <div className="ll-btn-wrapper">

        {/* kalau masih pending */}
        {item.status === "pending" && (
          <button
            className="ll-btn-kirim"
            onClick={() => onKirimTeknisi(item)}
          >
            Kirim ke Teknisi
          </button>
        )}

        {/* kalau sudah dikirim / proses / selesai */}
        {item.status !== "pending" && (
          <span
            className={`ll-status 
              ${item.status === "dikirim" ? "wait" : ""}
              ${item.status === "diproses" ? "proses" : ""}
              ${item.status === "selesai" ? "selesai" : ""}
            `}
          >
            {item.status === "dikirim" && "Menunggu"}
            {item.status === "diproses" && "Diproses"}
            {item.status === "selesai" && "Selesai"}
          </span>
        )}

      </div>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────
export default function ListLaporan({ onBack, onViewFoto }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://backend-appv2-production.up.railway.app/api/laporan")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.log(err));
  }, []);

  const handleKirimTeknisi = (item) => {
    fetch(`https://backend-appv2-production.up.railway.app/api/laporan/${item.id}/kirim`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then(() => {
        // update UI langsung
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, status: "dikirim" } : i
          )
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="da-container">
      {/* HEADER */}
      <div className="ll-header">
        <button className="ll-back-btn" onClick={onBack}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="ll-title">Laporan</h1>
      </div>

      {/* CONTENT */}
      <div className="ll-content">
        {items.map((item) => (
          <LaporanCard
            key={item.id}
            item={item}
            onKirimTeknisi={handleKirimTeknisi}
            onViewFoto={onViewFoto}
          />
        ))}
      </div>
    </div>
  );
}