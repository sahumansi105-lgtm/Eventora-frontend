import { Outlet } from "react-router-dom";
import UserSidebar from "../Pages/UserSidebar";
import UserTopbar from "../Pages/UserTopbar";
import Header from "../Components/Header";
import "../CSS/UserLayout.css";

export default function UserLayout() {
  return (
    <div className="user-layout">

      <Header />

      <div className="user-body">

        <UserSidebar />

        <div className="user-main">

          <UserTopbar />

          <div className="user-content">
            <Outlet />
          </div>

        </div>

      </div>

    </div>
  );
}