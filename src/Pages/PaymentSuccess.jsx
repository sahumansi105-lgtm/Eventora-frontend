import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../CSS/PaymentSuccess.css";

const API_BASE_URL = "http://localhost:8080";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(location.state?.booking || null);
  const payment = location.state?.payment;

  useEffect(() => {
    if (booking || !bookingId) return;

    const loadBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/bookings/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const found = response.data?.find((item) => String(item.bookingId) === String(bookingId));
        setBooking(found || null);
      } catch (err) {
        console.log(err);
      }
    };

    loadBooking();
  }, [booking, bookingId]);

  const downloadServerPDF = async () => {
    if (!booking?.bookingId) return;

    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/bookings/${booking.bookingId}/ticket`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `ProNight-Ticket-${booking.bookingId}.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (!booking) {
    return (
      <div className="success-container">
        <div className="ticket-wrapper">
          <div className="success-header">
            <h1>Booking not found</h1>
            <p>Please open your ticket from booking history.</p>
            <button onClick={() => navigate("/user/tickets")}>View My Tickets</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="success-container">
      <div className="ticket-wrapper">
        <div className="ticket-left">
          <div className="success-header">
            <h1>Payment Successful</h1>
            <p>Your booking is confirmed</p>
          </div>

          <div className="success-badge">CONFIRMED</div>

          <div className="success-section">
            <h2>Booking Details</h2>
            <p><strong>Booking ID:</strong> {booking.bookingId}</p>
            <p><strong>Transaction ID:</strong> {booking.razorpayPaymentId || payment?.paymentId || "Paid"}</p>
            <p><strong>Status:</strong> {booking.bookingStatus}</p>
          </div>

          <div className="success-section">
            <h2>Event Details</h2>
            <p><strong>Event:</strong> {booking.event?.title}</p>
            <p><strong>Artist:</strong> {booking.event?.artistName}</p>
            <p><strong>Venue:</strong> {booking.event?.venue}</p>
            <p><strong>Date:</strong> {booking.event?.eventDate}</p>
            <p><strong>Time:</strong> {booking.event?.eventTime}</p>
          </div>

          <div className="success-section">
            <h2>Pass Details</h2>
            <p><strong>Pass ID:</strong> {booking.pass?.passId}</p>
            <p><strong>Pass:</strong> {booking.pass?.passName}</p>
            <p><strong>Type:</strong> {booking.pass?.passType}</p>
            <p><strong>Quantity:</strong> {booking.quantity}</p>
            <p><strong>Total Paid:</strong> ₹{booking.totalAmount}</p>
          </div>
        </div>

        <div className="ticket-divider"></div>

        <div className="ticket-right">
          <h2>Digital Entry Pass</h2>

          {booking.qrCode ? (
            <img src={`data:image/png;base64,${booking.qrCode}`} alt="Ticket QR" />
          ) : (
            <p>QR Code Not Available</p>
          )}

          <div className="ticket-user">
            <p><strong>Name:</strong> {booking.user?.fullName}</p>
            <p><strong>Email:</strong> {booking.user?.email}</p>
            <p><strong>Phone:</strong> {booking.user?.phoneNumber}</p>
            <p><strong>Note:</strong> Valid for one entry only</p>
          </div>

          <div className="success-actions">
            <button onClick={downloadServerPDF}>Download PDF Ticket</button>
            <button onClick={() => navigate("/user/tickets")}>View Booking</button>
            <button onClick={() => navigate("/")}>Go to Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}
