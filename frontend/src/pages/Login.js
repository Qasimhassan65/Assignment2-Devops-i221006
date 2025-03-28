import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      setError("Both fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify({ id: data.user.id, email: data.user.email, token: data.token }));

      alert("Login Successful!");
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <p className="register-link">
        Not a user? <Link to="/register">Register now</Link>
      </p>
    </div>
  );
};

export default Login;
