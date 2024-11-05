import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
        height: "100vh",
      }}
    >
      <h1 style={{ color: "#a39f9f" }}>Register Page</h1>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <RegisterForm />
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>
          Already have account? <Link to="/login">Login</Link>
        </h3>
      </div>
    </div>
  );
}
