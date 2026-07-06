import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/UserDashboard.css";

const API_BASE_URL = "http://localhost:8080";

export default function MyTickets() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        state: { redirectTo: "/user/tickets" }
      });
      return;
    }

    fetchBookings();

  }, [navigate]);

  const fetchBookings = async () => {

    const token = localStorage.getItem("token");

    try {

      const response = await axios.get(
        `${API_BASE_URL}/bookings/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBookings(response.data || []);

    } catch (error) {

      console.log(error);

      setBookings([]);

    } finally {

      setLoading(false);

    }

  };

  const requestCancellation = async (bookingId) => {

    const token = localStorage.getItem("token");

    const confirmCancel = window.confirm(
      "Are you sure you want to request cancellation?"
    );

    if (!confirmCancel) return;

    try {

      await axios.put(
        `${API_BASE_URL}/bookings/request-cancel/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Cancellation request sent successfully.");

      // Reload latest booking status from backend
      fetchBookings();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data || "Unable to send cancellation request."
      );

    }

  };

  if (loading) {
    return (
      <h2 className="loading">
        Loading tickets...
      </h2>
    );
  }

  return (

    <div className="ud-dashboard">

      <div className="ud-hero">
        <div>
          <h1>My Tickets</h1>
          <p>Your ProNight bookings and payment status.</p>
        </div>
      </div>

      <div className="ud-grid">

        {bookings.length === 0 ? (

          <div className="ud-upcoming">

            <h2>No Tickets Yet</h2>

            <p>
              Booked tickets will appear here after checkout.
            </p>

            <button onClick={() => navigate("/events")}>
              Book Now
            </button>

          </div>

        ) : (

          bookings.map((booking) => (

            <div
              className="ud-upcoming"
              key={booking.bookingId}
            >

              <img
                src={
                  booking.event?.imageUrl ||
                  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
                }
                alt={booking.event?.title}
                className="upcoming-img"
              />

              <h3>{booking.event?.title}</h3>

              <p>
                <strong>Pass:</strong>{" "}
                {booking.pass?.passName}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {booking.quantity}
              </p>

              <p>
  <strong>Total:</strong> ₹{booking.totalAmount}
</p>


              <p>
                <strong>Booking Date:</strong>{" "}
                {booking.createdAt
                  ? new Date(booking.createdAt).toLocaleString()
                  : "N/A"}
              </p>

               <p>
    <strong>Status:</strong>{" "}
    <span className={`status ${booking.bookingStatus.toLowerCase()}`}>
      {booking.bookingStatus}
    </span>
  </p>

              <div className="actions">

                <button
                  className="view-btn"
                  onClick={() => navigate(`/payment-success/${booking.bookingId}`)}
                >
                  View Details
                </button>

                {booking.bookingStatus === "CONFIRMED" && (
                  <button
                    className="cancel-btn"
                    onClick={() => requestCancellation(booking.bookingId)}
                  >
                    Cancel Booking
                  </button>
                )}

                {booking.bookingStatus === "CANCELLATION_REQUESTED" && (
                  <button className="pending-btn" disabled>
                    Cancellation Requested
                  </button>
                )}

                {booking.bookingStatus === "CANCELLED" && (
                  <>
                    <button className="cancelled-btn" disabled>
                      Booking Cancelled
                    </button>
                    <p className="refund-note">
                      🧪 Test Mode: No actual refund has been processed.
                    </p>
                  </>
                )}

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}