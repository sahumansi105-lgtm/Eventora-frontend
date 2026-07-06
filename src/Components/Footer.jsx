import { Link } from "react-router-dom";
import "../CSS/Footer.css";

export default function Footer() {

  return (

    <footer className="footer">

      <div className="footerGlow"></div>

      <div className="footerContainer">

        {/* LEFT */}

        <div className="footerBrand">

          <h1>
            🎵 PRO NIGHT
          </h1>

          <p>

            India's most exciting platform for
            concerts, celebrity nights,
            DJ festivals and unforgettable
            live experiences.

          </p>

          <div className="footerSocial">

            <a href="#">
              📸
            </a>

            <a href="#">
              🎥
            </a>

            <a href="#">
              🎧
            </a>

            <a href="#">
              🎵
            </a>

          </div>

        </div>



        {/* QUICK LINKS */}

        <div className="footerLinks">

          <h2>
            Quick Links
          </h2>

          <Link to="/">
            Home
          </Link>

          <Link to="/events">
            Events
          </Link>

          <Link to="/wishlist">
            Wishlist
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </div>




        {/* SUPPORT */}

        <div className="footerLinks">

          <h2>
            Support
          </h2>

          <a href="#">
            About Us
          </a>

          <a href="#">
            Privacy Policy
          </a>

          <a href="#">
            Terms & Conditions
          </a>

          <a href="#">
            Contact Us
          </a>

        </div>





        {/* CONTACT */}

        <div className="footerContact">

          <h2>
            Contact
          </h2>

          <p>
            📍 Mumbai, India
          </p>

          <p>
            📞 +91 98765 43210
          </p>

          <p>
            📧 support@pronight.com
          </p>

          <button>

            Book Your Night

          </button>

        </div>

      </div>



      <div className="footerBottom">

        © 2026 PRO NIGHT • Feel The Music • Live The Night

      </div>

    </footer>

  );

}