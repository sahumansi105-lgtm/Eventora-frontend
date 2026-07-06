// Home.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Footer from "../Components/Footer";
import "../CSS/Home.css";

export default function Home() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Hero Carousel Images
  const heroImages = [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Celebrity Section
  const stars = [
    {
      name: "Karan Aujla",
      profession: "Punjabi Singer",
      image:
        "https://media.insider.in/image/upload/c_crop,g_custom/v1756999925/m6gmdpmfdnpsrri6synm.png"
    },
    {
      name: "Arijit Singh",
      profession: "Playback Singer",
      image:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
    },
    {
      name: "Shreya Ghoshal",
      profession: "Singer",
      image:
        "https://images.unsplash.com/photo-1503095396549-807759245b35"
    },
    {
      name: "Zakir Khan",
      profession: "Stand-up Comedian",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43d"
    },
    {
      name: "Alan Walker",
      profession: "DJ & Producer",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
    },
    {
      name: "Virat Kohli",
      profession: "Celebrity Guest",
      image:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974"
    }
  ];

  // Fan Moments
const fans = [
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a", // singer stage vibe
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4", // live concert crowd
  "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2", // audience cheering
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f", // DJ / concert lights
  "https://images.unsplash.com/photo-1521334884684-d80222895322", // festival crowd
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7", // stage performance
  "https://images.unsplash.com/photo-1464375117522-1311dd50d294", // concert lights
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"  // live music vibe
];

  // FETCH EVENTS
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/events");
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // HERO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // UPCOMING EVENTS (LIMIT 6)
  const MAX_UPCOMING = 6;

  const upcomingEvents = events
    .filter((e) => {
      if (!e.eventDate) return false;

      return (
        new Date(
          `${e.eventDate}T${e.eventTime || "00:00"}`
        ) > new Date()
      );
    })
    .sort(
      (a, b) =>
        new Date(
          `${a.eventDate}T${a.eventTime || "00:00"}`
        ) -
        new Date(
          `${b.eventDate}T${b.eventTime || "00:00"}`
        )
    )
    .slice(0, MAX_UPCOMING);

  // TRENDING EVENTS (LIMIT 6)
  const MAX_TRENDING = 6;

  const trendingEvents = events
    .filter((e) => e.trending)
    .sort((a, b) => b.eventId - a.eventId)
    .slice(0, MAX_TRENDING);

  const nextEvent = upcomingEvents[0];

  // COUNTDOWN
  useEffect(() => {
    if (!nextEvent) return;

    const timer = setInterval(() => {
      const date = nextEvent?.eventDate;
      const time = nextEvent?.eventTime || "00:00";

      const target = new Date(`${date}T${time}`);

      if (isNaN(target.getTime())) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }

      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }

      setCountdown({
        days: Math.floor(
          diff / (1000 * 60 * 60 * 24)
        ),
        hours: Math.floor(
          (diff / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (diff / (1000 * 60)) % 60
        ),
        seconds: Math.floor((diff / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [nextEvent]);

  return (
    <>
      <main className="homePageContainer">
        {/* HERO SECTION */}
        <section className="homeHeroSection">
          <img
            className="homeHeroImage"
            src={heroImages[currentImage]}
            alt=""
          />

          <div className="homeHeroOverlay">
            <h1>EVENTROA</h1>
            <h2>Discover. Book. Experience.</h2>

            <p>
              Explore concerts, festivals, workshops,
              sports, cultural events and unforgettable
              experiences.
            </p>

            <div className="homeHeroButtons">
              <button
                onClick={() =>
                  navigate(
                    localStorage.getItem("token")
                      ? "/events"
                      : "/login"
                  )
                }
              >
                Explore Events
              </button>

              <button
                onClick={() =>
                  navigate(
                    localStorage.getItem("token")
                      ? "/events"
                      : "/login"
                  )
                }
              >
                Book Now
              </button>

              <button
                onClick={() =>
                  navigate(
                    localStorage.getItem("token")
                      ? "/recommendations"
                      : "/login"
                  )
                }
              >
                🤖 AI Recommendations
              </button>
            </div>
          </div>
        </section>

        {/* COUNTDOWN */}
        {nextEvent && (
          <section className="homeCountdownSection">
            <h1>Upcoming Event</h1>
            <h2>{nextEvent.title}</h2>

            <p>📍 {nextEvent.city}</p>

            <div className="homeCountdownGrid">
              <div>
                <h1>{countdown.days}</h1>
                <p>Days</p>
              </div>

              <div>
                <h1>{countdown.hours}</h1>
                <p>Hours</p>
              </div>

              <div>
                <h1>{countdown.minutes}</h1>
                <p>Minutes</p>
              </div>

              <div>
                <h1>{countdown.seconds}</h1>
                <p>Seconds</p>
              </div>
            </div>

            <button
              onClick={() =>
                navigate(`/events/${nextEvent.eventId}`)
              }
            >
              Book Tickets
            </button>
          </section>
        )}

        {/* STARS */}
        <section className="homeStarsSection">
          <h1>⭐ Meet The Stars</h1>

          <div className="starsSlider">
            {stars.map((star, index) => (
              <div className="starCard" key={index}>
                <img src={star.image} alt="" />
                <div className="starOverlay">
                  <h2>{star.name}</h2>
                  <p>{star.profession}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRENDING */}
        <section className="homeTrendingSection">
          <h1>🔥 Trending Events</h1>

          <button className="viewAllBtn" onClick={() => navigate("/events?filter=trending")}>
            View All Trending
          </button>

          <div className="homeTrendingGrid">
            {trendingEvents.map((event) => (
              <div
                className="homeTrendingCard"
                key={event.eventId}
              >
                <img src={event.imageUrl} alt="" />

                <div>
                  <h3>{event.title}</h3>
                  <p>{event.artistName}</p>

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
        </section>

        {/* FAN MOMENTS */}
        <section className="homeFansSection">
          <h1>🎉 Fan Moments</h1>

          <div className="homeFansGrid">
            {fans.map((img, index) => (
              <img
                key={index}
                src={img}
                className="homeFanImage"
                alt=""
              />
            ))}
          </div>
        </section>

        {/* UPCOMING */}
        <section className="homeUpcomingSection">
          <h1>Upcoming Events</h1>

          <button className="viewAllBtn" onClick={() => navigate("/events")}>
            View All Events
          </button>

          <div className="homeUpcomingGrid">
            {upcomingEvents.map((event) => (
              <div
                className="homeUpcomingCard"
                key={event.eventId}
              >
                <img src={event.imageUrl} alt="" />
                <h3>{event.title}</h3>
                <p>📍 {event.city}</p>
                <p>📅 {event.eventDate}</p>

                <button
                  onClick={() =>
                    navigate(`/events/${event.eventId}`)
                  }
                >
                  Book Tickets
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* JOIN */}
        <section className="homeFomoSection">
          <h1>10,000+</h1>
          <h2>Music Lovers</h2>
          <p>Already enjoying unforgettable nights.</p>

          <button
            onClick={() =>
              navigate(
                localStorage.getItem("token")
                  ? "/events"
                  : "/login"
              )
            }
          >
            Join The Experience
          </button>
        </section>
      </main>

      <Footer />
    </>
  );
}