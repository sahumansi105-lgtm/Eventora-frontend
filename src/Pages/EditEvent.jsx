import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/EditEvent.css"


export default function EditEvent() {

  const { eventId } = useParams();

  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    city: "",
    venue: "",
    address: "",
    category: "",
    artistName: "",
    eventDate: "",
    eventTime: "",
    imageUrl: ""
  });

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {

    try {

      const response = await axios.get(
        `http://localhost:8080/events/${eventId}`
      );

      setEvent(response.data);

    } catch (error) {

      console.log("EVENT ID =", eventId);

      alert("Unable To Load Event");

    }
  };

  const handleChange = (e) => {

    setEvent({
      ...event,
      [e.target.name]: e.target.value
    });

  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(

        `http://localhost:8080/events/${eventId}`,

        event,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Event Updated Successfully"
      );

      navigate("/manage-events");

    } catch (error) {

      console.log(error);

      alert(
        "Update Failed"
      );
    }
  };

  useEffect(() => {
  if (!eventId) return;
  fetchEvent();
}, [eventId]);

  return (

    <div className="add-event-container">

      <h1>
        ✏️ Edit Event
      </h1>

      <form
        onSubmit={handleUpdate}
        className="event-form"
      >

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={event.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={event.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={event.venue}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={event.address}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={event.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="artistName"
          placeholder="Artist Name"
          value={event.artistName}
          onChange={handleChange}
        />

        <input
          type="date"
          name="eventDate"
          value={event.eventDate}
          onChange={handleChange}
        />

        <input
          type="time"
          name="eventTime"
          value={event.eventTime}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={event.imageUrl}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={event.description}
          onChange={handleChange}
        />

        <button type="submit">
          Update Event
        </button>

      </form>

    </div>
  );
}