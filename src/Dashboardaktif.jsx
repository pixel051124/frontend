import { useState } from "react";
import "./Dashboardaktif.css";

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

// ── SearchBar ────────────────────────────────────────────────────────────────

function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <div className="da-search-bar">
      <div className="da-search-wrapper">
        <span className="da-search-icon"><SearchIcon /></span>
        <input
          className="da-search-input"
          type="text"
          placeholder="Lagi cari apa hari ini?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button className="da-avatar-btn" aria-label="Profil">
        <img src={iconAvatar} alt="Profil" width={18} height={18} />
      </button>
    </div>
  );
}

// ── MenuCard ─────────────────────────────────────────────────────────────────

function MenuCard({ icon, label, iconClass, onClick }) {
  return (
    <button className="da-menu-card" onClick={onClick}>
      <div className={`da-menu-icon ${iconClass}`}>{icon}</div>
      <span>{label}</span>
    </button>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function DashboardAktif({
  customerName = "Jasmine",
  paket = { nama: "FiberX", mbps: 50, harga: "350000", aktifSampai: "5 April 2026" },
  onUpgrade,
  onLaporan,
  onBayar,
}) {
  return (
    <div className="dak-shell">
      {/* Header */}
      <div className="dak-header">
        <SearchBar />
        <div className="dak-greeting">
          <h1>Halo, {customerName} ! </h1>
          <p>Selamat datang</p>
        </div>
      </div>

      {/* Content */}
      <div className="dak-content">

        {/* Paket Card */}
        <div className="dak-paket-card">
          <p className="dak-paket-label">Paket Saat ini</p>
          <hr className="dak-divider" />
          <div className="dak-paket-info">
            <div>
              <h3 className="dak-paket-nama">
                {paket.nama} <span className="dak-paket-mbps">{paket.mbps} Mbps</span>
              </h3>
              <div className="dak-paket-detail">
                <span>{paket.mbps} Mbps</span>
                <span className="dak-divider-dot">|</span>
                <span>Unlimited</span>
              </div>
            </div>
            <button className="btn-aktif">Aktif</button>
          </div>
          <p className="dak-aktif-sampai">
            Aktif sampai <strong>{paket.aktifSampai}</strong>
          </p>
        </div>

        {/* Quick Menu */}
        <p className="dak-section-title">Quick Menu</p>
        <div className="dak-quick-grid">
          <MenuCard
            icon={<img src={iconUpgrade} alt="Upgrade" width={26} height={26} />}
            label="Upgrade Paket"
            iconClass="icon-upgrade-paket"
            onClick={onUpgrade}
          />
          <MenuCard
            icon={<img src={iconLaporan} alt="Laporan" width={26} height={26} />}
            label="Laporan"
            iconClass="icon-laporan"
            onClick={onLaporan}
          />

          {/* Tagihan Card */}
          <div className="dak-tagihan-card">
            <div className="dak-tagihan-top">
              <span className="dak-tagihan-label">tagihan bulan ini :</span>
              <span className="dak-arrow">→</span>
            </div>
            <div className="dak-tagihan-bottom">
              <span className="dak-tagihan-nominal">
                Rp {paket.harga.toLocaleString?.("id-ID") || paket.harga}
              </span>
              <button className="btn-bayar" onClick={onBayar}>
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}