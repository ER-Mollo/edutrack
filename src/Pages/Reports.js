// src/pages/Reports.js
import React, { useState } from "react";
import { FaDownload, FaFileAlt, FaPlus } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/Topnav";

const Reports = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "#f5f5f5" : "#0f172a";
    document.body.style.color = darkMode ? "#000" : "#fff";
  };

  const reportsData = [
    { id: 1, name: "Attendance Report - Jan 2025", type: "Attendance", date: "2025-01-31", status: "Completed" },
    { id: 2, name: "Finance Report - Feb 2025", type: "Finance", date: "2025-02-28", status: "Completed" },
    { id: 3, name: "Course Progress Report - March 2025", type: "Course", date: "2025-03-15", status: "In Progress" },
  ];

  const handleDownload = (report) => {
    alert(`Downloading ${report.name}...`);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "220px" }}>
        <TopNav toggleTheme={toggleTheme} />

        <div style={{ padding: "20px" }}>
          {/* Page Title */}
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
            <FaFileAlt /> Reports
          </h1>

          {/* Filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
            <input type="date" style={inputStyle} />
            <input type="date" style={inputStyle} />
            <select style={inputStyle}>
              <option value="">Report Type</option>
              <option value="attendance">Attendance</option>
              <option value="finance">Finance</option>
              <option value="course">Course</option>
            </select>
            <select style={inputStyle}>
              <option value="">Course</option>
              <option value="web-dev">Web Development</option>
              <option value="data-science">Data Science</option>
            </select>
            <button style={actionBtnStyle} onClick={() => setShowModal(true)}>
              <FaPlus /> Generate Report
            </button>
          </div>

          {/* Reports Table */}
          <div style={{ overflowX: "auto", backgroundColor: darkMode ? "#1a1f3a" : "#fff", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
              <thead style={{ backgroundColor: darkMode ? "#182b5c" : "#f3f4f6", color: darkMode ? "#fff" : "#000" }}>
                <tr>
                  <th style={thStyle}>Report Name</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Generated Date</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {reportsData.map((report) => (
                  <tr key={report.id} style={{ backgroundColor: darkMode ? "#111827" : "#f5f5f5", borderBottom: "1px solid #ccc" }}>
                    <td style={tdStyle}>{report.name}</td>
                    <td style={tdStyle}>{report.type}</td>
                    <td style={tdStyle}>{report.date}</td>
                    <td style={{ ...tdStyle, color: report.status === "Completed" ? "#16a34a" : "#facc15" }}>{report.status}</td>
                    <td style={tdStyle}>
                      <button style={downloadBtnStyle} onClick={() => handleDownload(report)}>
                        <FaDownload /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {showModal && (
            <div style={modalOverlay}>
              <div style={modalContent}>
                <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "10px" }}>Generate New Report</h2>
                <select style={inputStyle}>
                  <option value="">Select Report Type</option>
                  <option value="attendance">Attendance</option>
                  <option value="finance">Finance</option>
                  <option value="course">Course</option>
                </select>
                <select style={inputStyle}>
                  <option value="">Select Course</option>
                  <option value="web-dev">Web Development</option>
                  <option value="data-science">Data Science</option>
                </select>
                <input type="date" style={inputStyle} />
                <input type="date" style={inputStyle} />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                  <button style={deleteBtnStyle} onClick={() => setShowModal(false)}>Cancel</button>
                  <button style={actionBtnStyle}>Generate</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const thStyle = { padding: "10px", textAlign: "left", fontWeight: "bold" };
const tdStyle = { padding: "10px" };
const inputStyle = { padding: "8px", borderRadius: "6px", border: "1px solid #ccc", minWidth: "150px" };
const actionBtnStyle = { padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#182b5c", color: "#fff", cursor: "pointer", fontWeight: "bold" };
const downloadBtnStyle = { ...actionBtnStyle, backgroundColor: "#16a34a" };
const deleteBtnStyle = { padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#dc2626", color: "#fff", cursor: "pointer", fontWeight: "bold" };
const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 50 };
const modalContent = { backgroundColor: "#fff", padding: "20px", borderRadius: "8px", width: "400px", display: "flex", flexDirection: "column" };

export default Reports;
