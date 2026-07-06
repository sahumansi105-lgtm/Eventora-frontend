import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../CSS/EventDetails.css";

const API_BASE_URL = "http://localhost:8080";

const getAvailable = (pass) => Math.max(0, pass?.availableQuantity ?? 0);

const getPassStatus = (pass) => {
  const available = getAvailable(pass);
  const total = pass?.totalQuantity ?? 0;

  if (available <= 0 || pass?.status === "SOLD_OUT") {
    return { label: "Sold Out", className: "sold-out" };
  }

  if (available <= Math.max(5, Math.ceil(total * 0.15))) {
    return { label: "Few Left", className: "few-left" };
  }

  return { label: "Available", className: "available" };
};

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [passes, setPasses] = useState([]);
  const [selectedPassId, setSelectedPassId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const selectedPass = useMemo(
    () => passes.find((pass) => pass.passId === selectedPassId),
    [passes, selectedPassId]
  );

  const startingPass = useMemo(
    () => passes.find((pass) => getAvailable(pass) > 0) || passes[0],
    [passes]
  );

  const fetchEvent = async () => {
    const res = await axios.get(`${API_BASE_URL}/events/${eventId}`);
    setEvent(res.data);
  };

  const fetchPasses = async () => {
    const res = await axios.get(`${API_BASE_URL}/passes/event/${eventId}`);
    const nextPasses = res.data || [];

    setPasses(nextPasses);
    setSelectedPassId((current) => {
      if (current && nextPasses.some((pass) => pass.passId === current && getAvailable(pass) > 0)) {
        return current;
      }

      return nextPasses.find((pass) => getAvailable(pass) > 0)?.passId || null;
    });
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchEvent(), fetchPasses()]);
      } catch (err) {
        console.log(err);
        toast.error("Unable to load event details");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [eventId]);

  useEffect(() => {
    const timer = setInterval(fetchPasses, 10000);
    return () => clearInterval(timer);
  }, [eventId]);

  useEffect(() => {
    if (!event?.eventDate || !event?.eventTime) return;

    const timer = setInterval(() => {
      const diff = new Date(`${event.eventDate}T${event.eventTime}`) - new Date();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: event?.title,
          text: `Check out this event: ${event?.title}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Event link copied");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleBooking = (passId = selectedPassId) => {
    const pass = passes.find((item) => item.passId === passId);

    if (!pass || getAvailable(pass) <= 0) {
      toast.error("Please choose an available pass");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Please login first");
      navigate("/login", { state: { redirectTo: `/booking/${passId}` } });
      return;
    }

    navigate(`/booking/${passId}`);
  };

  if (loading) return <h2 className="ed-state">Loading event...</h2>;
  if (!event) return <h2 className="ed-state">Event not found</h2>;

  return (
    <div className="ed-container">
      <section className="ed-hero">
        <button className="ed-share-btn" onClick={handleShare}>Share</button>
        <img
          src={event.imageUrl || "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"}
          alt={event.title}
        />

        <div className="ed-hero-overlay">
          <h1>{event.title}</h1>
          <p className="ed-hero-tagline">{event.description || "Book verified passes for a premium live event experience."}</p>
          <div className="ed-hero-info">
            <span>{event.city}</span>
            <span>{event.eventDate}</span>
            <span>{event.eventTime}</span>
          </div>
          <button
            className="ed-hero-book-btn"
            onClick={() => document.querySelector(".ed-passes")?.scrollIntoView({ behavior: "smooth" })}
          >
            Choose Pass
          </button>
        </div>
      </section>

      <section className="ed-countdown">
        <h2>Event Starts In</h2>
        <div className="ed-countdown-grid">
          {[
            ["Days", timeLeft.days],
            ["Hours", timeLeft.hours],
            ["Minutes", timeLeft.minutes],
            ["Seconds", timeLeft.seconds],
          ].map(([label, value]) => (
            <div className="ed-time-box" key={label}>
              <h1>{value}</h1>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ed-event-info">
        <h2>Event Details</h2>
        <div className="ed-info-grid">
          <div className="ed-info-card"><span>Venue</span><div><h4>{event.venue}</h4><p>{event.address}</p></div></div>
          <div className="ed-info-card"><span>Artist</span><div><h4>{event.artistName || "To be announced"}</h4><p>{event.category}</p></div></div>
          <div className="ed-info-card"><span>Entry</span><div><h4>Gate opens {event.gateOpenTime || "before showtime"}</h4><p>{event.minAge ? `${event.minAge}+ age limit` : "All ages"}</p></div></div>
          <div className="ed-info-card"><span>Organizer</span><div><h4>{event.organizerName || "Pro Night"}</h4><p>{event.dressCode || "Standard venue rules apply"}</p></div></div>
        </div>
      </section>

      <section className="ed-passes">
        <h2>Choose Your Pass</h2>
        <p className="ed-subtitle">Availability is refreshed from the database while you browse.</p>

        <div className="ed-pass-grid">
          {passes.length === 0 ? (
            <div className="ed-no-pass">
              <h3>No passes available</h3>
              <p>Please check back later.</p>
            </div>
          ) : (
            passes.map((pass) => {
              const status = getPassStatus(pass);
              const available = getAvailable(pass);
              const soldOut = available <= 0 || pass.status === "SOLD_OUT";
              const selected = selectedPassId === pass.passId;

              return (
                <div
                  className={`ed-pass-card ${selected ? "selected" : ""} ${soldOut ? "is-sold-out" : ""}`}
                  key={pass.passId}
                  onClick={() => !soldOut && setSelectedPassId(pass.passId)}
                >
                  <div className="ed-pass-badge">{pass.passType}</div>
                  <span className={`ed-pass-status ${status.className}`}>{status.label}</span>

                  <h3>{pass.passName}</h3>
                  <h1>₹ {pass.discountPrice || pass.price}</h1>
                  {pass.discountPrice && <p className="ed-pass-mrp">Regular ₹ {pass.price}</p>}

                  <ul>
                    <li>{pass.description || pass.highlightLabel || "Verified digital entry pass"}</li>
                    <li>Remaining: <strong>{available}</strong> / {pass.totalQuantity}</li>
                    <li>{pass.seatingType || "General access"} • {pass.entryGate || "Assigned gate"}</li>
                    {pass.foodBenefits && <li>{pass.foodBenefits}</li>}
                  </ul>

                  <button
                    className={soldOut ? "ed-sold-btn" : "ed-book-pass-btn"}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!selected && !soldOut) {
                        setSelectedPassId(pass.passId);
                        return;
                      }
                      handleBooking(pass.passId);
                    }}
                    disabled={soldOut}
                  >
                    {soldOut ? "Sold Out" : selected ? "Book Selected Pass" : "Select Pass"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>

      <section className="ed-terms">
        <h2>Terms & Conditions</h2>
        <div className="ed-terms-grid">
          <div className="ed-term-card">Valid government ID is mandatory for entry.</div>
          <div className="ed-term-card">Each QR pass is valid for one entry only.</div>
          <div className="ed-term-card">Outside food and beverages are not allowed.</div>
          <div className="ed-term-card">Organizer reserves the right of admission.</div>
        </div>
      </section>

      <div className="ed-sticky">
        <div>
          <small>Starting from</small>
          <h3>₹ {startingPass?.discountPrice || startingPass?.price || "--"}</h3>
        </div>
        <button
          onClick={() => handleBooking(selectedPass?.passId)}
          disabled={!selectedPass || getAvailable(selectedPass) <= 0}
        >
          Book Now →
        </button>
      </div>
    </div>
  );
}
