import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Addpass.css"

export default function AddPass() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    eventId: "",

    passName: "",
    passType: "",
    description: "",

    price: "",
    discountPrice: "",

    totalQuantity: "",

    minPerBooking: "",
    maxPerBooking: "",
    maxPerUser: "",

    entryGate: "",
    seatingType: "",
    highlightLabel: "",

    foodBenefits: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8080/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

const handleChange = (e) => {

  const { name, value } = e.target;

  let updated = {
    ...form,
    [name]: value
  };

  if (name === "passType") {

    if (value === "SILVER") {
      updated.minPerBooking = 1;
      updated.maxPerBooking = 10;
      updated.maxPerUser = 20;
    }

    else if (value === "GOLD") {
      updated.minPerBooking = 1;
      updated.maxPerBooking = 8;
      updated.maxPerUser = 15;
    }

    else if (value === "VIP") {
      updated.minPerBooking = 1;
      updated.maxPerBooking = 4;
      updated.maxPerUser = 6;
    }

    else if (value === "VVIP") {
      updated.minPerBooking = 1;
      updated.maxPerBooking = 2;
      updated.maxPerUser = 2;
    }
  }

  setForm(updated);
};

  const handleSubmit = async (e) => {

    e.preventDefault();

    const payload = {

      passName: form.passName,
      passType: form.passType,
      description: form.description,

      price: Number(form.price),

      discountPrice:
        form.discountPrice === ""
          ? null
          : Number(form.discountPrice),

      totalQuantity: Number(form.totalQuantity),

      minPerBooking: Number(form.minPerBooking),
      maxPerBooking: Number(form.maxPerBooking),
      maxPerUser: Number(form.maxPerUser),

      entryGate: form.entryGate,

      seatingType: form.seatingType,

      highlightLabel: form.highlightLabel,

      foodBenefits: form.foodBenefits
    };

    try {

      await axios.post(
        `http://localhost:8080/passes/event/${form.eventId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Pass Added Successfully");

      navigate("/manage-passes");

    }
    catch (err) {

      console.log(err);

      console.log(err.response?.data);

      alert(err.response?.data || "Error Adding Pass");

    }

  };

  return (

    <div className="add-pass-container">

      <div className="add-pass-header">
  <span className="ap-badge">🎟 CREATE NEW PASS</span>
  <h2>Add Event Pass</h2>
  <p>Create ticket categories and pricing for your event.</p>
</div>

      <form className="add-pass-form" 
      onSubmit={handleSubmit}>

        <select
          name="eventId"
          value={form.eventId}
          onChange={handleChange}
          required
        >
          <option value="">Select Event</option>

          {events.map((e) => (

            <option
              key={e.eventId}
              value={e.eventId}
            >
              {e.title}
            </option>

          ))}
        </select>


        <input
          name="passName"
          placeholder="Pass Name"
          value={form.passName}
          onChange={handleChange}
          required
        />

        <select
          name="passType"
          value={form.passType}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>

          <option value="SILVER">SILVER</option>
          <option value="GOLD">GOLD</option>
          <option value="VIP">VIP</option>
          <option value="VVIP">VVIP</option>

        </select>


        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="discountPrice"
          placeholder="Discount Price"
          value={form.discountPrice}
          onChange={handleChange}
        />

        <input
          type="number"
          name="totalQuantity"
          placeholder="Total Quantity"
          value={form.totalQuantity}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="minPerBooking"
          placeholder="Min Per Booking"
          value={form.minPerBooking}
          onChange={handleChange}
        />

        <input
          type="number"
          name="maxPerBooking"
          placeholder="Max Per Booking"
          value={form.maxPerBooking}
          onChange={handleChange}
        />

        <input
          type="number"
          name="maxPerUser"
          placeholder="Max Per User"
          value={form.maxPerUser}
          onChange={handleChange}
        />

        <input
          name="entryGate"
          placeholder="Entry Gate"
          value={form.entryGate}
          onChange={handleChange}
        />

        <input
          name="seatingType"
          placeholder="Seating Type"
          value={form.seatingType}
          onChange={handleChange}
        />

        <input
          name="highlightLabel"
          placeholder="Highlight Label"
          value={form.highlightLabel}
          onChange={handleChange}
        />

        <textarea
          name="foodBenefits"
          placeholder="Food Benefits"
          value={form.foodBenefits}
          onChange={handleChange}
        />

        <button type="submit">

          Create Pass

        </button>

      </form>

    </div>

  );

}