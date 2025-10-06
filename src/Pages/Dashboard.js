import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/Topnav";
import { AttendanceChart, PerformanceChart } from "../components/Charts";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState("All");

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "#f5f5f5" : "#0f172a";
    document.body.style.color = darkMode ? "#000" : "#fff";
  };

  // Example sponsors
  const sponsors = ["All", "Sponsor A", "Sponsor B", "Sponsor C"];

  // Download function
  const handleDownload = () => {
    const report = `
Dashboard Report
================
Sponsor: ${selectedSponsor}

📊 Stats
- Students: 1245
- Courses: 78
- Attendance: 92%
- Performance: 88%

📅 Upcoming Events
- Staff Meeting - 22 Aug 2025
- Course Review - 25 Aug 2025
- Report Generation Deadline - 30 Aug 2025
    `;

    const element = document.createElement("a");
    const file = new Blob([report], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "dashboard_report.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "220px" }}>
        <TopNav toggleTheme={toggleTheme} />

        <div style={{ padding: "20px" }}>
          {/* Welcome Section */}
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "5px" }}>Welcome, Admin!</h2>
            <p style={{ color: darkMode ? "#ddd" : "#555" }}>
              Here's what's happening in your LMS today.
            </p>
          </div>

          {/* Sponsor Dropdown */}
          <div style={{ marginBottom: "20px", display: "flex", gap: "15px", alignItems: "center" }}>
            <div>
              <label style={{ marginRight: "10px", fontWeight: "bold" }}>Select Sponsor:</label>
              <select
                value={selectedSponsor}
                onChange={(e) => setSelectedSponsor(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  backgroundColor: darkMode ? "#1a1f3a" : "#fff",
                  color: darkMode ? "#fff" : "#000",
                }}
              >
                {sponsors.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Download Button */}
            <button onClick={handleDownload} style={downloadBtnStyle}>
              ⬇️ Download Report
            </button>
          </div>

          {/* Stats Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            <div style={cardStyle}>
              Students <p style={statStyle}>1,245</p>
            </div>
            <div style={cardStyle}>
              Courses <p style={statStyle}>78</p>
            </div>
            <div style={cardStyle}>
              Attendance <p style={statStyle}>92%</p>
            </div>
            <div style={cardStyle}>
              Performance <p style={statStyle}>88%</p>
            </div>
          </div>

          {/* Recent Activities */}
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              backgroundColor: darkMode ? "#1a1f3a" : "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Recent Activities</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>👤 John Doe registered as a new student</li>
              <li>📚 New course "React for Beginners" added</li>
              <li>📝 Attendance for Class A updated</li>
            </ul>
          </div>

          {/* Graphs */}
          <div
            style={{
              marginTop: "30px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div
              style={{
                padding: "20px",
                backgroundColor: darkMode ? "#1a1f3a" : "#fff",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>Attendance Trend</h3>
              <AttendanceChart />
            </div>
            <div
              style={{
                padding: "20px",
                backgroundColor: darkMode ? "#1a1f3a" : "#fff",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>Course Completion</h3>
              <PerformanceChart />
            </div>
          </div>

          {/* Upcoming Events */}
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              backgroundColor: darkMode ? "#1a1f3a" : "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Upcoming Events</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>📅 Staff Meeting - 22 Aug 2025</li>
              <li>📅 Course Review - 25 Aug 2025</li>
              <li>📅 Report Generation Deadline - 30 Aug 2025</li>
            </ul>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
            <button style={actionBtnStyle}>➕ Add User</button>
            <button style={actionBtnStyle}>➕ Add Course</button>
            <button style={actionBtnStyle}>📑 Generate Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const cardStyle = {
  padding: "20px",
  backgroundColor: "#fff",
  color: "#182b5c",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const statStyle = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginTop: "10px",
};

const actionBtnStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#182b5c",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};

const downloadBtnStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Dashboard;
