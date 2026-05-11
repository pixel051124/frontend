import { useState, useEffect } from "react";
import "./Pendaftaran.css";

import iconLeft from "./assets/left.png";
import iconKamera from "./assets/kamera.png";
import iconUpload from "./assets/upload.png";

export default function Pendaftaran({ onBack, onKirim, isUpgrade }) {
  const [paketList, setPaketList] = useState([]);
  const [selectedPaket, setSelectedPaket] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);

  // 
  const user = JSON.parse(localStorage.getItem("user"));

  // ── GET DATA PAKET ─────────────────────────────
  useEffect(() => {
    fetch("backend-appv2-production.up.railway.app/api/paket")
      .then((res) => res.json())
      .then((data) => setPaketList(data))
      .catch((err) => console.error("Error ambil paket:", err));
  }, []);

  // ── HANDLE FILE ───────────────────────────────
  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  // ── HANDLE KIRIM ──────────────────────────────
  const handleKirim = async () => {
    if (!selectedPaket) return alert("Pilih paket terlebih dahulu!");
    if (!fullName) return alert("Isi Full Name terlebih dahulu!");
    if (!phone) return alert("Isi Phone Number terlebih dahulu!");
    if (!address) return alert("Isi Address terlebih dahulu!");

    if (!user) {
      alert("User tidak ditemukan, silakan login ulang!");
      return;
    }

    try {
      const res = await fetch("backend-appv2-production.up.railway.app/api/pendaftaran", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id, 
          paket_id: selectedPaket.id,
          nama_lengkap: fullName,
          no_hp: phone,
          alamat: address, // optional tapi lebih lengkap
          foto_ktp: file ? file.name : null,

          tipe: isUpgrade ? "upgrade" : "baru",
        }),
      });

      const data = await res.json();

      console.log("STATUS:", res.status);
      console.log("RESPONSE:", data);

      if (!res.ok) {
        alert(data.message || "Gagal kirim data!");
        return;
      }

      // pindah ke halaman berikutnya
      onKirim(selectedPaket);

    } catch (error) {
      console.error("ERROR:", error);
      alert("Terjadi error koneksi!");
    }
  };

  return (
    <div className="pendaftaran-shell">
      {/* Header */}
      <div className="pend-header">
        <button className="back-btn" onClick={onBack}>
          <img src={iconLeft} alt="Kembali" width={20} height={20} />
        </button>
        <h2>
          {isUpgrade ? "Upgrade Paket" : "Pendaftaran"}
        </h2>
        <div style={{ width: 32 }} />
      </div>

      {/* Content */}
      <div className="pend-content">
        <p className="pend-subtitle">
          Silahkan pilih paket dan isi data diri sesuai kebutuhan...
        </p>

        {/* Paket */}
        {paketList.map((paket) => (
          <div
            key={paket.id}
            className={`paket-card ${
              selectedPaket?.id === paket.id ? "paket-selected" : ""
            }`}
          >
            <div className="paket-top">
              <div>
                <h3 className="paket-nama">{paket.nama_paket}</h3>
                <div className="paket-detail">
                  <span>Paket Internet Unlimited</span>
                </div>
              </div>
            </div>

            <div className="paket-bottom">
              <p className="paket-harga">
                <span className="rp">Rp</span>{" "}
                <strong>{paket.harga.toLocaleString()}</strong>{" "}
                <span className="bulan">/ Bulan</span>
              </p>

              <button
                className={`btn-pilih ${
                  selectedPaket?.id === paket.id
                    ? "btn-pilih-active"
                    : ""
                }`}
                onClick={() => setSelectedPaket(paket)}
              >
                Pilih
              </button>
            </div>
          </div>
        ))}

        {/* Form */}
        <div className="form-section">
          <label className="form-label">Full Name</label>
          <input
            className="form-input"
            type="text"
            placeholder="Please insert your full name here."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label className="form-label">Phone Number</label>
          <input
            className="form-input"
            type="tel"
            placeholder="Please insert your number here."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label className="form-label">Address</label>
          <textarea
            className="form-input form-textarea"
            placeholder="Please enter your full address here."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* Upload */}
          <div className="upload-label-row">
            <img src={iconKamera} alt="kamera" width={18} height={18} />
            <label className="form-label" style={{ margin: 0 }}>
              Attach your ID card photo
            </label>
          </div>

          <label className="upload-box">
            <input
              type="file"
              accept="image/*,.pdf"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <img
              src={iconUpload}
              alt="upload"
              width={28}
              height={28}
              className="upload-icon"
            />
            <span className="upload-text">
              {file ? file.name : "Upload Additional file"}
            </span>
            <span className="upload-hint">
              Attach file. File size of your documents should not exceed 10MB
            </span>
          </label>
        </div>
      </div>

      {/* Button */}
      <div className="pend-footer">
        <button type="button" className="btn-kirim" onClick={handleKirim}>
          Kirim
        </button>
      </div>
    </div>
  );
}