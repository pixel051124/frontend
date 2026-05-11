import { useState, useEffect } from "react";
import "./Listpelanggan.css";
import iconLeft from "./assets/left.png";

export default function ListPelanggan({ onBack }) {
  const [pelanggan, setPelanggan] = useState([]);

  // ambil data dari backend
  useEffect(() => {
    fetch("https://backend-appv2-production.up.railway.app/api/pendaftaran")
      .then((res) => res.json())
      .then((data) => {
        setPelanggan(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // approve 
  const handleApprove = async (id) => {
  try {
    const res = await fetch(`https://backend-appv2-production.up.railway.app/api/pendaftaran/${id}/approve`, {
      method: "PUT",
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      alert("Gagal approve!");
      return;
    }

    // update UI
    setPelanggan((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "aktif" } : p
      )
    );

  } catch (err) {
    console.error(err);
    alert("Error koneksi!");
  }
};

  return (
    <div className="lp-shell">
      {/* Header */}
      <div className="lp-header">
        <button className="lp-back-btn" onClick={onBack}>
          <img src={iconLeft} alt="Kembali" width={20} height={20} />
        </button>
        <h2>Pelanggan</h2>
        <div style={{ width: 32 }} />
      </div>

      {/* List */}
      <div className="lp-content">
        {pelanggan.map((p) => (
          <div key={p.id} className="lp-card">
            
            <div className="lp-row">
              <span className="lp-key">Nama</span>
              <span className="lp-sep">:</span>
              <span className="lp-val">{p.nama_lengkap}</span>
            </div>

            <div className="lp-row">
              <span className="lp-key">Paket</span>
              <span className="lp-sep">:</span>
              <span className="lp-val">
                {p.paket?.nama_paket || "-"}
              </span>
            </div>

            <div className="lp-row">
              <span className="lp-key">Tipe</span>
              <span className="lp-sep">:</span>
              <span
                className="lp-val"
                style={{
                color: p.tipe === "upgrade" ? "#f59e0b" : "#22c55e",
                fontWeight: "600"
              }}
              >
                {p.tipe === "upgrade" ? "Upgrade" : "Baru"}
               </span>
            </div>

            <div className="lp-row">
              <span className="lp-key">Status</span>
              <span className="lp-sep">:</span>
              <span className={`lp-status ${
                p.status === "aktif"
                  ? "lp-status-aktif"
                  : "lp-status-pending"
              }`}>
                {p.status}
              </span>
            </div>

            <div className="lp-action">
              {p.status === "pending" ? (
                <button
                  className="btn-approve"
                  onClick={() => handleApprove(p.id)}
                >
                  Approve
                </button>
              ) : (
                <span className="lp-approved-badge">✓ Approved</span>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}