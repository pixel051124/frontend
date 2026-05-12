import { useState, useEffect } from "react";
import "./Listteknisi.css";
import iconLeft from "./assets/left.png";
import iconUser from "./assets/icon.png";

export default function ListTeknisi({ onBack }) {
  const [teknisi, setTeknisi] = useState([]);

useEffect(() => {
  fetch("https://backend-appv2-production.up.railway.app/api/teknisi")
    .then(res => res.json())
    .then(data => {
      console.log("DATA TEKNISI:", data); 
      setTeknisi(data);
    })
    .catch(err => console.log(err));
}, []);

  return (
    <div className="da-container">
      {/* Header */}
      <div className="lt-header">
        <button className="lt-back-btn" onClick={onBack}>
          <img src={iconLeft} alt="Kembali" width={20} height={20} />
        </button>
        <h2>Teknisi</h2>
        <div style={{ width: 32 }} />
      </div>

      {/* List */}
      <div className="lt-content">
        {teknisi.map((t) => (
          <div key={t.id} className="lt-card">
            {/* Avatar */}
            <div className="lt-avatar">
              <img src={iconUser} alt="user" width={36} height={36} />
            </div>

            {/* Info */}
            <div className="lt-info">
              <p className="lt-nama">{t.name}</p>
              <p className="lt-telp">{t.no_hp || "-"}</p>
              <p className="lt-alamat">{t.alamat || "-"}</p>
            </div>

            {/* Status */}
            <button className={`lt-status ${t.status === "aktif" ? "lt-status-aktif" : "lt-status-offline"}`}>
              {t.status === "aktif" ? "Aktif" : "Offline"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}