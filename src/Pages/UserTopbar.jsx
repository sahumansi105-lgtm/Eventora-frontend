import "../CSS/UserTopbar.css"

export default function UserTopbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="user-topbar">

      <div>
        <h2>Welcome Back 👋</h2>
      </div>

      <div className="user-info">

        <div className="avatar">
          {user?.fullName?.charAt(0)}
        </div>

        <div>
          <h3>{user?.fullName}</h3>
          <p>{user?.role}</p>
        </div>

      </div>

    </div>
  );
}