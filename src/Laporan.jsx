import { useState } from "react";
import "./Laporan.css";
import iconLeft from "./assets/left.png";

export default function Laporan({ onBack, onKirim }) {
  const [nama, setNama] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState(null);

  const handleFotoChange = (e) => {
    if (e.target.files[0]) setFoto(e.target.files[0]);
  };

  const handleKirim = async () => {
  if (!nama) return alert("Isi nama terlebih dahulu!");
  if (!nomorHp) return alert("Isi nomor HP terlebih dahulu!");
  if (!deskripsi) return alert("Deskripsikan kendala terlebih dahulu!");
  if (!/^\d+$/.test(nomorHp)) {
  return alert("Nomor HP harus berupa angka!");
}

  const formData = new FormData();
  formData.append("nama", nama);
  formData.append("no_hp", nomorHp);
  formData.append("deskripsi", deskripsi);
  formData.append("foto", foto);

  try {
    const res = await fetch("https://backend-appv2-production.up.railway.app/api/laporan", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Gagal kirim laporan");

    onKirim(); // pindah halaman
  } catch (err) {
    console.error(err);
    alert("Gagal kirim laporan");
  }
};

  return (
    <div>
      {/* Header */}
      <div className="lap-header">
        <button className="lap-back-btn" onClick={onBack}>
          <img src={iconLeft} alt="Kembali" width={20} height={20} />
        </button>
        <h2>Laporan</h2>
        <div style={{ width: 32 }} />
      </div>

      {/* Content */}
      <div className="lap-content">
        <div className="lap-card">
          <h3 className="lap-title">Buat Laporan</h3>
          <p className="lap-subtitle">
            Ceritakan kendala yang Anda alami, agar kami dapat membantu Anda.
          </p>

          {/* Nama */}
          <label className="lap-label-dark">Nama</label>
          <input
            className="lap-input"
            type="text"
            placeholder="Isi nama lengkap anda"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          {/* Nomor HP */}
          <label className="lap-label-dark">Nomor Hp</label>
          <input
            className="lap-input"
            type="tel"
            placeholder="Isi nomor handphone anda"
            value={nomorHp}
            onChange={(e) => setNomorHp(e.target.value)}
          />

          {/* Deskripsi */}
          <label className="lap-label">Deskripsikan Kendala</label>
          <textarea
            className="lap-textarea"
            placeholder="Jelaskan masalah yang Anda alami secara detail..."
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />

          {/* Lampiran Foto */}
          <label className="lap-label">Lampirkan foto pendukung</label>
          <label className="lap-upload-box">
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFotoChange}
            />
            <span className="lap-plus">+</span>
            <span className="lap-upload-text">
              {foto ? foto.name : "Letakkan foto pendukung anda disini..."}
            </span>
          </label>
        </div>
      </div>

      {/* Footer */}
      <div className="lap-footer">
        <button className="lap-btn-kirim" onClick={handleKirim}>
          Kirim
        </button>
      </div>
    </div>
  );
}