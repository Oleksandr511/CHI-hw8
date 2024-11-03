import React from "react";
import LoginForm from "../LoginForm";

export default function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <div style={{display: "flex", justifyContent: "center" }}>
        <LoginForm />
      </div>
    </div>
  );
}
