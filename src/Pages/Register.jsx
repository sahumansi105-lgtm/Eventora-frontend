import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "../CSS/Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Allow only digits in phone number
    if (name === "phoneNumber") {
      value = value.replace(/\D/g, "");
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    // Full Name
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (form.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone Number
    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^[0-9]{10}$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be exactly 10 digits";
    }

    // Password
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    // Confirm Password
    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword =
        "Confirm Password is required";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.warning("Please fix the errors");
      return;
    }

    const userData = {
      fullName: form.fullName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      password: form.password,
      role: form.role,
    };

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        toast.success(
          "Welcome to Pro Night 🎉 Registration Successful"
        );

        setForm({
          fullName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          role: "USER",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);

} else {
  const message = data?.message || "Registration Failed";

  toast.error(message);

  // Field-specific mapping
  if (message.toLowerCase().includes("email")) {
    setErrors((prev) => ({
      ...prev,
      email: message,
    }));
  }

  if (message.toLowerCase().includes("phone")) {
    setErrors((prev) => ({
      ...prev,
      phoneNumber: message,
    }));
  }
}

    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Server Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form
        className="register-form"
        onSubmit={handleSubmit}
      >
        <h2>Create Account</h2>

        <p className="welcome-text">
          Join Pro Night and unlock exclusive
          event passes, live concerts and VIP
          experiences.
        </p>

        {/* Full Name */}
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
        />
        {errors.fullName && (
          <span className="error-text">
            {errors.fullName}
          </span>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && (
          <span className="error-text">
            {errors.email}
          </span>
        )}

        {/* Phone Number */}
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          maxLength="10"
          value={form.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <span className="error-text">
            {errors.phoneNumber}
          </span>
        )}

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="error-text">
            {errors.password}
          </span>
        )}

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <span className="error-text">
            {errors.confirmPassword}
          </span>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

        <p className="login-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </form>
    </div>
  );
}

