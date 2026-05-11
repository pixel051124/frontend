import React from "react";
import "./FotoBuktiPembayaran.css";

// Ganti props 'paket' menjadi 'data'
export default function FotoBuktiPembayaran({ onKembali, data }) {
  return (
    <div className="fbp-shell">
      <h2 className="fbp-page-title">Bukti Pembayaran</h2>
      
      <div className="fbp-card">
        <h3 className="fbp-card-title">Pembayaran Berhasil !</h3>
        
        <div className="fbp-image-placeholder">
          <img
            src={`https://backend-appv2-production.up.railway.app/storage/${data?.bukti}`}
            alt="Bukti Pembayaran"
            style={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: "10px",
              objectFit: "cover"
            }}
          />
        </div>
        
        <p className="fbp-desc">
          Pembayaran atas nama <strong>{data?.nama}</strong> untuk paket 
          <strong> {data?.paket_nama}</strong> telah berhasil diproses.
        </p>
        
        <button className="fbp-btn-kembali" onClick={onKembali}>
          Kembali
        </button>
      </div>
    </div>
  );
}