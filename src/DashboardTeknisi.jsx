import { useState } from "react";
import "./DashboardTeknisi.css";

import iconAvatar from "./assets/icon-avatar.png";
import iconTugas from "./assets/tugas.png";
import iconInventori from "./assets/inventori.png";

// ── Icons ─────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#888" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ── SearchBar ─────────────────────────────────────────────────────────────────

function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <div className="dt-search-bar">
      <div className="dt-search-wrapper">
        <span className="dt-search-icon"><SearchIcon /></span>
        <input
          className="dt-search-input"
          type="text"
          placeholder="Lagi cari apa hari ini?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button className="dt-avatar-btn" aria-label="Profil">
        <img src={iconAvatar} alt="Profil" />
      </button>
    </div>
  );
}

// ── MenuCard ──────────────────────────────────────────────────────────────────

function MenuCard({ icon, label, onClick }) {
  return (
    <button className="dt-menu-card" onClick={onClick}>
      {/* Ukuran icon diperbesar agar sesuai desain (72x72) */}
      <img src={icon} alt={label} width={72} height={72} className="dt-menu-icon" />
      <span>{label}</span>
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function DashboardTeknisi({
  teknisiName = "Rayhan",
  onTugas,
  onInventory,
  onLogout,
}) {

  return (
  <div>
    <div className="dt-header">
      <SearchBar />
      <div className="dt-greeting">
        <h1>Halo, {teknisiName} !</h1>
        <p>Selamat Datang Kembali</p>
      </div>
    </div>

    <div className="dt-content">
      <MenuCard icon={iconTugas} label="Tugas" onClick={onTugas} />
      <MenuCard icon={iconInventori} label="Inventory" onClick={onInventory} />
    </div>

    <div className="dt-footer">
      <button onClick={onLogout} className="dt-logout-btn">
        Logout
      </button>
    </div>
  </div>
);

}