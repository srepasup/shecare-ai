import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const userId = "e8c13545-7d34-4a2e-91cd-5d33b9240aa0";
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Daily Log Form</Link>
      <Link to={`/logs/${userId}`}>View Logs</Link>
    </nav>
  );
};

export default Navbar;