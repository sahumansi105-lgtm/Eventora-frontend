
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Footer.css";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <footer className="footer">
      <div className="footerGlow"></div>

      <div className="footerContainer">
        {/* BRAND */}
        <div className="footerBrand">
          <a
            href="/"
            className="footerLogo"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate("/");
            }}
          >
            <h1>🎵 EVENTORA</h1>
          </a>

          <p>
            India's most exciting platform for concerts,
            celebrity nights, DJ festivals and unforgettable
            live experiences.
          </p>

          <div className="footerSocial">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">📸</a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">🎥</a>
            <a href="https://www.spotify.com/" target="_blank" rel="noreferrer">🎧</a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footerLinks">
          <h2>Quick Links</h2>
          <a href="/" onClick={(e) => { e.preventDefault(); handleNavigate("/"); }}>Home</a>
          <a href="/events" onClick={(e) => { e.preventDefault(); handleNavigate("/events"); }}>Events</a>
          <a href="/explore" onClick={(e) => { e.preventDefault(); handleNavigate("/explore"); }}>Explore</a>
          <a href="/about" onClick={(e) => { e.preventDefault(); handleNavigate("/about"); }}>About Us</a>
        </div>

        {/* SUPPORT */}
        <div className="footerLinks">
          <h2>Support</h2>
          <a href="/help" onClick={(e) => { e.preventDefault(); handleNavigate("/help"); }}>Help Center</a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); handleNavigate("/contact"); }}>Contact Us</a>
          <a href="/login" onClick={(e) => { e.preventDefault(); handleNavigate("/login"); }}>Login</a>
          <a href="/register" onClick={(e) => { e.preventDefault(); handleNavigate("/register"); }}>Register</a>
        </div>

        {/* CONTACT */}
        <div className="footerContact">
          <h2>Contact</h2>
          <p>📍 Mumbai, India</p>
          <p>📞 +91 98765 43210</p>
          <p>
            📧{" "}
            <a href="mailto:support@pronight.com">
              support@pronight.com
            </a>
          </p>

          <button onClick={() => handleNavigate("/events")}>
            Book Your Night
          </button>
        </div>
      </div>

      <div className="footerBottom">
        © {new Date().getFullYear()} EVENTORA • Discover • Book • Celebrate
      </div>
    </footer>
  );
}
