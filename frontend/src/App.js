import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DailyLogForm from "./components/DailyLogForm";
import LogsList from "./components/LogsList";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Route for the Daily Log Form */}
          <Route path="/" element={<DailyLogForm />} />

          {/* Route for the Logs List */}
          <Route path="/logs" element={<LogsList userId="e8c13545-7d34-4a2e-91cd-5d33b9240aa0" />} />
          <Route path="/logs/:userId" element={<LogsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;