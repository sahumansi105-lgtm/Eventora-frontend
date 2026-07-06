import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";

const API_BASE_URL = "http://localhost:8080";

export default function QrScanner() {
  const scannerRef = useRef(null);
  const validatingRef = useRef(false);
  const [result, setResult] = useState("");
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    if (scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(async (decodedText) => {
      if (validatingRef.current) return;
      validatingRef.current = true;
      setValidating(true);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${API_BASE_URL}/bookings/validate`,
          { qrData: decodedText },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setResult(response.data);
      } catch (err) {
        console.log(err);
        setResult("Validation failed. Please try again.");
      } finally {
        setTimeout(() => {
          validatingRef.current = false;
          setValidating(false);
        }, 1500);
      }
    });

    scannerRef.current = scanner;

    return () => {
      scanner.clear().catch(() => {});
      scannerRef.current = null;
    };
  }, []);

  return (
    <div style={{ padding: "28px", color: "white" }}>
      <h1>Scan QR Ticket</h1>
      <p>Scan a digital pass to validate entry. A confirmed pass can be used only once.</p>

      <div
        id="qr-reader"
        style={{
          maxWidth: "520px",
          marginTop: "20px",
          background: "white",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />

      {result && (
        <div
          style={{
            maxWidth: "520px",
            marginTop: "18px",
            padding: "16px",
            borderRadius: "8px",
            background: result.includes("Valid Ticket") ? "#065f46" : "#991b1b",
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
}
