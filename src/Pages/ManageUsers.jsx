import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/ManageUsers.css";

const API = "http://localhost:8080";

export default function ManageUsers() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API}/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(response.data);

    } catch (err) {

      console.log(err);

    }
  };

  const deleteUser = async (id) => {

    const token = localStorage.getItem("token");

    if (!window.confirm("Delete this user?")) {
      return;
    }

    try {
      await axios.delete(
        `${API}/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers((current) => current.filter((user) => user.userId !== id));
      setMessage("User deleted successfully");
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data || "Unable to delete user");
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.fullName || ""} ${user.email || ""} ${user.phoneNumber || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="manage-users">

      <h1>Manage Users</h1>

      {message && <p className="manage-users-message">{message}</p>}

      <input
        type="text"
        placeholder="Search User..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>

        <thead>

          <tr>

            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Membership</th>
            <th>Points</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredUsers.map((user) => (

            <tr key={user.userId}>

              <td>{user.userId}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td>{user.membershipLevel}</td>
              <td>{user.loyaltyPoints}</td>

              <td>

                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user.userId)}
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
