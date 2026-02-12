import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../AppContext";

import users from "../data/users.json";
import data from "../data/events.json";
import "../styles/AuthModal.css";

export default function Login({ onClose = () => {}, onOpenSignup = () => {} }) {
  const { login } = useContext(AppContext);

  const images = useMemo(() => {
    return (data?.heroSlides ?? []).map((s) => s.image).filter(Boolean);
  }, []);

  const [index, setIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (!images.length) return;

    const intervalMs = 3500;
    const fadeMs = 500;

    const timer = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFadeIn(true);
      }, fadeMs);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images.length]);

  const currentBg = images.length ? `url(${images[index]})` : "none";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setErrMsg("");

    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (!found) {
      setErrMsg("Email or password is incorrect.");
      return;
    }

    login({
      id: found.id,
      email: found.email,
      firstName: found.firstName,
      lastName: found.lastName,
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="login-content-container">
          <div className="left-login-content">
            <div
              className={`left-bg ${fadeIn ? "fade-in" : "fade-out"}`}
              style={{ backgroundImage: currentBg }}
            />
          </div>

          <div className="right-login-content">
            <section className="login-section">
              <h2>Log In</h2>
              <p className="sign-up-container">
                <span>Don't have an account?</span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenSignup();
                  }}
                >
                  Sign Up
                </a>
              </p>
            </section>

            <form className="form-style-container" onSubmit={submitHandler}>
              <div className="inputs-layout-container">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {errMsg && <p className="auth-error">{errMsg}</p>}

              <button type="submit" className="login-btn">
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
