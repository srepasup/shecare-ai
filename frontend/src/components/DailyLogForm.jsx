import React, { useState } from "react";
import axios from "axios";
import "./DailyLogForm.css";

const DailyLogForm = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    date: "",
    symptoms: "",
    sleep_quality: "",
    cycle_length: "",
    period_length: "",
    blood_flow: "",
    water_intake_ml: "",
    has_pcod: false,
    has_pcos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/log-entry", formData);
      alert("Log submitted successfully!");
      setFormData({
        user_id: "",
        date: "",
        symptoms: "",
        sleep_quality: "",
        cycle_length: "",
        period_length: "",
        blood_flow: "",
        water_intake_ml: "",
        has_pcod: false,
        has_pcos: false,
      });
    } catch (err) {
      alert("Error submitting log.");
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Daily Health Log</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user_id"
          placeholder="Enter your User ID"
          value={formData.user_id}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <textarea
          name="symptoms"
          placeholder="Describe your symptoms (if any)"
          value={formData.symptoms}
          onChange={handleChange}
        ></textarea>

        <input
          type="number"
          name="sleep_quality"
          placeholder="Sleep Quality (1 to 10)"
          value={formData.sleep_quality}
          onChange={handleChange}
          min="1"
          max="10"
        />

        <input
          type="number"
          name="cycle_length"
          placeholder="Cycle Length (days)"
          value={formData.cycle_length}
          onChange={handleChange}
        />

        <input
          type="number"
          name="period_length"
          placeholder="Period Length (days)"
          value={formData.period_length}
          onChange={handleChange}
        />

        <select
          name="blood_flow"
          value={formData.blood_flow}
          onChange={handleChange}
        >
          <option value="">Select Blood Flow</option>
          <option value="light">Light</option>
          <option value="medium">Medium</option>
          <option value="heavy">Heavy</option>
        </select>

        <input
          type="number"
          name="water_intake_ml"
          placeholder="Water Intake (ml)"
          value={formData.water_intake_ml}
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="has_pcod"
            checked={formData.has_pcod}
            onChange={handleChange}
          />
          Do you have PCOD?
        </label>

        <label>
          <input
            type="checkbox"
            name="has_pcos"
            checked={formData.has_pcos}
            onChange={handleChange}
          />
          Do you have PCOS?
        </label>

        <button type="submit">Submit Log</button>
      </form>
    </div>
  );
};

export default DailyLogForm;
