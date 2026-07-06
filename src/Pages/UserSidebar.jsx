import { NavLink } from "react-router-dom";
import "../CSS/UserSidebar.css"

export default function UserSidebar() {

  return (
    <div className="user-sidebar">

      <h1 className="logo">
        🎵 ProNight
      </h1>

      <nav>

        <NavLink to="/user/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/user/tickets">
          My Tickets
        </NavLink>

        <NavLink to="/user/wishlist">
          Wishlist
        </NavLink>

        <NavLink to="/user/rewards">
          Rewards
        </NavLink>

        <NavLink to="/user/profile">
          Profile
        </NavLink>

      </nav>

    </div>
  );
}