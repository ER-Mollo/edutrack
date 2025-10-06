import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/Topnav";

// Sample data with sponsor
const initialLearners = [
  { id: 1, name: "John Doe", course: "React", attendance: 92, dateJoined: "2025-01-10", payment: "Paid", contact: "0821234567", sponsor: "Sponsor A" },
  { id: 2, name: "Jane Smith", course: "Python", attendance: 88, dateJoined: "2025-02-05", payment: "Pending", contact: "0837654321", sponsor: "Sponsor B" },
  { id: 3, name: "Mark Johnson", course: "JavaScript", attendance: 95, dateJoined: "2025-03-15", payment: "Paid", contact: "0849876543", sponsor: "Sponsor A" },
];

const Learners = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState({ sponsor: "", payment: "" });
  const [learners, setLearners] = useState(initialLearners);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "#f5f5f5" : "#0f172a";
    document.body.style.color = darkMode ? "#000" : "#fff";
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleAdd = () => alert("Open Add Learner form/modal");
  const handleEdit = (learner) => alert(`Edit learner: ${learner.name}`);
  const handleDelete = (learner) => {
    if (window.confirm(`Are you sure you want to delete ${learner.name}?`)) {
      setLearners(learners.filter((l) => l.id !== learner.id));
    }
  };

  const handleDownloadReport = (learner) => {
    const report = `
Learner Report
==============
Name: ${learner.name}
Course: ${learner.course}
Sponsor: ${learner.sponsor}
Attendance: ${learner.attendance}%
Date Joined: ${learner.dateJoined}
Payment: ${learner.payment}
Contact: ${learner.contact}
    `;
    const element = document.createElement("a");
    const file = new Blob([report], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${learner.name.replace(" ", "_")}_report.txt`;
    document.body.appendChild(element);
    element.click();
  };

  // Filter learners by sponsor and payment
  const filteredLearners = learners.filter((learner) => {
    return (
      (filters.sponsor === "" || learner.sponsor.toLowerCase() === filters.sponsor.toLowerCase()) &&
      (filters.payment === "" || learner.payment.toLowerCase() === filters.payment.toLowerCase())
    );
  });

  // Unique sponsors for dropdown
  const sponsors = ["All", ...new Set(learners.map(l => l.sponsor))];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "220px" }}>
        <TopNav toggleTheme={toggleTheme} />
        <div style={{ padding: "20px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Learners</h2>

          {/* Action Buttons & Filters */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <button style={actionBtnStyle} onClick={handleAdd}>➕ Add Learner</button>

            <div style={{ display: "flex", gap: "15px" }}>
              <select name="sponsor" value={filters.sponsor} onChange={handleFilterChange} style={inputStyle}>
                {sponsors.map((s, i) => (
                  <option key={i} value={s === "All" ? "" : s}>{s}</option>
                ))}
              </select>
              <select name="payment" value={filters.payment} onChange={handleFilterChange} style={inputStyle}>
                <option value="">All Payments</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "950px" }}>
              <thead style={{ backgroundColor: darkMode ? "#1a1f3a" : "#182b5c", color: "#fff" }}>
                <tr>
                  <th style={thStyle}>#</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Course</th>
                  <th style={thStyle}>Sponsor</th>
                  <th style={thStyle}>Attendance</th>
                  <th style={thStyle}>Date Joined</th>
                  <th style={thStyle}>Payment</th>
                  <th style={thStyle}>Contact</th>
                  <th style={thStyle}>Actions</th>
                  <th style={thStyle}>Report</th>
                </tr>
              </thead>
              <tbody>
                {filteredLearners.map((learner, index) => (
                  <tr key={learner.id} style={{ backgroundColor: index % 2 === 0 ? (darkMode ? "#111827" : "#f5f5f5") : "transparent" }}>
                    <td style={tdStyle}>{index + 1}</td>
                    <td style={tdStyle}>{learner.name}</td>
                    <td style={tdStyle}>{learner.course}</td>
                    <td style={tdStyle}>{learner.sponsor}</td>
                    <td style={tdStyle}>{learner.attendance}%</td>
                    <td style={tdStyle}>{learner.dateJoined}</td>
                    <td style={tdStyle}>{learner.payment}</td>
                    <td style={tdStyle}>{learner.contact}</td>
                    <td style={tdStyle}>
                      <button style={editBtnStyle} onClick={() => handleEdit(learner)}>Edit</button>
                      <button style={deleteBtnStyle} onClick={() => handleDelete(learner)}>Delete</button>
                    </td>
                    <td style={tdStyle}>
                      <button style={downloadBtnStyle} onClick={() => handleDownloadReport(learner)}>📥</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
const editBtnStyle = { padding: "5px 10px", marginRight: "5px", borderRadius: "6px", border: "none", backgroundColor: "#2563eb", color: "#fff", cursor: "pointer" };
const deleteBtnStyle = { padding: "5px 10px", borderRadius: "6px", border: "none", backgroundColor: "#dc2626", color: "#fff", cursor: "pointer" };
const downloadBtnStyle = { padding: "5px 10px", borderRadius: "6px", border: "none", backgroundColor: "#16a34a", color: "#fff", cursor: "pointer" };

export default Learners;
