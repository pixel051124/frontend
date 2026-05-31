import React from "react";
import "./FotoKtp.css";

export default function FotoKtp({ onKembali, data }) {
  return (
    <div className="fktp-container">
      <h2 className="fktp-page-title">Berkas KTP Pelanggan</h2>
      
      <div className="fktp-card">
        <h3 className="fktp-card-title">Verifikasi Identitas</h3>
        
        <div className="fktp-image-placeholder">
          {data?.foto_ktp ? (
            <img
              src={`https://backend-appv2-production.up.railway.app/storage/${data.foto_ktp}`}
              alt="Foto KTP"
              style={{
                width: "100%",
                borderRadius: "10px",
                objectFit: "cover"
              }}
            />
          ) : (
            <span style={{ color: "#aaa", fontSize: "13px" }}>Tidak ada foto KTP</span>
          )}
        </div>
        
        <p className="fktp-desc">
          Foto KTP atas nama <strong>{data?.nama_lengkap || "-"}</strong> untuk keperluan validasi alamat pendaftaran:
          <br />
          <span className="fktp-alamat-text">{data?.alamat || "-"}</span>
        </p>
        
        <button className="fktp-btn-kembali" onClick={onKembali}>
          Kembali
        </button>
      </div>
    </div>
  );
}