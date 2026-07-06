import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Recommendation.css";

const API = "http://localhost:8080";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a";

const getImageSrc = (imageUrl) => {
  if (!imageUrl) {
    return FALLBACK_IMAGE;
  }

  const normalizedUrl = imageUrl.replace(/\\/g, "/").trim();

  if (/^(https?:|data:|blob:)/i.test(normalizedUrl)) {
    return normalizedUrl;
  }

  return `${API}/${normalizedUrl.replace(/^\/+/, "")}`;
};

export default function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

const getAuthData = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return {
    userId: localStorage.getItem("userId") || user.userId,
    token: localStorage.getItem("token"),
  };
};

  const fetchRecommendations = async () => {
    const { userId, token } = getAuthData();

    if (!userId || userId === "null") {
      setError("User not logged in");
      setLoading(false);
      return;
    }  

    try {
      setLoading(true);
      setError("");

      console.log("Fetching recommendations for user:", userId);

      const res = await axios.get(
        `${API}/api/recommendations/${userId}`,
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );
      

      console.log("Response:", res.data);

      if (Array.isArray(res.data)) {
        setRecommendations(res.data);
      } else {
        setRecommendations([]);
      }
    } catch (err) {
      console.error("Recommendation Error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Response:", err.response.data);

        setError(
          err.response.data?.message ||
            `Server Error (${err.response.status})`
        );
      } else if (err.request) {
        console.log("No response from server");
        setError("Cannot connect to backend.");
      } else {
        console.log(err.message);
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="recommend-page">
        <h2 className="loading">Loading Recommendations...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommend-page">
        <h2 className="error">{error}</h2>

        <button
          className="retry-btn"
          onClick={fetchRecommendations}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="recommend-page">
      <h1>Recommended For You</h1>

      {recommendations.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
        <div className="recommend-grid">
          {recommendations.map((event) => (
            <div className="recommend-card" key={event.eventId}>
              <img
                src={getImageSrc(event.imageUrl)}
                alt={event.title}
                className="event-image"
                onError={(e) => {
                  e.target.src = FALLBACK_IMAGE;
                }}
              />

              <div className="recommend-content">
                <h2>{event.title}</h2>

                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>City:</strong> {event.city}</p>
                <p><strong>Artist:</strong> {event.artistName}</p>
                <p><strong>Why:</strong> {event.reason}</p>

                <p>
                  <strong>Date:</strong>{" "}
                  {event.eventDate
                    ? new Date(event.eventDate).toLocaleDateString()
                    : "N/A"}
                </p>

                <button
                  onClick={() =>
                    navigate(`/events/${event.eventId}`)
                  }
                >
                  View Event
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
