import { useState } from "react";
import "./CustomerDashboard.css";
import iconAvatar from "./assets/icon-avatar.png";
import iconUpgrade from "./assets/icon-upgrade.png";
import iconLaporan from "./assets/icon-laporan.png";

// ── Icon Components ──────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#aaa"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
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

// ── Sub-components ───────────────────────────────────────────────────────────

function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="search-bar">
      <div className="search-wrapper">
        <span className="search-icon">
          <SearchIcon />
        </span>
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

function PackageCard({ onChoose }) {
  return (
    <div className="package-card">
      <h3>Tidak ada paket yang terdaftar !</h3>
      <p>
        Anda belum memiliki paket internet.
        <br />
        Yuk, pilih paket untuk mulai menggunakan layanan.
      </p>
      <button className="btn-primary" onClick={onChoose}>
        Pilih Paket Internet
      </button>
    </div>
  );
}

function MenuCard({ icon, label, onClick }) {
  return (
    <button className="menu-card" onClick={onClick}>
      <div className={`menu-icon icon-${label.toLowerCase().replace(" ", "-")}`}>
        {icon}
      </div>
      <span>{label}</span>
    </button>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function CustomerDashboard({ onPilihPaket, onLaporan }) {
  // ambil user dari localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "Jasmine";

  const handleUpgrade = () => {
    onPilihPaket();
  };

  const handleLaporan = () => {
    onLaporan();
  };

  return (
    <div className="phone-shell">
      {/* Header */}
      <div className="header">
        <SearchBar />
        <div className="greeting">
          <h1>Halo, {name} ! 👋</h1>
          <p>Selamat datang</p>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <PackageCard onChoose={onPilihPaket} />

        <p className="section-title">Quick Menu</p>

        <div className="quick-grid">
          <MenuCard
            icon={<PlusIcon />}
            label="Upgrade Paket"
            onClick={handleUpgrade}
          />
          <MenuCard
            icon={<WarningIcon />}
            label="Laporan"
            onClick={handleLaporan}
          />

          <div className="bottom-card">
            <span>— Segera Hadir —</span>
          </div>
        </div>
      </div>
    </div>
  );
}