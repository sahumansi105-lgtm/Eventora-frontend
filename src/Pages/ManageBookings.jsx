import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/ManageBooking.css";

const API = "http://localhost:8080";

export default function ManageBookings() {

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

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

    } catch (err) {
      console.log(err);
    }
  };

  const confirmBooking = async (id) => {

    const token = localStorage.getItem("token");

    await axios.put(
      `${API}/admin/bookings/${id}/confirm`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchBookings();
  };

  const cancelBooking = async (id) => {

    const token = localStorage.getItem("token");

    await axios.put(
      `${API}/admin/bookings/${id}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchBookings();
  };

  const approveCancellation = async (id) => {

    const token = localStorage.getItem("token");

    await axios.put(
      `${API}/admin/approve-cancellation/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchBookings();
  };

  const rejectCancellation = async (id) => {

    const token = localStorage.getItem("token");

    await axios.put(
      `${API}/admin/reject-cancellation/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchBookings();
  };

  const filtered = bookings.filter((b) =>
    b.user.fullName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="manage-bookings">

      <h1>Manage Bookings</h1>

      <input
        type="text"
        placeholder="Search customer"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>

        <thead>

          <tr>

            <th>ID</th>
            <th>Customer</th>
            <th>Event</th>
            <th>Pass</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {filtered.map((b) => (

            <tr key={b.bookingId}>

              <td>{b.bookingId}</td>
              <td>{b.user.fullName}</td>
              <td>{b.event.title}</td>
              <td>{b.pass.passName}</td>
              <td>{b.quantity}</td>
              <td>₹ {b.totalAmount}</td>
              <td>{b.bookingStatus}</td>

              <td>

                {/* Pending Booking */}

                {b.bookingStatus === "PENDING" && (
                  <>
                    <button
                      className="confirm-btn"
                      onClick={() => confirmBooking(b.bookingId)}
                    >
                      Confirm
                    </button>

                    <button
                      className="cancel-btn"
                      onClick={() => cancelBooking(b.bookingId)}
                    >
                      Cancel
                    </button>
                  </>
                )}

                {/* Cancellation Requested */}

                {b.bookingStatus === "CANCELLATION_REQUESTED" && (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() =>
                        approveCancellation(b.bookingId)
                      }
                    >
                      Approve Request
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        rejectCancellation(b.bookingId)
                      }
                    >
                      Reject Request
                    </button>
                  </>
                )}

                {/* Confirmed */}

                {b.bookingStatus === "CONFIRMED" && (
                  <span className="status confirmed">
                    Confirmed
                  </span>
                )}

                {/* Cancelled */}

                {b.bookingStatus === "CANCELLED" && (
                  <span className="status cancelled">
                    Cancelled
                  </span>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}