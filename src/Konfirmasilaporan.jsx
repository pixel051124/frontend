import "./Konfirmasilaporan.css";

export default function KonfirmasiLaporan({ onKembali }) {
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
    <div>
      {/* Header */}
      <div className="kl-header">
        <h2>Pembayaran</h2>
      </div>

      {/* Card */}
      <div className="kl-content">
        <div className="kl-card">
          {/* Ikon centang */}
          <div className="kl-check-circle">
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

          <h3 className="kl-title">Laporan Terkirim !</h3>
          <p className="kl-time">{formatted}</p>

          <p className="kl-desc">
            Laporan berhasil terkirim terus pantau Whats app anda untuk informasi lebih lanjut
          </p>

          <button className="kl-btn-kembali" onClick={onKembali}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}