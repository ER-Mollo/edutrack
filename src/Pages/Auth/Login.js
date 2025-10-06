import React from "react";
import "../../Styles/Login.css";
import logo from "../../Assets/logo/1.png"; // place your logo.png in the same folder

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="LMS Logo" className="login-logo" />
        <h2>Welcome Back</h2>
        <p>Please login to continue</p>

        <form className="login-form">
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>

        <div className="login-footer">
          <p>Forgot Password?</p>
          <p>
            Don’t have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
