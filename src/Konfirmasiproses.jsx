import "./Konfirmasiproses.css";
import iconWarning from "./assets/icon-laporan.png";

export default function KonfirmasiProses({ onKembali }) {
  return (
    <div>
      {/* Header */}
      <div className="kproses-header">
        <h2>Pembayaran</h2>
      </div>

      {/* Card */}
      <div className="kproses-content">
        <div className="kproses-card">
          <img src={iconWarning} alt="warning" className="kproses-icon" />

          <h3 className="kproses-title">Pendaftaran dalam proses!</h3>

          <p className="kproses-desc">
            Pendaftaran paket anda masih dalam proses mohon tunggu beberapa saat lagi!!
          </p>

          <button className="kproses-btn-kembali" onClick={onKembali}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}