import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../CSS/Login.css";

export default function Login() {

  const location = useLocation();

  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    // Email Validation
    if (!login.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(login.email)
    ) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    // Password Validation
    if (!login.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (login.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.warning("Please fix the errors");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      "http://localhost:8080/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(login)
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Invalid Credentials");
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("userId", data.userId);

    toast.success("Login Successful 🎉");

const redirectTo =
  location.state?.redirectTo ||
  (data.role === "ADMIN"
    ? "/admin"
    : "/user/dashboard");

setTimeout(() => {
  navigate(redirectTo);
}, 1000);

  } catch (err) {
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {/* Email */}
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={login.email}
            onChange={handleChange}
          />

          {errors.email && (
            <span className="error-text">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={login.password}
            onChange={handleChange}
          />

          {errors.password && (
            <span className="error-text">
              {errors.password}
            </span>
          )}
        </div>

        <Link to="/Forgotpassword" className="frm2">
          Forgot Password?
        </Link>

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        <p className="frm1">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>
      </form>
    </div>
  );
}