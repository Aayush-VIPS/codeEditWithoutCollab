// frontend/src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Create a CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Hackathon Workspace</h1>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/editor">Editor</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
