import "./KonfirmasiPembayaran.css";

export default function KonfirmasiPembayaran({ onKembali, paket = { nama: "FiberX", mbps: 50 } }) {
  const now = new Date();
  const formatted = now.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return (
    <div className="kp-shell">
      {/* Header */}
      <div className="kp-header">
        <h2>Pembayaran</h2>
      </div>

      {/* Card */}
      <div className="kp-content">
        <div className="kp-card">
          {/* Ikon centang */}
          <div className="kp-check-circle">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h3 className="kp-title">Pembayaran Berhasil !</h3>
          <p className="kp-time">{formatted}</p>

          <p className="kp-desc">
            Your Payments for {paket.nama} {paket.mbps} Mbps plan has been successfully processed.
          </p>

          <button className="kp-btn-kembali" onClick={onKembali}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}