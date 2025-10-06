// src/components/Charts.js
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const AttendanceChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Attendance %",
        data: [92, 88, 95, 90, 94, 91],
        fill: false,
        backgroundColor: "#182b5c",
        borderColor: "#182b5c",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Attendance Trend" },
    },
  };

  return <Line data={data} options={options} />;
};

export const PerformanceChart = () => {
  const data = {
    labels: ["Math", "Science", "English", "History", "IT"],
    datasets: [
      {
        label: "Average Score %",
        data: [85, 92, 78, 88, 90],
        backgroundColor: "#1e3a8a",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Course Performance" },
    },
  };

  return <Bar data={data} options={options} />;
};
