import React, { useState } from "react";
import Icon from "./Icon.jsx";
import { login, signup } from "../lib/docsApi.js";

export default function AuthModal({ onClose, onLogin }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await login(username, password);
      } else {
        await signup(username, email, password);
        await login(username, password);
      }
      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="ws-scrim"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="ws-dialog">
        <div className="ws-dialog__h">
          <div className="t">{mode === "login" ? "Log in" : "Sign up"}</div>
          <div className="d">
            {mode === "login"
              ? "Log in to save documents to your account."
              : "Create an account to save documents."}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="ws-dialog__b">
            {error && (
              <div
                style={{
                  color: "#c0392b",
                  font: "var(--t-body-sm)",
                  marginBottom: 10,
                }}
              >
                {error}
              </div>
            )}

            <label>Username</label>
            <input
              className="ws-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
            />

            {mode === "signup" && (
              <>
                <label style={{ marginTop: 10 }}>Email</label>
                <input
                  className="ws-field"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </>
            )}

            <label style={{ marginTop: 10 }}>Password</label>
            <input
              className="ws-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <div className="ws-dialog__f">
            <button
              type="button"
              className="ws-btn ws-btn--ghost"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ws-btn ws-btn--primary"
              disabled={loading}
            >
              {loading ? "…" : mode === "login" ? "Log in" : "Sign up"}
            </button>
          </div>
        </form>

        <div
          style={{
            padding: "0 18px 14px",
            font: "var(--t-body-sm)",
            color: "var(--fg-3)",
          }}
        >
          {mode === "login" ? (
            <>
              No account?{" "}
              <button
                type="button"
                className="ws-btn ws-btn--ghost"
                style={{
                  padding: 0,
                  border: "none",
                  font: "inherit",
                  color: "var(--ap-teal-deep)",
                }}
                onClick={() => setMode("signup")}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="ws-btn ws-btn--ghost"
                style={{
                  padding: 0,
                  border: "none",
                  font: "inherit",
                  color: "var(--ap-teal-deep)",
                }}
                onClick={() => setMode("login")}
              >
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
