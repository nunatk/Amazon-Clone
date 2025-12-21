import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "./SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password || !confirm) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    navigate("/");
  };

  return (
    <Layout>
      <div className="signup-page">

        {/* Amazon Clone Logo */}
        <h1 className="auth-logo" onClick={() => navigate("/")}>
          Amazon Clone
        </h1>

        <div className="signup-box">
          <h2>Create account</h2>

          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSignup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>Re-enter password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <button className="auth-btn" type="submit">
              Create your Amazon Clone account
            </button>
          </form>

          <p className="auth-note">
            Already have an account?{" "}
            <span className="auth-link" onClick={() => navigate("/auth")}>
              Sign in
            </span>
          </p>
        </div>

        <div className="auth-divider"></div>
      </div>
    </Layout>
  );
}
