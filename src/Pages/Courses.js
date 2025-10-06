import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/Topnav";

// Sample courses data
const initialCourses = [
  { id: 1, title: "React for Beginners", SAQA: "", lecturer: "John Smith", students: 120, Seta: "MISeta", status: "Active" },
  { id: 2, title: "Python Programming", lecturer: "Jane Doe", students: 80, Seta: "MISeta", status: "Active" },
  { id: 3, title: "JavaScript Advanced", lecturer: "Mark Johnson", students: 50, Seta: "MISeta", status: "Inactive" },
];

const Courses = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [courses, setCourses] = useState(initialCourses);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterLecturer, setFilterLecturer] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", lecturer: "", students: 0, startDate: "", status: "Active" });

  // Dark/Light mode toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "#f5f5f5" : "#0f172a";
    document.body.style.color = darkMode ? "#000" : "#fff";
  };

  // Button handlers
  const handleAdd = () => setShowModal(true);

  const handleSaveCourse = () => {
    setCourses([...courses, { id: courses.length + 1, ...newCourse }]);
    setNewCourse({ title: "", lecturer: "", students: 0, startDate: "", status: "Active" });
    setShowModal(false);
  };

  const handleEdit = (course) => alert(`Edit course: ${course.title}`);

  const handleDelete = (course) => {
    if (window.confirm(`Are you sure you want to delete ${course.title}?`)) {
      setCourses(courses.filter((c) => c.id !== course.id));
    }
  };

  // CSV Download
  const handleDownload = () => {
    const csv = [
      ["Title", "Lecturer", "Students", "Start Date", "Status"],
      ...courses.map(c => [c.title, c.lecturer, c.students, c.startDate, c.status])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "courses.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter courses
  const filteredCourses = courses.filter(course =>
    (filterStatus === "" || course.status === filterStatus) &&
    (filterLecturer === "" || course.lecturer === filterLecturer)
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "220px" }}>
        <TopNav toggleTheme={toggleTheme} />
        <div style={{ padding: "20px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Courses</h2>

          {/* Actions + Filters */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <button style={actionBtnStyle} onClick={handleAdd}>➕ Add Course</button>
            <button style={downloadBtnStyle} onClick={handleDownload}>⬇️ Download</button>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={inputStyle}>
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select value={filterLecturer} onChange={(e) => setFilterLecturer(e.target.value)} style={inputStyle}>
              <option value="">All Lecturers</option>
              <option value="John Smith">John Smith</option>
              <option value="Jane Doe">Jane Doe</option>
              <option value="Mark Johnson">Mark Johnson</option>
            </select>
          </div>

          {/* Courses Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
              <thead style={{ backgroundColor: darkMode ? "#1a1f3a" : "#182b5c", color: "#fff" }}>
                <tr>
                  <th style={thStyle}>#</th>
                  <th style={thStyle}>Qualifications</th>
                  <th style={thStyle}>SETA</th>
                  <th style={thStyle}>SAQA ID</th>
                  <th style={thStyle}>Facilitator</th>
                  <th style={thStyle}>Students</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, index) => (
                  <tr key={course.id} style={{ backgroundColor: index % 2 === 0 ? (darkMode ? "#111827" : "#f5f5f5") : "transparent" }}>
                    <td style={tdStyle}>{index + 1}</td>
                    <td style={tdStyle}>{course.title}</td>
                    <td style={tdStyle}>{course.Seta}</td>
                    <td style={tdStyle}>{course.SAQA}</td>
                    <td style={tdStyle}>{course.lecturer}</td>
                    <td style={tdStyle}>{course.students}</td>
                    <td style={tdStyle}>{course.status}</td>
                    <td style={tdStyle}>
                      <button style={editBtnStyle} onClick={() => handleEdit(course)}>Edit</button>
                      <button style={deleteBtnStyle} onClick={() => handleDelete(course)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Course Modal */}
          {showModal && (
            <div style={modalOverlay}>
              <div style={modalContent}>
                <h3 style={{ marginBottom: "10px" }}>Add New Course</h3>
                <input style={inputStyle} placeholder="Course Title" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
                <input style={inputStyle} placeholder="Lecturer" value={newCourse.lecturer} onChange={(e) => setNewCourse({ ...newCourse, lecturer: e.target.value })} />
                <input style={inputStyle} type="number" placeholder="Students" value={newCourse.students} onChange={(e) => setNewCourse({ ...newCourse, students: e.target.value })} />
                <input style={inputStyle} type="date" value={newCourse.startDate} onChange={(e) => setNewCourse({ ...newCourse, startDate: e.target.value })} />
                <select style={inputStyle} value={newCourse.status} onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value })}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  <button style={deleteBtnStyle} onClick={() => setShowModal(false)}>Cancel</button>
                  <button style={actionBtnStyle} onClick={handleSaveCourse}>Save</button>
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
const inputStyle = { padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "10px", minWidth: "150px" };
const actionBtnStyle = { padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#182b5c", color: "#fff", cursor: "pointer", fontWeight: "bold" };
const downloadBtnStyle = { ...actionBtnStyle, backgroundColor: "#16a34a" };
const editBtnStyle = { padding: "5px 10px", marginRight: "5px", borderRadius: "6px", border: "none", backgroundColor: "#2563eb", color: "#fff", cursor: "pointer" };
const deleteBtnStyle = { padding: "5px 10px", borderRadius: "6px", border: "none", backgroundColor: "#dc2626", color: "#fff", cursor: "pointer" };
const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" };
const modalContent = { backgroundColor: "#fff", padding: "20px", borderRadius: "8px", width: "400px", display: "flex", flexDirection: "column" };

export default Courses;
