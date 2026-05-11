import { useEffect, useState } from "react";
import "./ListPembayaran.css";

const formatFileName = (filename) => {
  if (!filename) return "-";
  const ext = filename.split('.').pop(); // png/jpg
  return `bukti.${ext}`;
};

function PembayaranCard({ item, onApprove, onViewBukti }) {
  return (
    <div className="lpb-card">

      {/* Nama */}
      <div className="lpb-row">
        <span className="lpb-label">Nama</span>
        <span className="lpb-sep">:</span>
        <span className="lpb-value">{item.nama}</span>
      </div>

      {/* Paket */}
      <div className="lpb-row">
        <span className="lpb-label">Paket</span>
        <span className="lpb-sep">:</span>
        <span className="lpb-value">{item.paket_nama}</span>
      </div>

      {/* Status */}
      <div className="lpb-row">
        <span className="lpb-label">Status</span>
        <span className="lpb-sep">:</span>
        <span className={`lpb-value ${item.status === "lunas" ? "lpb-status-lunas" : "lpb-status-pending"}`}>
          {item.status === "lunas" ? "Lunas" : "Pending"}
        </span>
      </div>

      <div className="lpb-row">
          <span className="lpb-label">Bukti TF</span>
          <span className="lpb-sep">:</span>

      <div className="lpb-bukti-content">
          <span
            className="lpb-filename clickable"
            onClick={() => onViewBukti(item)}
          >
            {formatFileName(item.bukti)}
          </span>

      <div className="lpb-bukti-action">
          {item.status === "pending" ? (
            <button
              className="lpb-btn-approve"
             onClick={() => onApprove(item.id)}
            >
              Approve
            </button>
          ) : (
            <span className="lpb-approved-badge">✓ Lunas</span>
          )}
        </div>
      </div>
    </div>
</div>
  );
}

export default function ListPembayaran({ onBack, onViewBukti }) {

  const [items, setItems] = useState([]);

  // GET DATA DARI BACKEND
  useEffect(() => {
    fetch("backend-appv2-production.up.railway.app/api/pembayaran")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.log(err));
  }, []);

  // APPROVE PEMBAYARAN
  const handleApprove = async (id) => {
    await fetch(`backend-appv2-production.up.railway.app/api/pembayaran/${id}`, {
      method: "PUT",
    });

    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: "lunas" } : item
      )
    );
  };

  return (
    <div className="lpb-shell">

      {/* Header */}
      <div className="lpb-header">
        <button className="lpb-back-btn" onClick={onBack}>
          ←
        </button>
        <h1 className="lpb-title">List Pembayaran</h1>
      </div>

      {/* Content */}
      <div className="lpb-content">
        {items.map((item) => (
          <PembayaranCard
            key={item.id}
            item={item}
            onApprove={handleApprove}
            onViewBukti={onViewBukti}
          />
        ))}
      </div>

    </div>
  );
}