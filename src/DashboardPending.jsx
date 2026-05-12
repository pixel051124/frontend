import { useState } from "react";
import "./DashboardPending.css";

import iconAvatar from "./assets/icon-avatar.png";
import iconUpgrade from "./assets/icon-upgrade.png";
import iconLaporan from "./assets/icon-laporan.png";

// ── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#aaa" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const AvatarIcon = () => (
  <img src={iconAvatar} alt="Profil" width={18} height={18} />
);

const PlusIcon = () => (
  <img src={iconUpgrade} alt="Upgrade Paket" width={26} height={26} />
);

const WarningIcon = () => (
  <img src={iconLaporan} alt="Laporan" width={26} height={26} />
);

// ── SearchBar ────────────────────────────────────────────────────────────────

function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <div className="search-bar">
      <div className="search-wrapper">
        <span className="search-icon"><SearchIcon /></span>
        <input
          className="search-input"
          type="text"
          placeholder="Lagi cari apa hari ini?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button className="avatar-btn" aria-label="Profil">
        <AvatarIcon />
      </button>
    </div>
  );
}

// ── MenuCard ─────────────────────────────────────────────────────────────────

function MenuCard({ icon, label, iconClass, onClick }) {
  return (
    <button className="menu-card" onClick={onClick}>
      <div className={`menu-icon ${iconClass}`}>{icon}</div>
      <span>{label}</span>
    </button>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function DashboardPending({
  customerName = "Jasmine",
  paket = { nama: "FiberX", mbps: 50 },
  onUpgrade,
  onLaporan,
  onSedangDiproses
}) {
  return (
    <div>
      {/* Header */}
      <div className="dp-header">
        <SearchBar />
        <div className="dp-greeting">
          <h1>Halo, {customerName} ! 👋</h1>
          <p>Selamat datang</p>
        </div>
      </div>

      {/* Content */}
      <div className="dp-content">

        {/* Paket Card */}
        <div className="dp-paket-card">
          <p className="dp-paket-label">Paket Saat ini</p>
          <hr className="dp-divider" />
          <div className="dp-paket-info">
            <div>
              <h3 className="dp-paket-nama">
                {paket.nama} <span className="dp-paket-mbps">{paket.mbps} Mbps</span>
              </h3>
              <div className="dp-paket-detail">
                <span>{paket.mbps} Mbps</span>
                <span className="dp-divider-dot">|</span>
                <span>Unlimited</span>
              </div>
            </div>
            <button className="btn-proses" onClick={onSedangDiproses}>Sedang Diproses</button>
          </div>
        </div>

        {/* Quick Menu */}
        <p className="dp-section-title">Quick Menu</p>
        <div className="dp-quick-grid">
          <MenuCard
            icon={<PlusIcon />}
            label="Upgrade Paket"
            iconClass="icon-upgrade-paket"
            onClick={onUpgrade}
          />
          <MenuCard
            icon={<WarningIcon />}
            label="Laporan"
            iconClass="icon-laporan"
            onClick={onLaporan}
          />

          {/* Tagihan Card */}
          <div className="dp-tagihan-card">
            <div className="dp-tagihan-top">
              <span className="dp-tagihan-label">tagihan bulan ini :</span>
              <span className="dp-arrow">→</span>
            </div>
            <div className="dp-tagihan-bottom">
              <span className="dp-tagihan-nominal">Rp -</span>
              <button className="btn-bayar" disabled>Bayar Sekarang</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}