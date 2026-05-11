import { useEffect } from "react";
import "./SplashScreen.css";
import logoConnecta from "./assets/connecta.png"; 

export default function SplashScreen({ onFinish }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); // ⏱️ 2 detik (ideal)

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <img src={logoConnecta} alt="Connecta" className="splash-logo" />
      </div>
    </div>
  );
}