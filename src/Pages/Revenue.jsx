import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Revenue.css";

const API = "http://localhost:8080";

export default function Revenue() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadRevenue();
  }, []);

  const loadRevenue = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API}/admin/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBookings(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const totalRevenue = bookings
    .filter(b => b.bookingStatus === "CONFIRMED")
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    b => b.bookingStatus === "CONFIRMED"
  ).length;

  const cancelledBookings = bookings.filter(
    b => b.bookingStatus === "CANCELLED"
  ).length;

  return (

    <div className="revenue-page">

      <h1>Revenue Analytics</h1>

      <div className="revenue-cards">

        <div className="revenue-card">
          <h3>Total Revenue</h3>
          <p>₹ {totalRevenue}</p>
        </div>

        <div className="revenue-card">
          <h3>Total Bookings</h3>
          <p>{totalBookings}</p>
        </div>

        <div className="revenue-card">
          <h3>Confirmed</h3>
          <p>{confirmedBookings}</p>
        </div>

        <div className="revenue-card">
          <h3>Cancelled</h3>
          <p>{cancelledBookings}</p>
        </div>

      </div>

      <div className="revenue-table">

        <h2>Booking Revenue Details</h2>

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Event</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {bookings.map((b) => (

              <tr key={b.bookingId}>

                <td>{b.bookingId}</td>
                <td>{b.user.fullName}</td>
                <td>{b.event.title}</td>
                <td>₹ {b.totalAmount}</td>
                <td>{b.bookingStatus}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}