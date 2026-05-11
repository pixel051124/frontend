import { useState } from "react";
import { useEffect } from "react";
import "./TugasTeknisi.css";
import iconLeft from "./assets/left.png";

export default function TugasTeknisi({ onBack, onViewFoto }) {
  const [tugas, setTugas] = useState([]);

useEffect(() => {
  fetch("https://backend-appv2-production.up.railway.app/api/laporan")
    .then(res => res.json())
    .then(data => {
      // ambil yang sudah dikirim ke teknisi
      const filtered = data;

      // mapping biar sesuai format teknisi
      const mapped = filtered.map(item => ({
        id: item.id,
        nama: item.nama,
        noHp: item.no_hp,
        lampiran: item.foto,
        foto: item.foto,
        deskripsi: item.deskripsi,
        status: item.status
      }));

      setTugas(mapped);
    })
    .catch(err => console.log(err));
}, []);

const handleStatus = (id, currentStatus) => {
  let nextStatus = "";

  if (currentStatus === "dikirim") nextStatus = "diproses";
  else if (currentStatus === "diproses") nextStatus = "selesai";
  else return;

  fetch(`https://backend-appv2-production.up.railway.app/api/laporan/${id}/update-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: nextStatus,
    }),
  })
    .then(res => res.json())
    .then(() => {
      setTugas(prev =>
        prev.map(t =>
          t.id === id ? { ...t, status: nextStatus } : t
        )
      );
    })
    .catch(err => console.log(err));
};;

  const getButtonClass = (status) => {
  if (status === "dikirim") return "tt-btn tt-btn-mulai";
  if (status === "diproses") return "tt-btn tt-btn-diproses";
  return "tt-btn tt-btn-selesai";
};

  const getButtonLabel = (status) => {
  if (status === "dikirim") return "Mulai";
  if (status === "diproses") return "Selesaikan";
  return "Selesai";
};

return (
    <div className="tt-shell">
      {/* Header tetap sama */}
      <div className="tt-header">
        <div className="tt-header-top">
          <button className="tt-back-btn" onClick={onBack}>
            <img src={iconLeft} alt="Kembali" width={24} height={24} />
          </button>
          <h2>Tugas</h2>
          <div style={{ width: 24 }} />
        </div>
        <p className="tt-section-label">Tugas Hari Ini</p>
      </div>

      <div className="tt-content">
        {tugas.map((t) => (
          <div key={t.id} className="tt-card">
            {/* Row Nama & No Hp tetap sama */}
            <div className="tt-row">
              <span className="tt-key">Nama</span>
              <span className="tt-sep">:</span>
              <span className="tt-val">{t.nama}</span>
            </div>
            <div className="tt-row">
              <span className="tt-key">No Hp</span>
              <span className="tt-sep">:</span>
              <span className="tt-val">{t.noHp}</span>
            </div>
            
            <div className="tt-row">
              <span className="tt-key">Lampiran</span>
              <span className="tt-sep">:</span>
              {/* TAMBAHKAN onClick DI SINI */}
              <span 
                className="tt-val tt-lampiran" 
                onClick={() => onViewFoto(t)}
              >
                {t.lampiran ? "lihat.png" : "-"}
              </span>
            </div>

            <div className="tt-row tt-row-desc">
              <span className="tt-key">Deskripsi</span>
              <span className="tt-sep">:</span>
              <span className="tt-val">{t.deskripsi}</span>
            </div>
            
            {/* Action button tetap sama */}
            <div className="tt-action">
              <button
                className={getButtonClass(t.status)}
                onClick={() => handleStatus(t.id, t.status)}
                disabled={t.status === "selesai"}
              >
                {getButtonLabel(t.status)}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}