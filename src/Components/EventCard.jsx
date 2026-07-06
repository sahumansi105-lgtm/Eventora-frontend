import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "../CSS/EventCard.css";

export default function EventCard({
  event,
  onWishlistToggle,
  isWishlisted,
}) {
  const navigate = useNavigate();

  const [startingPrice, setStartingPrice] = useState(null);

  // Load starting price when card loads
  useEffect(() => {
    const loadStartingPrice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/passes/event/${event.eventId}`
        );

        const passes = response.data;

        console.log("Passes:", passes);

        if (passes && passes.length > 0) {
          const minPrice = Math.min(
            ...passes.map((pass) => Number(pass.price))
          );

          setStartingPrice(minPrice);
        }
      } catch (error) {
        console.log("Error loading price:", error);
      }
    };

    if (event?.eventId) {
      loadStartingPrice();
    }
  }, [event.eventId]);

  const handleBookNow = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/passes/event/${event.eventId}`
      );

      const passes = response.data;

      if (!passes || passes.length === 0) {
        toast.error("No pass available for this event");
        return;
      }

      const passId = passes[0].passId;
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("Please Login First");

        navigate("/login", {
          state: {
            redirectTo: `/booking/${passId}`,
          },
        });

        return;
      }

      navigate(`/booking/${passId}`);
    } catch (error) {
      console.log(error);
      toast.error("Unable to start booking");
    }
  };

  const handleWishlist = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Please Login First");

      navigate("/login", {
        state: {
          redirectTo: `/events/${event.eventId}`,
        },
      });

      return;
    }

    onWishlistToggle(event);
  };

  return (
    <div className="event-card">
      <div className="event-image-container">
        <img
          src={
            event.imageUrl ||
            "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
          }
          alt={event.title}
          className="event-image"
        />

        <button
          className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={handleWishlist}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>

        {event.trending && (
          <span className="badge trending">
            🔥 Trending
          </span>
        )}
      </div>

      <div className="event-content">
        <h3>{event.title}</h3>

        <p>📍 {event.city}</p>

        <p>📅 {event.eventDate}</p>

        <p className="price">
          {startingPrice !== null
            ? `Starting from ₹${startingPrice}`
            : "Price unavailable"}
        </p>

        <div className="event-actions">
          <Link
            to={`/events/${event.eventId}`}
            className="details-btn"
          >
            View Details
          </Link>

          <button
            className="book-btn"
            onClick={handleBookNow}
          >
            🎫 Book Now
          </button>
        </div>
      </div>
    </div>
  );
}