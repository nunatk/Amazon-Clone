import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import { auth } from "../../Utility/FireBase";
import amazonLogo from "../../components/img/Amazon_logo.svg";
import "./Auth.css";

export default function Auth() {
  const navigate = useNavigate();

  const [hasAccount, setHasAccount] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirm("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (hasAccount) {
        // SIGN IN
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // SIGN UP
        if (!name.trim()) {
          throw new Error("Please enter your name");
        }

        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }

        if (password !== confirm) {
          throw new Error("Passwords do not match");
        }

        const userCredential =
          await createUserWithEmailAndPassword(auth, email, password);

        //  SAVE FIRST NAME TO FIREBASE PROFILE
        await updateProfile(userCredential.user, {
          displayName: name.trim().split(" ")[0],
        });
      }

      navigate("/");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* AMAZON LOGO */}
      <img
        src={amazonLogo}
        alt="Amazon"
        className="auth-logo"
        onClick={() => navigate("/")}
      />

      {/* AUTH CARD */}
      <div className="auth-box">
        <h1>{hasAccount ? "Sign in" : "Create account"}</h1>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>

          {!hasAccount && (
            <>
              <label>Your name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </>
          )}

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder={!hasAccount ? "At least 6 characters" : ""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {!hasAccount && (
            <>
              <label>Re-enter password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </>
          )}

          <button className="auth-primary-btn" disabled={loading}>
            {loading
              ? "Processing..."
              : hasAccount
              ? "Sign in"
              : "Create your Amazon Clone account"}
          </button>
        </form>

        <p className="auth-terms">
          {hasAccount
            ? "By continuing, you agree to the Amazon Clone Conditions of Use and Privacy Notice."
            : "By creating an account, you agree to the Amazon Clone Conditions of Use and Privacy Notice."}
        </p>
      </div>

      {/* DIVIDER */}
      <div className="auth-divider">
        <span>
          {hasAccount ? "New to Amazon?" : "Already have an account?"}
        </span>
      </div>

      {/* TOGGLE */}
      <button
        className="auth-secondary-btn"
        onClick={() => {
          setHasAccount(!hasAccount);
          resetForm();
        }}
      >
        {hasAccount
          ? "Create your Amazon Clone account"
          : "Sign in"}
      </button>
    </div>
  );
}
