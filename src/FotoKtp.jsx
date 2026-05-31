import React from "react";
import "./FotoKtp.css";

export default function FotoKtp({ onKembali, data }) {
  return (
    <div className="da-container fktp-container">
      {/* Header Halaman */}
      <div className="fktp-header">
        <button className="fktp-back-btn" onClick={onKembali}>
          ←
        </button>
        <h1 className="fktp-title">Berkas KTP Pelanggan</h1>
      </div>
      
      {/* Konten Utama Tanpa Frame HP */}
      <div className="fktp-content">
        <div className="fktp-card">
          <h3 className="fktp-card-title">Verifikasi Identitas</h3>
          
          <div className="fktp-image-placeholder">
            {data?.foto_ktp ? (
              <img
                src={`https://backend-appv2-production.up.railway.app/storage/${data.foto_ktp}`}
                alt="Foto KTP"
              />
            ) : (
              <span style={{ color: "#aaa", fontSize: "14px" }}>Tidak ada foto KTP</span>
            )}
          </div>
          
          <p className="fktp-desc">
            Foto KTP atas nama <strong>{data?.nama_lengkap || "-"}</strong> untuk keperluan validasi alamat pendaftaran:
          </p>
          
          <div className="fktp-alamat-box">
            <strong>Alamat:</strong> {data?.alamat || "-"}
          </div>
          
          <button className="fktp-btn-kembali" onClick={onKembali}>
            Kembali ke List Pelanggan
          </button>
        </div>
      </div>
    </div>
  );
}