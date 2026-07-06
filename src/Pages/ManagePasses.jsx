import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/ManagePasses.css";

export default function ManagePasses() {

  const navigate = useNavigate();

  const [passes, setPasses] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPasses();
  }, []);

  const fetchPasses = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8080/passes"
      );

      setPasses(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const deletePass = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this pass?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:8080/passes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchPasses();

    } catch (err) {

      console.log(err);

    }
  };

  const filtered = passes.filter((p) => {

    const keyword = search.toLowerCase();

    return (
      (p.passName || "")
        .toLowerCase()
        .includes(keyword) ||

      (p.passType || "")
        .toLowerCase()
        .includes(keyword) ||

      (p.event?.title || "")
        .toLowerCase()
        .includes(keyword)
    );
  });

  return (

    <div className="manage-pass-container">

      <div className="manage-pass-topbar">

        <h2>🎟 Manage Passes</h2>

        <div>

          <input
            className="manage-pass-search"
            placeholder="Search Pass..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button
            className="manage-pass-add-btn"
            onClick={() =>
              navigate("/admin/add-pass")
            }
          >
            ➕ Add Pass
          </button>

        </div>

      </div>

      <table className="manage-pass-table">

        <thead>

          <tr>
            <th>ID</th>
            <th>Event</th>
            <th>Pass Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Available</th>
            <th>Status</th>
            <th>Event Date</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filtered.map((p) => (

            <tr key={p.passId}>

              <td>{p.passId}</td>

              <td>{p.event?.title}</td>

              <td>{p.passName}</td>

              <td>{p.passType}</td>

              <td>₹{p.price}</td>

              <td>
                {p.availableQuantity <= 10 ? (
                  <span className="low-stock">
                    {p.availableQuantity} ⚠ Low Stock
                  </span>
                ) : (
                  p.availableQuantity
                )}
              </td>

              <td>

                <span
                  className={
                    p.availableQuantity > 0
                      ? "status-available"
                      : "status-soldout"
                  }
                >
                  {p.availableQuantity > 0
                    ? "Available"
                    : "Sold Out"}
                </span>

              </td>

              <td>

                {p.event?.eventDate
                  ? new Date(
                      p.event.eventDate
                    ).toLocaleDateString()
                  : "-"}

              </td>

              <td>

<button
  className="manage-pass-edit-btn"
  onClick={() =>
    navigate(
      `/admin/edit-pass/${p.passId}`
    )
  }
>
  Edit
</button>

                <button
                  className="manage-pass-delete-btn"
                  onClick={() =>
                    deletePass(p.passId)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}