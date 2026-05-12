import { useState, useEffect } from "react";
import "./Dashboardadmin.css";

import iconAvatar from "./assets/icon-avatar.png";
import iconPelanggan from "./assets/pelanggan.png";
import iconInventori from "./assets/inventori.png";
import iconTeknisi from "./assets/teknisi.png";
import iconLaporan from "./assets/icon-laporan.png";
import iconListPembayaran from "./assets/listpembayaran.png";

// ── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#888" strokeWidth="2.5" strokeLinecap="round">
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
      <button className="da-avatar-btn">
        <img src={iconAvatar} alt="Profil" />
      </button>
    </div>
  );
}

// ── Menu Card ────────────────────────────────────────────────────────────────

function MenuCard({ icon, label, onClick, delay = 0 }) {
  return (
    <button
      className="da-menu-card"
      onClick={onClick}
      style={{ animationDelay: `${delay}s` }}
    >
      <img src={icon} alt={label} width={72} height={72} className="da-menu-icon" />
      <span className="da-menu-label">{label}</span>
    </button>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function DashboardAdmin({
  adminName,
  onPelanggan,
  onInventori,
  onTeknisi,
  onLaporan,
  onListPembayaran,
}) {
  const [namaAdmin, setNamaAdmin] = useState("Admin");

  // ambil dari props atau localStorage
  useEffect(() => {
    if (adminName) {
      setNamaAdmin(adminName);
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.name) {
        setNamaAdmin(user.name);
      }
    }
  }, [adminName]);

  return (
    <div>
      {/* Header */}
      <div className="da-header">
        <SearchBar />
        <div className="da-greeting">
          <h1>Halo, {namaAdmin} ! 👋</h1>
          <p>Selamat Datang Kembali</p>
        </div>
      </div>

      {/* Content */}
      <div className="da-content">
        <div className="da-grid">
          <MenuCard icon={iconPelanggan} label="Pelanggan" onClick={onPelanggan} delay={0.10} />
          <MenuCard icon={iconInventori} label="Inventory" onClick={onInventori} delay={0.15} />
          <MenuCard icon={iconTeknisi} label="Teknisi" onClick={onTeknisi} delay={0.20} />
          <MenuCard icon={iconLaporan} label="Laporan" onClick={onLaporan} delay={0.25} />
        </div>

        <MenuCard
          icon={iconListPembayaran}
          label="List Pembayaran"
          onClick={onListPembayaran}
          delay={0.30}
        />
      </div>
    </div>
  );
}