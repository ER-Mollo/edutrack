import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Sidebar.css";
import logo from "../Assets/logo/2.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={logo} alt="LMS Logo" className="login-logo" />

      <ul>
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link" : ""}>
            📊 Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/courses" className={({ isActive }) => isActive ? "active-link" : ""}>
            📚 Qualifications
          </NavLink>
        </li>
        <li>
          <NavLink to="/learners" className={({ isActive }) => isActive ? "active-link" : ""}>
            👩‍🎓 Learners
          </NavLink>
        </li>
        <li>
          <NavLink to="/finance" className={({ isActive }) => isActive ? "active-link" : ""}>
            📈 Finance
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className={({ isActive }) => isActive ? "active-link" : ""}>
            📝 Reports
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => isActive ? "active-link" : ""}>
            ⚙️ Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
