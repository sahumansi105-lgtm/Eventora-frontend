
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../CSS/Header.css";

function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user?.role === "ADMIN";

  // Navigate to page and scroll to top
  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleNavigate("/");
  };

  const handleSearch = () => {
    const query = search.trim();

    if (query) {
      handleNavigate(`/events?search=${encodeURIComponent(query)}`);
    } else {
      handleNavigate("/events");
    }
  };

  return (
    <header className="header">
      <a
        href="/"
        className="logo-container"
        onClick={(e) => {
          e.preventDefault();
          handleNavigate("/");
        }}
      >
        <div className="logo-text">
          <h1>EVENTORA</h1>
          <p>Discover • Book • Celebrate</p>
        </div>
      </a>

      <nav>
        <ul>
          <li>
            <a href="/" onClick={(e) => {
              e.preventDefault();
              handleNavigate("/");
            }}>Home</a>
          </li>

          <li className="dropdown">
            <a href="/events" onClick={(e) => {
              e.preventDefault();
              handleNavigate("/events");
            }}>Events</a>

            <ul className="dropdown-menu">
              <li>
                <a href="/events" onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("/events");
                }}>All Events</a>
              </li>
              <li>
                <a href="/events" onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("/events");
                }}>Upcoming Events</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="/explore" onClick={(e) => {
              e.preventDefault();
              handleNavigate("/explore");
            }}>Explore</a>
          </li>

          <li>
            <a href="/about" onClick={(e) => {
              e.preventDefault();
              handleNavigate("/about");
            }}>About Us</a>
          </li>

          <li>
            <a href="/contact" onClick={(e) => {
              e.preventDefault();
              handleNavigate("/contact");
            }}>Contact Us</a>
          </li>

          <li>
            <a href="/help" onClick={(e) => {
              e.preventDefault();
              handleNavigate("/help");
            }}>Help Here</a>
          </li>
        </ul>
      </nav>

      <div className="search">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button
          className="search-btn"
          onClick={handleSearch}
          aria-label="Search events"
        >
          Search
        </button>
      </div>

      <div className="actions">
        {!token ? (
          <div className="sign-dropdown">
            <button
              className="sign-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Sign In <span className="arrow">⌄</span>
            </button>

            {menuOpen && (
              <div className="sign-menu">
                <a href="/login" onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("/login");
                }}>Login</a>

                <a href="/register" onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("/register");
                }}>Register</a>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="user-badge">{user?.fullName}</div>

            <button
              className="dashboard-btn"
              onClick={() =>
                handleNavigate(isAdmin ? "/admin" : "/user/dashboard")
              }
            >
              Dashboard
            </button>

            <button className="register-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
