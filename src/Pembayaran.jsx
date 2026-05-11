import { useState } from "react";
import "./Pembayaran.css";
import iconLeft from "./assets/left.png";

export default function Pembayaran({
  user,
  onBack,
  onKirim,
  paket = { nama: "FiberX", mbps: 50, harga: "480.000", dueBy: "5 April 2026" },
}) {
  const [bukti, setBukti] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) setBukti(e.target.files[0]);
  };

const handleKirim = async () => {
  if (!bukti) {
    alert("Lampirkan bukti pembayaran terlebih dahulu!");
    return;
  }

  const formData = new FormData();
  formData.append("user_id", user?.id || "");
formData.append("nama", user?.name || "");
  formData.append("paket_nama", paket?.nama);
  formData.append("mbps", paket?.mbps);
  formData.append("harga", paket?.harga);
  formData.append("bukti", bukti);
  formData.append("status", "pending");

  try {
    const res = await fetch("backend-appv2-production.up.railway.app/api/pembayaran", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Gagal kirim pembayaran");

    onKirim(); // pindah ke konfirmasi
  } catch (err) {
    console.error(err);
    alert("Gagal kirim pembayaran");
  }
};
  return (
    <div className="pay-shell">
      {/* Header */}
      <div className="pay-header">
        <button className="pay-back-btn" onClick={onBack}>
          <img src={iconLeft} alt="Kembali" width={20} height={20} />
        </button>
        <h2>Pembayaran</h2>
        <div style={{ width: 32 }} />
      </div>

      {/* Scrollable Content */}
      <div className="pay-content">

        {/* Paket Info Card */}
        <div className="pay-paket-card">
          {/* Nama Paket */}
          <h3 className="pay-paket-nama">
            {paket.nama} <span className="pay-paket-mbps">{paket.mbps} Mbps</span>
          </h3>
          <div className="pay-paket-detail">
            <span>{paket.mbps} Mbps</span>
            <span className="pay-dot">|</span>
            <span>Unlimited</span>
          </div>

          <hr className="pay-divider" />

          {/* Next Bill */}
          <div className="pay-bill-row">
            <span className="pay-bill-label">Next Bill :</span>
            <span className="pay-bill-nominal">Rp {paket.harga}</span>
          </div>

          <hr className="pay-divider" />

          {/* Due By */}
          <div className="pay-due-row">
            <span className="pay-due-label">Due By</span>
            <span className="pay-due-date">{paket.dueBy}</span>
          </div>
        </div>

        {/* Pembayaran Section Card */}
        <div className="pay-section-card">
          <h3 className="pay-section-title">Pembayaran</h3>
          <p className="pay-section-desc">
            Mohon untuk menyelesaikan pembayaran sebelum tanggal 5 guna menghindari penonaktifan layanan WiFi secara otomatis.
          </p>

          {/* Nomor Rekening */}
          <p className="pay-label">Nomor Rekening</p>
          <div className="pay-rekening-box">
            <p className="pay-rekening-text">
              Transfer ke : Mandiri{" "}
              <span className="pay-rekening-number">1480023865044</span>
            </p>
            <p className="pay-rekening-text">an.cv Pusaka Langit Media .</p>
          </div>

          {/* Lampiran */}
          <p className="pay-label">Lampirkan Bukti Pembayaran</p>
          <label className="pay-upload-box">
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <span className="pay-plus">+</span>
            <span className="pay-upload-text">
              {bukti ? bukti.name : "Letakkan foto pendukung anda disini..."}
            </span>
          </label>
        </div>

      </div>

      {/* Footer */}
      <div className="pay-footer">
        <button className="pay-btn-kirim" onClick={handleKirim}>
          Kirim
        </button>
      </div>
    </div>
  );
}