import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Header from "./Components/Header";

/* ---------- Public Pages ---------- */
import Home from "./Pages/Home";
import Events from "./Pages/Events";
import EventDetails from "./Pages/EventDetails";
import Explore from "./Pages/Explore";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import BookingPage from "./Pages/BookingPage";
import PaymentSuccess from "./Pages/PaymentSuccess";
import Recommendation from "./Pages/Recommendation";

/* ---------- Admin Pages ---------- */
import AdminLayout from "./Layouts/AdminLayout";
import AdminDashboard from "./Pages/AdminDashboard";
import ManageEvents from "./Pages/ManageEvents";
import ManagePasses from "./Pages/ManagePasses";
import ManageBookings from "./Pages/ManageBookings";
import ManageUsers from "./Pages/ManageUsers";
import Revenue from "./Pages/Revenue";
import QrScanner from "./Pages/QrScanner";
import AddEvent from "./Pages/AddEvent";
import EditEvent from "./Pages/EditEvent";
import AddPass from "./Pages/AddPass";
import EditPass from "./Pages/EditPass";

/* ---------- User Pages ---------- */
import UserLayout from "./Layouts/UserLayout";
import UserDashboard from "./Pages2/UserDashboard";
import WishListPage from "./Pages2/WishListPage";
import Profile from "./Pages2/Profile";
import MyTickets from "./Pages2/MyTickets";
import Rewards from "./Pages2/Rewards";
import Help from "./Pages/Help";

/* ===========================
   PUBLIC LAYOUT
=========================== */

function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <Routes>

      {/* =====================================================
                      PUBLIC ROUTES
      ====================================================== */}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help/>}/>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/Forgotpassword"
          element={<Navigate to="/forgotpassword" replace />}
        />

        {/* Booking */}
        <Route path="/booking/:passId" element={<BookingPage />} />
        <Route
          path="/payment-success/:bookingId"
          element={<PaymentSuccess />}
        />

        {/* User accessible pages */}
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recommendations" element={<Recommendation />} />
      </Route>

      {/* =====================================================
                      ADMIN ROUTES
            EVERYTHING INSIDE ADMIN LAYOUT
      ====================================================== */}

      <Route path="/admin" element={<AdminLayout />}>

        {/* Dashboard */}
        <Route index element={<AdminDashboard />} />

        {/* Events */}
        <Route path="manage-events" element={<ManageEvents />} />
        <Route path="add-event" element={<AddEvent />} />
        <Route path="edit-event/:eventId" element={<EditEvent />} />

        {/* Passes */}
        <Route path="manage-passes" element={<ManagePasses />} />
        <Route path="add-pass" element={<AddPass />} />
        <Route path="edit-pass/:passId" element={<EditPass />} />

        {/* Bookings */}
        <Route path="manage-bookings" element={<ManageBookings />} />

        {/* Users */}
        <Route path="manage-users" element={<ManageUsers />} />

        {/* Revenue */}
        <Route path="revenue" element={<Revenue />} />

        {/* QR Scanner */}
        <Route path="qr-scanner" element={<QrScanner />} />

      </Route>

      {/* =====================================================
                  OLD URL REDIRECTS
      ====================================================== */}

      <Route
        path="/manage-events"
        element={<Navigate to="/admin/manage-events" replace />}
      />

      <Route
        path="/manage-passes"
        element={<Navigate to="/admin/manage-passes" replace />}
      />

      <Route
        path="/manage-bookings"
        element={<Navigate to="/admin/manage-bookings" replace />}
      />

      <Route
        path="/manage-users"
        element={<Navigate to="/admin/manage-users" replace />}
      />

      <Route
        path="/revenue"
        element={<Navigate to="/admin/revenue" replace />}
      />

      <Route
        path="/qr-scanner"
        element={<Navigate to="/admin/qr-scanner" replace />}
      />

      {/* =====================================================
                      USER ROUTES
      ====================================================== */}

      <Route path="/user" element={<UserLayout />}>

        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<UserDashboard />} />

        <Route path="wishlist" element={<WishListPage />} />

        <Route path="profile" element={<Profile />} />

        <Route path="tickets" element={<MyTickets />} />

        <Route path="rewards" element={<Rewards />} />

      </Route>

      {/* =====================================================
                    PAGE NOT FOUND
      ====================================================== */}

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}