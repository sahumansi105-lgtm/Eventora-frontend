import { Outlet, useNavigate } from "react-router-dom";
import "../CSS/AdminLayout.css";
import Header from "../Components/Header";


export default function AdminLayout() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <div className="admin-layout">

      <Header/>


      <div className="admin-body">

        <div className="sidebar">

          <h2>ProNight</h2>

          <ul>

            <li onClick={() => navigate("/admin")}>
              📊 Dashboard
            </li>

            <li onClick={() => navigate("/manage-events")}>
              🎉 Events
            </li>

            <li onClick={() => navigate("/manage-passes")}>
              🎫 Passes
            </li>

            <li onClick={() => navigate("/manage-bookings")}>
              📖 Bookings
            </li>

            <li onClick={() => navigate("/manage-users")}>
              👤 Users
            </li>

            <li onClick={() => navigate("/revenue")}>
              💰 Revenue
            </li>

            <li onClick={() => navigate("/admin/qr-scanner")}>
              QR Scanner
            </li>

            <li onClick={logout}>
              🚪 Logout
            </li>

          </ul>

        </div>


        <div className="content">

          <Outlet />

        </div>

      </div>

    </div>
  );
}
