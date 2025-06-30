import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

function ContactPage() {
  const navigate = useNavigate();

  const onBackToHomepage = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc, #d8cde9)"
    }}>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "720px",
          margin: "0 auto",
          paddingTop: "2rem",
          padding: "2rem",
          borderRadius: "16px",
          backgroundColor: "rgba(255, 255, 255, 0.88)",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.06)",
          color: "#2d3748",
        }}
      >
        {/* Back button */}
        <button
          onClick={onBackToHomepage}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#4f3d60",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            padding: "6px 12px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            marginBottom: "1.5rem",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
            transition: "background 0.3s ease"
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = "#6e5d7e"}
          onMouseOut={e => e.currentTarget.style.backgroundColor = "#4f3d60"}
        >
          <Home size={16} />
          Back to Homepage
        </button>

        <h1 style={{ fontSize: "1.75rem", color: "rgb(30, 158, 107)", fontWeight: 700, marginBottom: "2rem" }}>
          Contact Information
        </h1>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.2rem", color: "#4f3d60", marginBottom: "0.5rem" }}>
            Website Creator
          </h2>
          <p><strong>Student ID:</strong> pm455@student.le.ac.uk</p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.2rem", color: "#4f3d60", marginBottom: "0.5rem" }}>
            Website Admin
          </h2>
          <p><strong>Email:</strong> pm455GC@gmail.com</p>
          <p><strong>Contact Number:</strong> +44 77XX XXX XXXX</p>
        </section>
      </div>
    </div>
  );
}

export default ContactPage;
