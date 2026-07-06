import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../CSS/Booking.css";

const API_BASE_URL = "http://localhost:8080";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

// Mirrors backend BookingService.resolveTicketPrice so the total shown to the
// user matches what Razorpay will actually be charged.
const resolveTicketPrice = (pass) => {
  if (!pass) return 0;
  const sold = pass.soldQuantity ?? 0;

  if (
    pass.firstTierLimit != null &&
    pass.firstTierPrice != null &&
    sold < pass.firstTierLimit
  ) {
    return pass.firstTierPrice;
  }
  if (
    pass.secondTierLimit != null &&
    pass.secondTierPrice != null &&
    sold < pass.secondTierLimit
  ) {
    return pass.secondTierPrice;
  }
  if (pass.finalTierPrice != null) {
    return pass.finalTierPrice;
  }
  return pass.price ?? 0;
};

export default function BookingPage() {

  const { passId } = useParams();
  const navigate = useNavigate();

  const [pass, setPass] = useState(null);
  const [user, setUser] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("token");
    const storedUser = getStoredUser();

    if (!token || token === "null" || token === "undefined") {
      toast.warning("Please Login First");
      navigate("/login", {
        state: {
          redirectTo: `/booking/${passId}`
        }
      });
      return;
    }

    if (!storedUser) {
      localStorage.removeItem("token");
      toast.warning("Please Login Again");
      navigate("/login");
      return;
    }

    setUser(storedUser);

    fetchPassDetails();
    
  }, [passId, navigate]);

  const fetchPassDetails = async () => {

    try {

      const response = await axios.get(
        `${API_BASE_URL}/passes/${passId}`
      );

      const p = response.data;
      setPass(p);

      // Initial quantity: respect minPerBooking, but never exceed
      // availableQuantity or maxPerBooking. If sold out, keep 0.
      const min = p.minPerBooking || 1;
      const maxBooking = p.maxPerBooking || min;
      const avail = p.availableQuantity ?? 0;

      if (avail <= 0) {
        setQuantity(0);
      } else {
        setQuantity(Math.min(min, maxBooking, avail));
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to load pass details");
    } finally {
      setLoading(false);
    }

  };


const effectiveMax = pass
  ? Math.min(
      pass.availableQuantity ?? 0,
      pass.maxPerBooking ?? 10
    )
  : 0;

const available = pass?.availableQuantity ?? 0;
const soldOut = available === 0;

let availabilityStatus = "";
let availabilityClass = "";

if (available === 0) {
  availabilityStatus = "🔴 Sold Out";
  availabilityClass = "sold-out";
} else if (available <= 20) {
  availabilityStatus = `🔥 Only ${available} tickets left! Book now`;
  availabilityClass = "few-left";
} else if (available <= 100) {
  availabilityStatus = "🟠 Selling Fast";
  availabilityClass = "selling-fast";
} else {
  availabilityStatus = "🟢 Available";
  availabilityClass = "available";
}
 

  const increaseQty = () => {
    if (!pass) return;

    if (quantity >= (pass.availableQuantity ?? 0)) {
      toast.warning("No more tickets available");
      return;
    }

    if (quantity >= (pass.maxPerBooking ?? 10)) {
      toast.warning(`Maximum ${pass.maxPerBooking} tickets per booking`);
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {

    const minPerBooking = pass?.minPerBooking || 1;

    if (quantity > minPerBooking) {
      setQuantity(prev => prev - 1);
    }

  };

  const ticketPrice = resolveTicketPrice(pass);
  const subtotal = pass ? ticketPrice * quantity : 0;
  const discount = pass?.discountPrice && pass.discountPrice < pass.price
    ? (pass.price - pass.discountPrice) * quantity
    : 0;
  const convenienceFee = 50;
  const gstRate = 0.18;

const gst = Math.round(subtotal * gstRate);
const totalAmount = Math.round(subtotal + convenienceFee + gst - discount);

  const handlePayment = async () => {

    if (soldOut) {
      toast.error("Sold out");
      return;
    }

    if (quantity < (pass?.minPerBooking || 1)) {
      toast.error(`Minimum ${pass.minPerBooking} tickets required`);
      return;
    }

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    if (paying) return;
    setPaying(true);

    let createdBookingId = null;

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_BASE_URL}/bookings/create`,
        null,
        {
          params: {
            passId: Number(passId),
            qty: quantity
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const booking = response.data;
      createdBookingId = booking.bookingId;

      const releasePending = async () => {
        if (!createdBookingId) return;
        try {
          await axios.put(
            `${API_BASE_URL}/bookings/release/${createdBookingId}`,
            null,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (e) {
          console.log("release failed", e);
        }
      };

      const options = {

        key: "rzp_test_SxWIB2QdMulsrk",

        amount: booking.totalAmount * 100,

        currency: "INR",

        name: "PRO NIGHT",

        description: booking.event.title,

        order_id: booking.razorpayOrderId,

        prefill: {

          name: booking.user.fullName,

          email: booking.user.email,

          contact: booking.user.phoneNumber

        },

        modal: {
          // If the user closes the Razorpay modal without paying, release
          // the reserved inventory so other users can book it.
          ondismiss: async () => {
            await releasePending();
            setPaying(false);
            toast.info("Payment cancelled. Tickets released.");
            fetchPassDetails();
          }
        },

        handler: async function (response) {

          const paymentResponse = await axios.post(
            `${API_BASE_URL}/bookings/payment/success`,
            null,
            {
              params: {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature
              },
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          toast.success("Payment Successful 🎉");

          navigate(`/payment-success/${paymentResponse.data.bookingId}`, {
            state: {
              booking: paymentResponse.data,
              payment: {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id
              }
            }
          });

        }

      };

      

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", async () => {
        await releasePending();
        setPaying(false);
        toast.error("Payment failed. Tickets released.");
        fetchPassDetails();
      });

      razorpay.open();

    } catch (error) {
      console.log(error);
      console.log("Status :", error.response?.status);
      console.log("Data :", error.response?.data);
      toast.error(error.response?.data || "Booking Failed");
      setPaying(false);
    }

  };

  if (loading) {
    return <h2>Loading Booking Details...</h2>;
  }

  if (!pass) {
    return <h2>Pass Not Found</h2>;
  }

  return (

    <div className="booking-container">

      <div className="booking-card">

        <h1>🎫 Booking Summary</h1>

        {pass.event?.imageUrl && (
          <img
            src={pass.event.imageUrl}
            alt={pass.event.title}
            className="booking-image"
          />
        )}

        <div className="booking-section">
          <h2>Promo Code</h2>
          <input
            className="booking-input"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="Optional promo code"
          />
        </div>

        <div className="booking-section">

          <h2>Event Details</h2>

          <p><strong>Event Name:</strong> {pass.event?.title}</p>

          <p><strong>Artist:</strong> {pass.event?.artistName}</p>

          <p><strong>Venue:</strong> {pass.event?.venue}</p>

          <p><strong>Date:</strong> {pass.event?.eventDate}</p>

          <p><strong>Time:</strong> {pass.event?.eventTime}</p>

        </div>

        <div className="booking-section">

          <h2>Pass Details</h2>

<p><strong>Ticket Category:</strong> {pass.passName}</p>

<p><strong>Ticket Type:</strong> {pass.passType}</p>

          <p><strong>Entry Gate:</strong> {pass.entryGate}</p>

          <p><strong>Seating:</strong> {pass.seatingType}</p>

          <p>
            <strong>Price Per Ticket:</strong> ₹{ticketPrice}
          </p>

<p>
  <strong>Remaining Tickets:</strong> {available}
</p>

<p className={availabilityClass}>
  {availabilityStatus}
</p>

<p>
  <strong>Booking Rules:</strong>
  Min {pass.minPerBooking} ticket • Max {pass.maxPerBooking} per booking
</p>

          {pass.foodBenefits && (
            <p>
              <strong>Benefits:</strong>
              {" "}
              {pass.foodBenefits}
            </p>
          )}

        </div>

        {user && (

          <div className="booking-section">

            <h2>Your Details</h2>

            <p><strong>Name:</strong> {user.fullName}</p>

            <p><strong>Email:</strong> {user.email}</p>

            <p><strong>Phone:</strong> {user.phoneNumber}</p>

          </div>

        )}

        <div className="booking-section">

          <h2>Quantity</h2>

          <div className="qty-box">

            <button
              data-testid="decrease-qty-btn"
              onClick={decreaseQty}
              disabled={soldOut}
            >
              -
            </button>

            <span data-testid="qty-value">{quantity}</span>

            <button
              data-testid="increase-qty-btn"
              onClick={increaseQty}
              disabled={soldOut || quantity >= effectiveMax}
            >
              +
            </button>

          </div>

        </div>

        <div className="total-box">

          <p><span>Tickets</span><strong>₹{subtotal}</strong></p>
          <p><span>Convenience Fee</span><strong>₹{convenienceFee}</strong></p>
          <p><span>GST</span><strong>₹{gst}</strong></p>
          <p><span>Discount</span><strong>-₹{discount}</strong></p>

          <h2 data-testid="total-amount">
            Total Amount : ₹{totalAmount}
          </h2>

        </div>

        <label className="booking-terms">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          I agree to the event terms and understand each QR pass is valid for one entry.
        </label>

        <button
          data-testid="confirm-pay-btn"
          className="pay-btn"
          onClick={handlePayment}
          disabled={soldOut || paying || quantity <= 0 || !termsAccepted}
        >
          {soldOut
            ? "Sold Out"
            : paying
            ? "Processing..."
            : `Confirm & Pay ₹${totalAmount}`}
        </button>

      </div>

    </div>


  );

}         
