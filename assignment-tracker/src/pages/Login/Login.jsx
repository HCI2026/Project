import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const generateRandomPassword = (length = 12) => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let ret = "";
    for (let i = 0; i < length; i++) ret += charset.charAt(Math.floor(Math.random() * charset.length));
    return ret;
  };

  const handleToggle = () => {
    setIsSignup((s) => !s);
    setPassword("");
  };

  const handleGenerate = () => setPassword(generateRandomPassword(12));
  const handleGenerateAndShow = () => {
    const pw = generateRandomPassword(12);
    setPassword(pw);
    setShowPassword(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return alert("Please enter a username");

    if (isSignup) {
      if (!password || password.length < 8) return alert("Password must be at least 8 characters");
      // In this demo app we don't persist accounts — immediately sign the user in after signup
      onLogin && onLogin({ username });
      return;
    }

    if (!password) return alert("Please enter a password");
    onLogin && onLogin({ username });
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>{isSignup ? "Create account" : "Sign In"}</h2>

        <div className="signup-toggle">
          <label>
            <input type="checkbox" checked={isSignup} onChange={handleToggle} /> Sign up instead
          </label>
        </div>

        <label className="auth-label">Username</label>
        <input
          className="auth-input"
          type="text"
          placeholder="your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="auth-label">Password</label>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            className="auth-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password (min 8 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ flex: 1 }}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {isSignup && (
            <button type="button" className="generate-btn" onClick={handleGenerateAndShow}>Generate</button>
          )}
        </div>

        <button className="auth-button" type="submit">{isSignup ? "Create account" : "Sign In"}</button>
      </form>
    </div>
  );
}

export default Login;
