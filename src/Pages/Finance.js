import React, { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/Topnav";

// ---- Sample data ------------------------------------------------------------
const initialPayments = [
  {
    id: 1,
    student: "John Doe",
    course: "React for Beginners",
    amountDue: 4500,
    amountPaid: 4500,
    date: "2025-02-01",
    method: "EFT",
    notes: "Paid in full",
  },
  {
    id: 2,
    student: "Jane Smith",
    course: "Python Programming",
    amountDue: 5000,
    amountPaid: 2500,
    date: "2025-02-10",
    method: "Card",
    notes: "First installment",
  },
  {
    id: 3,
    student: "Michael Brown",
    course: "JavaScript Advanced",
    amountDue: 6000,
    amountPaid: 0,
    date: "2025-03-05",
    method: "Cash",
    notes: "Pending approval",
  },
  {
    id: 4,
    student: "Aisha Khan",
    course: "Python Programming",
    amountDue: 5000,
    amountPaid: 5000,
    date: "2025-03-12",
    method: "EFT",
    notes: "",
  },
];

// ---- Helpers ----------------------------------------------------------------
const currency = (n) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(
    Number(n || 0)
  );

const statusOf = (p) => {
  const bal = Number(p.amountDue) - Number(p.amountPaid);
  if (bal <= 0) return "Paid";
  if (p.amountPaid > 0 && bal > 0) return "Partially Paid";
  return "Pending";
};

const unique = (arr) => [...new Set(arr)];

// ---- Component --------------------------------------------------------------
const Finance = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [rows, setRows] = useState(initialPayments);

  // Filters
  const [q, setQ] = useState(""); // search student
  const [status, setStatus] = useState("");
  const [course, setCourse] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null); // null = adding
  const [form, setForm] = useState({
    student: "",
    course: "",
    amountDue: "",
    amountPaid: "",
    date: "",
    method: "EFT",
    notes: "",
  });

  // TopNav toggle theme (kept consistent with your other pages)
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "#f5f5f5" : "#0f172a";
    document.body.style.color = darkMode ? "#000" : "#fff";
  };

  // Derived values
  const courses = useMemo(
    () => unique(rows.map((r) => r.course)).sort(),
    [rows]
  );

  const filtered = rows.filter((r) => {
    const rStatus = statusOf(r);
    const matchesQ =
      q.trim() === "" ||
      r.student.toLowerCase().includes(q.trim().toLowerCase());
    const matchesStatus = status === "" || rStatus === status;
    const matchesCourse = course === "" || r.course === course;
    const d = new Date(r.date);
    const afterFrom = !from || d >= new Date(from + "T00:00:00");
    const beforeTo = !to || d <= new Date(to + "T23:59:59");
    return matchesQ && matchesStatus && matchesCourse && afterFrom && beforeTo;
  });

  const totals = useMemo(() => {
    const income = filtered.reduce((s, r) => s + Number(r.amountPaid), 0);
    const due = filtered.reduce((s, r) => s + Number(r.amountDue), 0);
    const balance = due - income;
    const paidCount = filtered.filter((r) => statusOf(r) === "Paid").length;
    const pendingCount = filtered.filter((r) => statusOf(r) !== "Paid").length;
    return { income, balance, paidCount, pendingCount, due };
  }, [filtered]);

  // CRUD
  const openAdd = () => {
    setEditing(null);
    setForm({
      student: "",
      course: "",
      amountDue: "",
      amountPaid: "",
      date: "",
      method: "EFT",
      notes: "",
    });
    setShowModal(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm({
      student: row.student,
      course: row.course,
      amountDue: String(row.amountDue),
      amountPaid: String(row.amountPaid),
      date: row.date,
      method: row.method,
      notes: row.notes || "",
    });
    setShowModal(true);
  };

  const saveForm = () => {
    const payload = {
      ...form,
      amountDue: Number(form.amountDue || 0),
      amountPaid: Number(form.amountPaid || 0),
      date: form.date || new Date().toISOString().slice(0, 10),
    };

    if (editing) {
      setRows((prev) =>
        prev.map((r) => (r.id === editing.id ? { ...editing, ...payload } : r))
      );
    } else {
      const nextId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
      setRows((prev) => [...prev, { id: nextId, ...payload }]);
    }

    setShowModal(false);
    setEditing(null);
  };

  const deleteRow = (row) => {
    if (window.confirm(`Delete payment for ${row.student}?`)) {
      setRows((prev) => prev.filter((r) => r.id !== row.id));
    }
  };

  // CSV export (exports the filtered view)
  const downloadCSV = () => {
    const header = [
      "Student",
      "Course",
      "Amount Due",
      "Amount Paid",
      "Balance",
      "Status",
      "Date",
      "Method",
      "Notes",
    ];
    const data = filtered.map((r) => {
      const balance = Number(r.amountDue) - Number(r.amountPaid);
      return [
        r.student,
        r.course,
        r.amountDue,
        r.amountPaid,
        balance,
        statusOf(r),
        r.date,
        r.method,
        (r.notes || "").replace(/[\n\r,]/g, " "),
      ];
    });
    const csv = [header, ...data].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "finance-payments.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "220px" }}>
        <TopNav toggleTheme={toggleTheme} />
        <div style={{ padding: "20px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Finance</h2>

          {/* Summary cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
            <div style={cardStyle}>
              <div style={cardTitle}>Total Due (Filtered)</div>
              <div style={cardMetric}>{currency(totals.due)}</div>
            </div>
            <div style={cardStyle}>
              <div style={cardTitle}>Total Income (Filtered)</div>
              <div style={cardMetric}>{currency(totals.income)}</div>
            </div>
            <div style={cardStyle}>
              <div style={cardTitle}>Outstanding Balance</div>
              <div style={cardMetric}>{currency(totals.balance)}</div>
            </div>
            <div style={cardStyle}>
              <div style={cardTitle}>Paid / Unpaid</div>
              <div style={cardMetric}>
                {totals.paidCount} / {totals.pendingCount}
              </div>
            </div>
          </div>

          {/* Actions + Filters */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button style={actionBtnStyle} onClick={openAdd}>
                ➕ Add Payment
              </button>
              <button style={downloadBtnStyle} onClick={downloadCSV}>
                ⬇️ Download CSV
              </button>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <input
                style={inputStyle}
                placeholder="Search student..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <select style={inputStyle} value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Partially Paid">Partially Paid</option>
                <option value="Pending">Pending</option>
              </select>
              <select style={inputStyle} value={course} onChange={(e) => setCourse(e.target.value)}>
                <option value="">All Courses</option>
                {courses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                style={inputStyle}
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="From"
              />
              <input
                style={inputStyle}
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="To"
              />
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1000px" }}>
              <thead style={{ backgroundColor: darkMode ? "#1a1f3a" : "#182b5c", color: "#fff" }}>
                <tr>
                  <th style={thStyle}>#</th>
                  <th style={thStyle}>Student</th>
                  <th style={thStyle}>Course</th>
                  <th style={thStyle}>Amount Due</th>
                  <th style={thStyle}>Amount Paid</th>
                  <th style={thStyle}>Balance</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Method</th>
                  <th style={thStyle}>Notes</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, idx) => {
                  const balance = Number(r.amountDue) - Number(r.amountPaid);
                  const st = statusOf(r);
                  return (
                    <tr
                      key={r.id}
                      style={{
                        backgroundColor:
                          idx % 2 === 0 ? (darkMode ? "#111827" : "#f5f5f5") : "transparent",
                      }}
                    >
                      <td style={tdStyle}>{idx + 1}</td>
                      <td style={tdStyle}>{r.student}</td>
                      <td style={tdStyle}>{r.course}</td>
                      <td style={tdStyle}>{currency(r.amountDue)}</td>
                      <td style={tdStyle}>{currency(r.amountPaid)}</td>
                      <td style={tdStyle}>{currency(balance)}</td>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>
                        {st}
                      </td>
                      <td style={tdStyle}>{r.date}</td>
                      <td style={tdStyle}>{r.method}</td>
                      <td style={tdStyle}>{r.notes}</td>
                      <td style={tdStyle}>
                        <button style={editBtnStyle} onClick={() => openEdit(r)}>
                          Edit
                        </button>
                        <button style={deleteBtnStyle} onClick={() => deleteRow(r)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={11} style={{ ...tdStyle, textAlign: "center", opacity: 0.7 }}>
                      No records match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {showModal && (
            <div style={modalOverlay}>
              <div style={modalContent}>
                <h3 style={{ marginBottom: 10 }}>
                  {editing ? "Edit Payment" : "Add Payment"}
                </h3>

                <input
                  style={inputStyle}
                  placeholder="Student Name"
                  value={form.student}
                  onChange={(e) => setForm({ ...form, student: e.target.value })}
                />
                <input
                  style={inputStyle}
                  placeholder="Course"
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                />
                <input
                  style={inputStyle}
                  type="number"
                  placeholder="Amount Due"
                  value={form.amountDue}
                  onChange={(e) => setForm({ ...form, amountDue: e.target.value })}
                />
                <input
                  style={inputStyle}
                  type="number"
                  placeholder="Amount Paid"
                  value={form.amountPaid}
                  onChange={(e) => setForm({ ...form, amountPaid: e.target.value })}
                />
                <input
                  style={inputStyle}
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                <select
                  style={inputStyle}
                  value={form.method}
                  onChange={(e) => setForm({ ...form, method: e.target.value })}
                >
                  <option value="EFT">EFT</option>
                  <option value="Card">Card</option>
                  <option value="Cash">Cash</option>
                </select>
                <textarea
                  style={{ ...inputStyle, minHeight: 80 }}
                  placeholder="Notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />

                {/* Calculated balance preview */}
                <div style={{ marginTop: -4, marginBottom: 6, fontSize: 13, opacity: 0.8 }}>
                  Balance preview:{" "}
                  {currency(Number(form.amountDue || 0) - Number(form.amountPaid || 0))}
                </div>

                <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end", gap: 10 }}>
                  <button style={cancelBtnStyle} onClick={() => { setShowModal(false); setEditing(null); }}>
                    Cancel
                  </button>
                  <button style={actionBtnStyle} onClick={saveForm}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ---- Styles (inline, matching your Courses page) ----------------------------
const thStyle = { padding: "10px", textAlign: "left", fontWeight: "bold" };
const tdStyle = { padding: "10px" };

const inputStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  minWidth: "150px",
  background: "#fff",
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
  ...actionBtnStyle,
  backgroundColor: "#16a34a",
};

const editBtnStyle = {
  padding: "6px 10px",
  marginRight: "6px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "#fff",
  cursor: "pointer",
};

const deleteBtnStyle = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#dc2626",
  color: "#fff",
  cursor: "pointer",
};

const cancelBtnStyle = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "gray",
  color: "#fff",
  cursor: "pointer",
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 50,
};

const modalContent = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  padding: "18px",
  width: 420,
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 14,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
};

const cardTitle = { fontSize: 12, opacity: 0.75, marginBottom: 6 };
const cardMetric = { fontSize: 20, fontWeight: 700 };

export default Finance;
