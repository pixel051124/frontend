import React from "react";
import "./FotoKtp.css";

export default function FotoKtp({ onKembali, data }) {
  return (
    <div className="fktp-main-wrapper">
      <h2 className="fktp-page-title">Berkas KTP Pelanggan</h2>
      
      <div className="fktp-card">
        <h3 className="fktp-card-title">Verifikasi Identitas</h3>
        
        <div className="fktp-image-placeholder">
          {data?.foto_ktp ? (
            <img
              src={`https://backend-appv2-production.up.railway.app/storage/${data.foto_ktp}`}
              alt="Foto KTP Pelanggan"
            />
          ) : (
            <span className="fktp-no-image">Tidak ada foto KTP</span>
          )}
        </div>
        
        <p className="fktp-desc">
          Foto KTP atas nama <strong>{data?.nama_lengkap || "-"}</strong> untuk keperluan validasi alamat pendaftaran:
        </p>

        <div className="fktp-alamat-box">
          <strong>Alamat:</strong> {data?.alamat || "-"}
        </div>
        
        <button className="fktp-btn-kembali" onClick={onKembali}>
          Kembali
        </button>
      </div>
    </div>
  );
}