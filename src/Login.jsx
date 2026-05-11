import { useState } from "react";
import "./Login.css";
import logoConnecta from "./assets/connecta.png";
import iconAvatar from "./assets/icon-avatar.png";
import iconKey from "./assets/key.png";

export default function Login({ onLogin, onGoSignIn }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    setError("");

    if (!form.username) return setError("Username wajib diisi!");
    if (!form.password) return setError("Password wajib diisi!");

    try {
      setLoading(true);

      const res = await fetch("backend-appv2-production.up.railway.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);
      console.log(data.user);
      if (!res.ok) {
        setError(data.message || "Username atau password salah!");
        return;
      }

      console.log("LOGIN RESPONSE:", data);
      // simpan user ke localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // kirim ke App.jsx
      onLogin(data);

    } catch (err) {
      setError("Tidak bisa terhubung ke server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-shell">
      <div className="login-card">

        {/* Logo */}
        <img src={logoConnecta} alt="Connecta" className="login-logo" />
        <h2 className="login-title">CUSTOMER LOGIN</h2>

        {/* ERROR */}
        {error && (
          <div className="error-box">
            ⚠ {error}
          </div>
        )}

        {/* Username */}
        <div className="login-input-wrapper">
          <img src={iconAvatar} alt="user" className="login-input-icon" />
          <input
            name="username"
            className="login-input"
            type="text"
            placeholder="Username / Email"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="login-input-wrapper">
          <img src={iconKey} alt="password" className="login-input-icon" />
          <input
            name="password"
            className="login-input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {/* Button */}
        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* Footer */}
        <p className="login-footer">
          Belum punya akun?{" "}
          <span className="login-link" onClick={onGoSignIn}>
            Sign In
          </span>
        </p>

      </div>
    </div>
  );
}