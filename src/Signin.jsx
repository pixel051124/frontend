import { useState } from "react";
import "./Login.css";
import logoConnecta from "./assets/connecta.png";
import iconAvatar from "./assets/icon-avatar.png";
import iconKey from "./assets/key.png";

export default function SignIn({ onGoLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔥 state untuk notif UI
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError(""); // reset error dulu

    if (!username) return setError("Username wajib diisi!");
    if (!password) return setError("Password wajib diisi!");
    if (!confirmPassword) return setError("Konfirmasi password wajib diisi!");
    if (password !== confirmPassword) return setError("Password tidak cocok!");

    try {
      const response = await fetch("http://192.168.1.3:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email: username + "@gmail.com",
          password: password,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        console.log(err);
        setError("Register gagal, password minimal 6 karakter");
        return;
      }

      await response.json();

      onGoLogin(); // sukses → balik login

    } catch (err) {
      console.error(err);
      setError("Tidak bisa terhubung ke server!");
    }
  };

  return (
    <div className="login-shell">
      <div className="login-card">

        <img src={logoConnecta} alt="Connecta" className="login-logo" />
        <h2 className="login-title">CUSTOMER SIGN IN</h2>

        {/* 🔥 ERROR BOX UI */}
        {error && (
          <div className="error-box">
            ⚠ {error}
          </div>
        )}

        {/* Username */}
        <div className="login-input-wrapper">
          <img src={iconAvatar} alt="user" width={16} height={16} />
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="login-input-wrapper">
          <img src={iconKey} alt="password" width={16} height={16} />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm */}
        <div className="login-input-wrapper">
          <img src={iconKey} alt="confirm" width={16} height={16} />
          <input
            className="login-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleSignIn}>
          Sign In
        </button>

        <p className="login-footer">
          Sudah punya akun?{" "}
          <span className="login-link" onClick={onGoLogin}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}