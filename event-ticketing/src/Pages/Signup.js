import { useEffect, useMemo, useState } from "react";
import data from "../data/events.json";
import "../styles/AuthModal.css";

export default function Signup({ onClose = () => {}, onOpenLogin = () => {} }) {
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
              <h2>Sign Up</h2>
              <p className="sign-up-container">
                <span>Already have an account?</span>
              </p>
            </section>

            <form className="form-style-container">
              <div className="inputs-layout-container">
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
                <input type="email" placeholder="Email Address" required />
                <input type="password" placeholder="Password" required />
                <input type="password" placeholder="Confirm Password" required />
              </div>

              <button type="submit" className="login-btn">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
