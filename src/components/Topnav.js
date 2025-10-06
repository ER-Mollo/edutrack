import React from "react";
import "../Styles/Topnav.css";
import logo from "../Assets/logo/1.png"

const TopNav = ({ userName, onToggleTheme }) => {
  return (
    <div className="topnav">
      <div className="logo">📘 LMS</div>

      <div className="nav-right">
        <button className="theme-toggle" onClick={onToggleTheme}>
          🌙 / ☀️
        </button>
        <div className="profile">
          <img
            src="https://via.placeholder.com/40"
            alt="profile"
            className="profile-pic"
          />
          <span className="username">{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
