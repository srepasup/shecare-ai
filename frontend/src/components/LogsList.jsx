import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./LogsList.css";

const LogsList = () => {
  const { userId } = useParams(); // Get userId from the URL
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/logs", {
          params: { user_id: userId },
        });
        setLogs(response.data.logs);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.detail || "Error fetching logs.");
        setLoading(false);
      }
    };

    if (userId) {
      fetchLogs();
    }
  }, [userId]);

  if (loading) return <p>Loading logs...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="logs-container">
      <h2>User Logs</h2>
      {logs.length === 0 ? (
        <p>No logs found for this user.</p>
      ) : (
        <ul className="logs-list">
          {logs.map((log) => (
            <li key={log.id} className="log-item">
              <p><strong>Date:</strong> {log.date}</p>
              <p><strong>Symptoms:</strong> {log.symptoms || "None"}</p>
              <p><strong>Sleep Quality:</strong> {log.sleep_quality || "N/A"}</p>
              <p><strong>Cycle Length:</strong> {log.cycle_length || "N/A"} days</p>
              <p><strong>Period Length:</strong> {log.period_length || "N/A"} days</p>
              <p><strong>Blood Flow:</strong> {log.blood_flow || "N/A"}</p>
              <p><strong>Water Intake:</strong> {log.water_intake_ml || "N/A"} ml</p>
              <p><strong>PCOD:</strong> {log.has_pcod ? "Yes" : "No"}</p>
              <p><strong>PCOS:</strong> {log.has_pcos ? "Yes" : "No"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LogsList;