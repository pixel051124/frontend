import { useState } from "react";
import SplashScreen from "./SplashScreen";
import Login from "./Login";
import SignIn from "./SignIn";
import CustomerDashboard from "./CustomerDashboard";
import Pendaftaran from "./Pendaftaran";
import Laporan from "./Laporan";
import KonfirmasiData from "./KonfirmasiData";
import DashboardPending from "./DashboardPending";
import KonfirmasiProses from "./KonfirmasiProses";
import DashboardAdmin from "./DashboardAdmin";
import ListPelanggan from "./ListPelanggan";
import DashboardAktif from "./DashboardAktif";
import Pembayaran from "./Pembayaran";
import KonfirmasiPembayaran from "./KonfirmasiPembayaran";
import KonfirmasiLaporan from "./KonfirmasiLaporan";
import ListLaporan from "./ListLaporan";
import Inventory from "./Inventory";
import ListPembayaran from "./ListPembayaran";
import ListTeknisi from "./ListTeknisi";
import FotoBuktiPembayaran from "./FotoBuktiPembayaran";
import FotoLaporan from "./FotoLaporan";
import DashboardTeknisi from "./DashboardTeknisi";
import TugasTeknisi from "./TugasTeknisi";
import InventoryTeknisi from "./InventoryTeknisi";

export default function App() {
  const [user, setUser] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [halaman, setHalaman] = useState("login");
  const [halamanSebelumnya, setHalamanSebelumnya] = useState("dashboard");

  const [selectedPaket, setSelectedPaket] = useState(null);
  const [paketUser, setPaketUser] = useState(null);
  const [pembayaranTerpilih, setPembayaranTerpilih] = useState(null);
  const [laporanTerpilih, setLaporanTerpilih] = useState(null);
  const [isUpgrade, setIsUpgrade] = useState(false);


  if (showSplash) {
  return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }
  // LOGIN (pakai data backend)
  const handleLogin = (data) => {
    
  console.log("LOGIN DATA FULL:", data);

  setUser(data.user);
  
  setPaketUser(data.paket);

  // simpan juga status pendaftaran
  const status = data.status_pendaftaran;

  if (data.user.role === "admin") {
    setHalaman("dashboardAdmin");
  
  } else if (data.user.role === "teknisi") {
  setHalaman("dashboardTeknisi");

  } else if (data.user.role === "pelanggan") {

    if (status === "pending") {
      setHalaman("pending");

    } else if (status === "aktif") {
      setHalaman("aktif");

    } else {
      // belum daftar sama sekali
      setHalaman("dashboard");
    }

  }
};

  // SIGN IN
  const handleSignIn = () => {
    setHalaman("login");
  };

  const handleLogout = () => {
  fetch("backend-appv2-production.up.railway.app/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: user.id,
    }),
  })
    .then(res => res.json())
    .then(() => {
      setUser(null);
      setHalaman("login");
    })
    .catch(err => console.log(err));
};

  return (
    <div style={styles.container}>

      {/* AUTH */}
      {halaman === "login" && (
        <Login
          onLogin={handleLogin}
          onGoSignIn={() => setHalaman("signin")}
        />
      )}

      {halaman === "signin" && (
        <SignIn
          onSignIn={handleSignIn}
          onGoLogin={() => setHalaman("login")}
        />
      )}

      {/* CUSTOMER */}
      {halaman === "dashboard" && (
        <CustomerDashboard
          customerName={user?.name || "User"}
          onPilihPaket={() => {
            setIsUpgrade(false);
            setSelectedPaket({ tipe: "baru" });
            setHalaman("pendaftaran");
          }}
          onLaporan={() => {
            setHalamanSebelumnya("dashboard");
            setHalaman("laporan");
          }}
        />
      )}

      {halaman === "pendaftaran" && (
  <Pendaftaran
    isUpgrade={isUpgrade}
    onBack={() => setHalaman(isUpgrade ? "aktif" : "dashboard")}
    onKirim={(paket) => {
      setSelectedPaket({
      ...paket,
      tipe: selectedPaket?.tipe || "baru"
    });
    setHalaman("konfirmasi");
  }}
  />
)}

      {halaman === "konfirmasi" && (
        <KonfirmasiData
          onKembali={() => setHalaman("pending")}
        />
      )}

      {halaman === "pending" && (
        <DashboardPending
          customerName={user?.name || "User"}
         paket={{
          nama: selectedPaket?.nama_paket 
              || paketUser?.nama_paket 
              || "-",

          mbps: selectedPaket?.mbps 
              || paketUser?.mbps 
              || "-",
          }}
          onUpgrade={() => setHalaman("pendaftaran")}
          onLaporan={() => {
            setHalamanSebelumnya("pending");
            setHalaman("laporan");
          }}
          onSedangDiproses={() => setHalaman("konfirmasiProses")}
        />
      )}

      {halaman === "konfirmasiProses" && (
        <KonfirmasiProses
          onKembali={() => setHalaman("pending")}
        />
      )}

      {halaman === "laporan" && (
        <Laporan
          onBack={() => setHalaman(halamanSebelumnya)}
          onKirim={() => setHalaman("konfirmasiLaporan")}
        />
      )}

      {/* ADMIN */}
      {halaman === "dashboardAdmin" && (
        <DashboardAdmin
          adminName={user?.name || "Admin"}
          onPelanggan={() => setHalaman("listPelanggan")}
          onInventori={() => setHalaman("inventory")}
          onTeknisi={() => setHalaman("ListTeknisi")}
          onLaporan={() => {
            setHalamanSebelumnya("dashboardAdmin");
            setHalaman("listLaporan");
          }}
          onListPembayaran={() => setHalaman("listPembayaran")}
        />
      )}

      {/* TEKNISI */}
      {halaman === "dashboardTeknisi" && (
        <DashboardTeknisi
          teknisiName={user?.name || "Teknisi"}
          onTugas={() => setHalaman("tugasTeknisi")}
          onInventory={() => setHalaman("inventoryTeknisi")}
          onLogout={handleLogout}
        />
      )}

      {halaman === "tugasTeknisi" && (
        <TugasTeknisi
          onBack={() => setHalaman("dashboardTeknisi")}
          onViewFoto={(item) => {
            setLaporanTerpilih(item);
            setHalamanSebelumnya("tugasTeknisi");
            setHalaman("fotoLaporan");
          }}
        />
      )}

      {halaman === "inventoryTeknisi" && (
        <InventoryTeknisi
          onBack={() => setHalaman("dashboardTeknisi")}
        />
      )}

      {halaman === "listPelanggan" && (
        <ListPelanggan
          onBack={() => setHalaman("dashboardAdmin")}
        />
      )}

      {halaman === "listLaporan" && (
  <ListLaporan
    onBack={() => setHalaman("dashboardAdmin")}
    onViewFoto={(item) => {
      setLaporanTerpilih(item);
      setHalaman("fotoLaporan");
    }}
  />
)}


      {halaman === "inventory" && (
        <Inventory
          onBack={() => setHalaman("dashboardAdmin")}
        />
      )}

      {halaman === "listPembayaran" && (
        <ListPembayaran
          onBack={() => setHalaman("dashboardAdmin")}
          onViewBukti={(item) => {
            setPembayaranTerpilih(item);
            setHalaman("fotoBuktiPembayaran");
          }}
        />
      )}

      {halaman === "ListTeknisi" && (
        <ListTeknisi
          onBack={() => setHalaman("dashboardAdmin")}
        />
      )}

      {halaman === "fotoBuktiPembayaran" && (
        <FotoBuktiPembayaran
          onKembali={() => setHalaman("listPembayaran")}
          data={pembayaranTerpilih}
        />
      )}

      {halaman === "fotoLaporan" && (
        <FotoLaporan
          onKembali={() => setHalaman(halamanSebelumnya)}
          data={laporanTerpilih}
        />
      )}

      {/* CUSTOMER AKTIF */}
      {halaman === "aktif" && (
        <DashboardAktif
          customerName={user?.name || "User"}
          paket={{
          nama: selectedPaket?.nama_paket || paketUser?.nama_paket || "-",
          mbps: selectedPaket?.mbps || paketUser?.mbps || "-",
          harga: selectedPaket?.harga || paketUser?.harga || 0,
          aktifSampai: "5 April 2026"
          }}
          onUpgrade={() => {
          setIsUpgrade(true);
          setSelectedPaket({ tipe: "upgrade" });
          setHalaman("pendaftaran");
          }}
          onLaporan={() => {
            setHalamanSebelumnya("aktif");
            setHalaman("laporan");
          }}
          onBayar={() => setHalaman("pembayaran")
}
        />
      )}

      {halaman === "pembayaran" && (
        <Pembayaran
          user={user}
          onBack={() => setHalaman("aktif")}
          onKirim={() => setHalaman("konfirmasiPembayaran")}
          paket={{
                nama: paketUser?.nama_paket || "-",
                mbps: paketUser?.mbps || 0,
                harga: paketUser?.harga || 0,
                dueBy: "5 April 2026"
            }}
        />
      )}

      {halaman === "konfirmasiPembayaran" && (
        <KonfirmasiPembayaran
          onKembali={() => setHalaman("pending")}
          paket={{
            nama: paketUser?.nama_paket || "FiberX",
            mbps: paketUser?.mbps || 50
          }}
        />
      )}

      {halaman === "konfirmasiLaporan" && (
        <KonfirmasiLaporan
          onKembali={() => setHalaman(halamanSebelumnya)}
        />
      )}

    </div>
  );
}

// STYLEz
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#e8e8e8",
    overflow: "hidden",
  },
};