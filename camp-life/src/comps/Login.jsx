import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCriteriaError, setPasswordCriteriaError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Password criteria validation
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(newPassword)) {
      setPasswordCriteriaError("Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character");
    } else {
      setPasswordCriteriaError(""); // Clear the error message if criteria are met
    }
  };

  const authenticateUser = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success === true && data.token) {
          localStorage.setItem("token", data.token);
          navigate("/Dashboard");
        } else {
          setError(data.error || "Authentication failed");
        }
      } else {
        setError("Network or server error");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError("Internal error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (passwordCriteriaError) {
      // Do not submit the form if there are validation errors
      return;
    }

    setError(""); // Clear any previous error messages
    await authenticateUser(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        {error && <div className="error-message">{error}</div>}
        {passwordCriteriaError && <div className="error-message">{passwordCriteriaError}</div>}

        <label htmlFor="email">Email/Username:</label>
        <input
          type="text"
          id="email"
          placeholder="Email/Username"
          value={email}
          onChange={handleEmailChange}
          autoComplete="off"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="off"
        />

        <button className="btn-submit" type="submit">
          Login
        </button>
      </div>
    </form>
  );
}
