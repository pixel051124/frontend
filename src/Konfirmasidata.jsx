import "./Konfirmasidata.css";

export default function KonfirmasiData({ onKembali }) {
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
    <div className="konfirmasi-shell">
      {/* Header */}
      <div className="konfirmasi-header">
        <h2>Pendaftaran</h2>
      </div>

      {/* Card */}
      <div className="konfirmasi-content">
        <div className="konfirmasi-card">
          {/* Ikon centang */}
          <div className="check-circle">
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

          <h3 className="konfirmasi-title">Data Berhasil Dikirim !</h3>
          <p className="konfirmasi-time">{formatted}</p>

          <p className="konfirmasi-desc">
            Proses Pendaftaran Berhasil, silahkan tunggu beberapa menit, jika
            tidak ada respon silahkan hubungi admin
          </p>

          <button className="btn-kembali" onClick={onKembali}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}