import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/ForgotPassword.css"


export default function ForgotPassword() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    otp: "",
    newPass: "",
    confirmPass: ""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  // ================= SEND OTP =================

  const sendOtp = async () => {

    if (!data.email.trim()) {
      alert("Please enter email");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:8080/users/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: data.email
          })
        }
      );

      const result = await res.text();

      if (res.ok) {
        alert(result);
        setStep(2);
      } else {
        alert(result);
      }

    } catch (err) {
      console.log(err);
      alert("Error sending OTP");
    }

    setLoading(false);
  };

  // ================= VERIFY OTP =================

  const verifyOtp = async () => {

    if (!data.otp.trim()) {
      alert("Please enter OTP");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:8080/users/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: data.email,
            otp: data.otp
          })
        }
      );

      const result = await res.text();

      if (result === "Verified") {

        alert("OTP Verified Successfully");

        setStep(3);

      } else {

        alert(result);
      }

    } catch (err) {

      console.log(err);
      alert("Error verifying OTP");
    }

    setLoading(false);
  };

  // ================= RESET PASSWORD =================

  const resetPassword = async () => {

    if (data.newPass.length < 5) {
      alert("Password must be at least 5 characters");
      return;
    }

    if (data.newPass !== data.confirmPass) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:8080/users/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: data.email,
            newPass: data.newPass
          })
        }
      );

      const result = await res.text();

      if (res.ok) {

        alert("Password Updated Successfully");

        navigate("/login");

      } else {

        alert(result);
      }

    } catch (err) {

      console.log(err);
      alert("Error resetting password");
    }

    setLoading(false);
  };

  return (
    <div className="forgot-container">

      <div className="forgot-card">

        <h2>Forgot Password</h2>

        {/* STEP 1 */}

        {step === 1 && (
          <>
            <input
              className="forgot-input"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={data.email}
              onChange={handleChange}
            />

            <button
              className="forgot-btn"
              onClick={sendOtp}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <>
            <input
              className="forgot-input"
              name="otp"
              placeholder="Enter OTP"
              value={data.otp}
              onChange={handleChange}
            />

            <button
              className="forgot-btn"
              onClick={verifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* STEP 3 */}

        {step === 3 && (
          <>
            <input
              className="forgot-input"
              type="password"
              name="newPass"
              placeholder="New Password"
              value={data.newPass}
              onChange={handleChange}
            />

            <input
              className="forgot-input"
              type="password"
              name="confirmPass"
              placeholder="Confirm Password"
              value={data.confirmPass}
              onChange={handleChange}
            />

            <button
              className="forgot-btn"
              onClick={resetPassword}
              disabled={loading}
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </>
        )}

      </div>

    </div>
  );
}