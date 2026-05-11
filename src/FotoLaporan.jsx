import React from "react";
import "./FotoLaporan.css";

export default function FotoLaporan({ onKembali, data }) {
  return (
    <div className="fl-shell">
      <h2 className="fl-page-title">Foto</h2>
      
      <div className="fl-card">
        <h3 className="fl-card-title">Lampiran Foto</h3>
        
        <div className="fl-image-placeholder">
  {data?.foto ? (
    <img
      src={`backend-appv2-production.up.railway.app/storage/${data.foto}`}
      alt="foto laporan"
      style={{
        width: "100%",
        borderRadius: "10px",
        objectFit: "cover"
      }}
    />
  ) : (
    <p style={{ color: "#888" }}>Tidak ada foto</p>
  )}
</div>
        
        <button className="fl-btn-kembali" onClick={onKembali}>
          Kembali
        </button>
      </div>
    </div>
  );
}