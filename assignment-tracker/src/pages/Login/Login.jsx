import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic client-side validation
    if (!email) return alert("Please enter an email");
    if (!password) return alert("Please enter a password");
    // call onLogin with a simple user object
    onLogin && onLogin({ email });
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <label className="auth-label">Email</label>
        <input
          className="auth-input"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="auth-label">Password</label>
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-button" type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
