import React from "react";
import "./FotoKtp.css";

export default function FotoKtp({ onKembali, data }) {
  return (
    <div className="fbp-shell">
      <h2 className="fbp-page-title">Berkas KTP Pelanggan</h2>
      
      <div className="fbp-card">
        <h3 className="fbp-card-title">Verifikasi Identitas</h3>
        
        <div className="fbp-image-placeholder">
          {data?.foto_ktp ? (
            <img
              src={`https://backend-appv2-production.up.railway.app/storage/${data.foto_ktp}`}
              alt="Foto KTP"
              style={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: "10px",
              objectFit: "cover"
            }}
            />
          ) : (
            <span style={{ color: "#aaa", fontSize: "13px" }}>Tidak ada foto KTP</span>
          )}
        </div>
        
        <p className="fbp-desc">
          Foto KTP atas nama <strong>{data?.nama_lengkap || "-"}</strong> untuk keperluan validasi alamat pendaftaran:
          <br />
          <span className="fbp-alamat-text">{data?.alamat || "-"}</span>
        </p>
        
        <button className="fbp-btn-kembali" onClick={onKembali}>
          Kembali
        </button>
      </div>
    </div>
  );
}