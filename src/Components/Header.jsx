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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSearch = () => {
    const query = search.trim();

    if (query) {
      navigate(`/events?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/events");
    }

    setMenuOpen(false);
  };

  return (
    <header className="header">
      <Link to="/" className="logo-container">
        <div className="logo-text">
          <h1>EVENTORA</h1>
          <p>Discover • Book • Celebrate</p>
        </div>
      </Link>

      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            <Link to="/events">Events</Link>
            <ul className="dropdown-menu">
              <li><Link to="/events">All Events</Link></li>
              <li><Link to="/events">Upcoming Events</Link></li>
            </ul>
          </li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li> <Link to="/help">Help Here</Link></li>
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
        <button className="search-btn" onClick={handleSearch} aria-label="Search events">
          Search
        </button>
      </div>

      <div className="actions">
        {!token ? (
          <div className="sign-dropdown">
            <button className="sign-btn" onClick={() => setMenuOpen(!menuOpen)}>
              Sign In <span className="arrow">⌄</span>
            </button>
            {menuOpen && (
              <div className="sign-menu">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="user-badge">{user?.fullName}</div>
            <Link to={isAdmin ? "/admin" : "/user/dashboard"} className="dashboard-btn">
              Dashboard
            </Link>
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
