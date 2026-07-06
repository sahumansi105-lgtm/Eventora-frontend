import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/EditPass.css"

export default function EditPass() {

  const { passId } = useParams();
  const navigate = useNavigate();


  const [form, setForm] = useState({
  passName: "",
  passType: "",
  description: "",

  price: "",
  discountPrice: "",
  currency: "INR",

  totalQuantity: "",
  availableQuantity: "",

  minPerBooking: 1,
  maxPerBooking: 10,
  maxPerUser: 10,

  entryGate: "",
  seatingType: "",

  highlightLabel: "",

  saleStartDateTime: "",
  saleEndDateTime: "",

  status: "AVAILABLE",

  basePrice: "",

  firstTierLimit: "",
  firstTierPrice: "",

  secondTierLimit: "",
  secondTierPrice: "",

  finalTierPrice: "",

  foodBenefits: ""
});

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:8080/passes/${passId}`)
      .then(res => setForm(res.data));
  }, [passId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:8080/passes/${passId}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Updated!");
    navigate("/manage-passes");
  };

  return (
    <div className="edit-pass-container">
      <h2>Edit Pass</h2>

      <form onSubmit={handleUpdate} className="edit-pass-form">

      <h3 className="section-title">🎫 Basic Details</h3>
      <input
  type="text"
  name="passName"
  placeholder="Pass Name"
  value={form.passName || ""}
  onChange={handleChange}
/>

<select
  name="passType"
  value={form.passType || ""}
  onChange={handleChange}
>
  <option value="">Select Type</option>
  <option value="SILVER">SILVER</option>
  <option value="GOLD">GOLD</option>
  <option value="VIP">VIP</option>
  <option value="VVIP">VVIP</option>
  <option value="COUPLE">COUPLE</option>
</select>

<textarea
  name="description"
  value={form.description || ""}
  onChange={handleChange}
/>

<h3 className="section-title">💰 Pricing</h3>
<input
  type="number"
  name="price"
  value={form.price || ""}
  onChange={handleChange}
/>

<input
  type="number"
  name="discountPrice"
  value={form.discountPrice || ""}
  onChange={handleChange}
/>

<select
  name="currency"
  value={form.currency || "INR"}
  onChange={handleChange}
>
  <option value="INR">INR</option>
</select>

<h3 className="section-title">📦 Quantity</h3>
<input
  type="number"
  name="totalQuantity"
  value={form.totalQuantity || ""}
  onChange={handleChange}
/>

<input
  type="number"
  name="availableQuantity"
  value={form.availableQuantity || ""}
  onChange={handleChange}
/>


<h3 className="section-title">🎟 Booking Limits</h3>
<input
  type="number"
  name="minPerBooking"
  value={form.minPerBooking || ""}
  onChange={handleChange}
/>

<input
  type="number"
  name="maxPerBooking"
  value={form.maxPerBooking || ""}
  onChange={handleChange}
/>

<input
  type="number"
  name="maxPerUser"
  value={form.maxPerUser || ""}
  onChange={handleChange}
/>

<h3 className="section-title">🚪 Entry & Seating</h3>
<input
  type="text"
  name="entryGate"
  placeholder="Gate A"
  value={form.entryGate || ""}
  onChange={handleChange}
/>

<select
  name="seatingType"
  value={form.seatingType || ""}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="STANDING">STANDING</option>
  <option value="SEATED">SEATED</option>
  <option value="FRONT_ROW">FRONT_ROW</option>
  <option value="LOUNGE">LOUNGE</option>
</select>

<h3 className="section-title">⭐ Highlights</h3>
<input
  type="text"
  name="highlightLabel"
  placeholder="Best Seller"
  value={form.highlightLabel || ""}
  onChange={handleChange}
/>

<h3 className="section-title">📅 Sale Timing</h3>
<input
  type="datetime-local"
  name="saleStartDateTime"
  value={
 form.saleStartDateTime
   ? form.saleStartDateTime.substring(0,16)
   : ""
}
  onChange={handleChange}
/>

<input
  type="datetime-local"
  name="saleEndDateTime"
 value={
 form.saleEndDateTime
   ? form.saleEndDateTime.substring(0,16)
   : ""
}
  onChange={handleChange}
/>

<h3 className="section-title">📌 Booking Status</h3>

<select
  name="status"
  value={form.status || ""}
  onChange={handleChange}
>
  <option value="AVAILABLE">AVAILABLE</option>
  <option value="SOLD_OUT">SOLD_OUT</option>
  <option value="PAUSED">PAUSED</option>
  <option value="EXPIRED">EXPIRED</option>
</select>

<h3 className="section-title">📈 Dynamic Pricing</h3>
<input
  type="number"
  name="basePrice"
  value={form.basePrice || ""}
  onChange={handleChange}
/>

<input
  type="number"
  name="firstTierLimit"
  value={form.firstTierLimit || ""}
  onChange={handleChange}
/>

<input
  type="number"
  name="firstTierPrice"
  value={form.firstTierPrice || ""}
  onChange={handleChange}
/>

<input
  type="number"
  name="secondTierLimit"
  value={form.secondTierLimit || ""}
  onChange={handleChange}
/>

<input
  type="number"
  name="secondTierPrice"
  value={form.secondTierPrice || ""}
  onChange={handleChange}
/>

<input
  type="number"
  name="finalTierPrice"
  value={form.finalTierPrice || ""}
  onChange={handleChange}
/>

<h3 className="section-title">🍔 Food Benefits</h3>
<textarea
  name="foodBenefits"
  placeholder="Unlimited Drinks, Snacks Included"
  value={form.foodBenefits || ""}
  onChange={handleChange}
/>

        <button type="submit">
            Update Pass
        </button>
      </form>

    </div>
  );
}