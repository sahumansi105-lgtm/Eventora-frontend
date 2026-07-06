import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/AddEvent.css"

export default function AddEvent() {

  const navigate = useNavigate();

  const [event, setEvent] = useState({
  title: "",
  description: "",
  category: "",
  season: "",
  mood: "",
  city: "",
  venue: "",
  address: "",
  eventDate: "",
  eventTime: "",
  gateOpenTime: "",
  eventEndTime: "",
  imageUrl: "",
  artistName: "",
  organizerName: "",
  minAge: 18,
  dressCode: "",
  tags: "",
  featured: false,
  trending: false
});
 

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log(localStorage.getItem("token"));
      console.log("event: ",event);
      

      await axios.post(
        "http://localhost:8080/events",
        event,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Event Added Successfully 🎉");

      navigate("/manage-events");

    } catch (error) {
  console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);
  console.log(error);
}
  };

  return (
<div className="add-event-container">

  <div className="add-event-header">

    <span className="ae-badge">
      🎉 CREATE NEW EVENT
    </span>

    <h1>
      Add Your Next Big Night
    </h1>

    <p>
      Fill in the details below and create an unforgettable
      event experience for your audience.
    </p>
    </div>

<form className="add-event-form"
onSubmit={handleSubmit}>

  <input
    type="text"
    name="title"
    placeholder="Event Name"
    onChange={handleChange}
  />

  <textarea
    name="description"
    placeholder="Description"
    onChange={handleChange}
  />

<select
  name="category"
  value={event.category}
  onChange={handleChange}
>
  <option value="">Select Category</option>
  <option value="DJ Night">DJ Night</option>
  <option value="Concert">Concert</option>
  <option value="Festival">Festival</option>
  <option value="Celebrity">Celebrity</option>
  <option value="College Fest">College Fest</option>
</select>

<select
  name="season"
  value={event.season}
  onChange={handleChange}
>
  <option value="">Select Season</option>
  <option value="SUMMER">SUMMER</option>
  <option value="MONSOON">MONSOON</option>
  <option value="DIWALI">DIWALI</option>
  <option value="NEW_YEAR">NEW YEAR</option>
  <option value="HOLI">HOLI</option>
</select>

<select
  name="mood"
  value={event.mood}
  onChange={handleChange}
>
  <option value="">Select Mood</option>
  <option value="PARTY">PARTY</option>
  <option value="ROMANTIC">ROMANTIC</option>
  <option value="FAMILY">FAMILY</option>
  <option value="PREMIUM">PREMIUM</option>
  <option value="COLLEGE">COLLEGE</option>
</select>

  <input
    type="text"
    name="city"
    placeholder="City"
    onChange={handleChange}
  />

  <input
    type="text"
    name="venue"
    placeholder="Venue"
    onChange={handleChange}
  />

  <input
    type="text"
    name="address"
    placeholder="Address"
    onChange={handleChange}
  />

 <div className="form-group">
    <label>Event Date</label>
    <input
        type="date"
        name="eventDate"
        onChange={handleChange}
    />


  <label>Event Time :-</label>
  <input
    type="time"
    name="eventTime"
    onChange={handleChange}
  />

  <label>Gate Open Time :-</label>
  <input
    type="datetime-local"
    name="gateOpenTime"
    onChange={handleChange}
  />

  <label>Event End Time :-</label>
  <input
    type="datetime-local"
    name="eventEndTime"
    onChange={handleChange}
  />

</div>

  <input
    type="text"
    name="imageUrl"
    placeholder="Image URL"
    onChange={handleChange}
  />

  <input
    type="text"
    name="artistName"
    placeholder="Artist Name"
    onChange={handleChange}
  />

  <input
    type="text"
    name="organizerName"
    placeholder="Organizer Name"
    onChange={handleChange}
  />

  <input
    type="number"
    name="minAge"
    placeholder="Minimum Age"
    onChange={handleChange}
  />

  <input
    type="text"
    name="dressCode"
    placeholder="Dress Code"
    onChange={handleChange}
  />

  <input
    type="text"
    name="tags"
    placeholder="Tags"
    onChange={handleChange}
  />

  <label>
    Featured
    <input
      type="checkbox"
      name="featured"
      checked={event.featured}
      onChange={(e) =>
        setEvent({
          ...event,
          featured: e.target.checked
        })
      }
    />
  </label>

  <label>
    Trending
    <input
      type="checkbox"
      name="trending"
      checked={event.trending}
      onChange={(e) =>
        setEvent({
          ...event,
          trending: e.target.checked
        })
      }
    />
  </label>

  <button type="submit">
    Add Event
  </button>

</form>

    </div>
    
  );
}