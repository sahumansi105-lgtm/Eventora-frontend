import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/ManageEvents.css";
import { useNavigate } from "react-router-dom";

export default function ManageEvents() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/events"
      );

      setEvents(response.data);

    } catch (error) {

      console.log(error);
      alert("Failed to load events");

    }
  };

  const deleteEvent = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8080/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Event Deleted Successfully");

      fetchEvents();

    } catch (error) {

      console.log(error);
      alert("Unable to delete event");

    }
  };

  const filteredEvents = events.filter((event) => {

    const keyword = search.toLowerCase();

    return (

      (event.title || "")
        .toLowerCase()
        .includes(keyword)

      ||

      (event.city || "")
        .toLowerCase()
        .includes(keyword)

      ||

      (event.category || "")
        .toLowerCase()
        .includes(keyword)

    );

  });

  return (

    <div className="manage-events">

      {/* HEADER */}

      <div className="events-header">

        <h1>🎉 Manage Events</h1>

        <button
          className="manage-events-add-btn"
          onClick={() => navigate("/admin/add-event")}
        >
          ➕ Add Event
        </button>

      </div>

      {/* SEARCH */}

      <input
        className="event-search"
        type="text"
        placeholder="Search Event, City or Category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* EVENTS GRID */}

      <div className="events-grid">

        {filteredEvents.map((event) => (

          <div
            className="event-card"
            key={event.eventId}
          >

            <div className="event-card-header">

              <h3 className="event-title">
                {event.title}
              </h3>

              {
                new Date(event.eventDate) > new Date()

                  ? (
                    <span className="event-status-upcoming">
                      Upcoming
                    </span>
                  )

                  : (
                    <span className="event-status-completed">
                      Completed
                    </span>
                  )
              }

            </div>

            <div className="event-details">

              <p>
                📍 <strong>City:</strong> {event.city}
              </p>

              <p>
                🎭 <strong>Category:</strong> {event.category}
              </p>

              <p>
                📅 <strong>Date:</strong>{" "}
                {
                  event.eventDate
                    ? new Date(event.eventDate)
                        .toLocaleDateString()
                    : "-"
                }
              </p>

              <p>
                🆔 <strong>ID:</strong> {event.eventId}
              </p>

            </div>

            <div className="event-card-actions">

    <button
  className="event-edit-btn"
  onClick={() =>
    navigate(
      `/admin/edit-event/${event.eventId}`
    )
  }
>
  ✏ Edit
</button>

              <button
                className="event-delete-btn"
                onClick={() =>
                  deleteEvent(event.eventId)
                }
              >
                🗑 Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}