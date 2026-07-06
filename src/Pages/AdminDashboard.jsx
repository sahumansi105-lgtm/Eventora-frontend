import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/AdminDashboard.css";

export default function AdminDashboard() {

  const [adminData, setAdminData] = useState(null);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAdminData(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  if (!adminData) {

    return (

      <div className="admin-loading-box">

        <h2>Loading Dashboard...</h2>

      </div>

    );

  }


  return (

    <div className="admin-main-wrapper">

      <h1 className="admin-page-heading">

        Dashboard Overview

      </h1>



      <div className="admin-stats-grid">

        <div className="admin-stat-card">

          <h3>Total Users</h3>

          <p>{adminData.totalUsers}</p>

        </div>


        <div className="admin-stat-card">

          <h3>Total Events</h3>

          <p>{adminData.totalEvents}</p>

        </div>


        <div className="admin-stat-card">

          <h3>Total Passes</h3>

          <p>{adminData.totalPasses}</p>

        </div>


        <div className="admin-stat-card">

          <h3>Total Bookings</h3>

          <p>{adminData.totalBookings}</p>

        </div>


        <div className="admin-stat-card admin-revenue-card">

          <h3>Total Revenue</h3>

          <p>₹ {adminData.totalRevenue}</p>

        </div>

      </div>




      <div className="admin-table-wrapper">

        <h2 className="admin-section-heading">

          Recent Bookings

        </h2>

        <table className="admin-custom-table">

          <thead>

            <tr>

              <th>ID</th>

              <th>User</th>

              <th>Event</th>

              <th>Qty</th>

              <th>Amount</th>

              <th>Status</th>

            </tr>

          </thead>


          <tbody>

            {

              adminData.recentBookings?.map((booking) => (

                <tr key={booking.bookingId}>

                  <td>{booking.bookingId}</td>

                  <td>{booking.userName}</td>

                  <td>{booking.eventTitle}</td>

                  <td>{booking.quantity}</td>

                  <td>₹ {booking.totalAmount}</td>

                  <td>

                    <span className={`admin-status-badge ${booking.status}`}>

                      {booking.status}

                    </span>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>





      <div className="admin-table-wrapper">

        <h2 className="admin-section-heading">

          Low Stock Passes

        </h2>

        <table className="admin-custom-table">

          <thead>

            <tr>

              <th>ID</th>

              <th>Pass Name</th>

              <th>Event</th>

              <th>Available</th>

            </tr>

          </thead>


          <tbody>

            {

              adminData.lowStockPasses?.map((pass) => (

                <tr key={pass.passId}>

                  <td>{pass.passId}</td>

                  <td>{pass.passName}</td>

                  <td>{pass.eventTitle}</td>

                  <td>{pass.availableQuantity}</td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>


    </div>

  );

}