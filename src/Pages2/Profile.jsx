import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaMedal,
  FaStar,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaCheckCircle
} from "react-icons/fa";
import "../CSS/Profile.css";

const API_BASE_URL = "http://localhost:8080";

function Profile() {

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: ""
  });

  const getConfig = () => {

    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const fetchProfile = async () => {

    try {

      const response = await axios.get(
        `${API_BASE_URL}/users/profile`,
        getConfig()
      );

      setUser(response.data);

      setFormData({
        fullName: response.data.fullName,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber
      });

    } catch (error) {

      console.log(error);
      alert("Failed to load profile.");

    }

  };

  useEffect(() => {

    fetchProfile();

  }, []);

  const updateProfile = async () => {

    if (!formData.fullName.trim()) {
      alert("Full Name is required");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      alert("Enter a valid phone number");
      return;
    }

    try {

      const response = await axios.put(
        `${API_BASE_URL}/users/profile/update`,
        formData,
        getConfig()
      );

      setUser(response.data);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      setEditing(false);

      alert("Profile updated successfully.");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data ||
        "Unable to update profile."
      );

    }

  };

  if (!user) {
    
  return (
    <div className="profile-loading">
      <h2>Loading Profile...</h2>
    </div>
  );
}

return (

<div className="profile-page">

  <div className="profile-cover">

    <div className="profile-overlay">

      <div className="profile-avatar">

        {user.fullName.charAt(0).toUpperCase()}

      </div>

      <div className="profile-head">

        <h1>{user.fullName}</h1>

        <p>{user.email}</p>

        <span className={`membership-badge ${user.membership_level?.toLowerCase()}`}>
          <FaMedal /> {user.membership_level} MEMBER
        </span>

      </div>

    </div>

  </div>


  <div className="profile-content">

    <div className="profile-stats">

      <div className="stat-card">

        <FaStar className="stat-icon" />

        <h3>{user.loyaltyPoints}</h3>

        <p>Loyalty Points</p>

      </div>

      <div className="stat-card">

        <FaCheckCircle className="stat-icon" />

        <h3>{user.active ? "ACTIVE" : "INACTIVE"}</h3>

        <p>Account Status</p>

      </div>

      <div className="stat-card">

        <FaCalendarAlt className="stat-icon" />

        <h3>
          {user.registrationDate
            ? new Date(user.registrationDate).toLocaleDateString()
            : "N/A"}
        </h3>

        <p>Member Since</p>

      </div>

    </div>



    <div className="profile-card">

      <div className="card-header">

        <h2>Personal Information</h2>

      </div>

      <div className="profile-grid">

        <div className="profile-item">

          <label>
            <FaUser /> Full Name
          </label>

          {editing ? (

            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: e.target.value
                })
              }
            />

          ) : (

            <p>{user.fullName}</p>

          )}

        </div>


        <div className="profile-item">

          <label>
            <FaEnvelope /> Email
          </label>

          {editing ? (

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value
                })
              }
            />

          ) : (

            <p>{user.email}</p>

          )}

        </div>


        <div className="profile-item">

          <label>
            <FaPhone /> Phone Number
          </label>

          {editing ? (

            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phoneNumber: e.target.value
                })
              }
            />

          ) : (

            <p>{user.phoneNumber}</p>

          )}

        </div>


        <div className="profile-item">

          <label>
            <FaUserShield /> Role
          </label>

          <p>{user.role}</p>

        </div>


        <div className="profile-item">

          <label>
            <FaMedal /> Membership
          </label>

          <p>{user.membership_level}</p>

        </div>


        <div className="profile-item">

          <label>
            <FaStar /> Loyalty Points
          </label>

          <p>{user.loyaltyPoints}</p>

        </div>

      </div>


      <div className="profile-buttons">

        {!editing ? (

          <button
            className="edit-btn"
            onClick={() => setEditing(true)}
          >
            <FaEdit />
            Edit Profile
          </button>

        ) : (

          <>

            <button
              className="save-btn"
              onClick={updateProfile}
            >
              <FaSave />
              Save Changes
            </button>

            <button
              className="cancel-btn"
              onClick={() => {

                setEditing(false);

                setFormData({
                  fullName: user.fullName,
                  email: user.email,
                  phoneNumber: user.phoneNumber
                });

              }}
            >
              <FaTimes />
              Cancel
            </button>

          </>

        )}

      </div>

    </div>

  </div>

</div>

);

}

export default Profile;