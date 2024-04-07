import React from "react";
import { Link } from "react-router-dom"; // Import Link component for routing


const Navbarafter = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navdiv">
          <a className="navbar-brand">
            <img
              src="https://cdn.glitch.global/07931069-62a9-4bd9-a047-47fd7905975d/Oxford-Brookes-blue.jpg?v=1709197319114"
              alt=""
              width="140"
              height="110"
            />
            <span className="logo">Attender Feedback System</span>
          </a>
          <ul className="nav">
            <li className="nav-item">
              <Link to="/home" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/question" className="nav-link">Questions</Link>
            </li>
            <li className="nav-item">
              <Link to="/Report" className="nav-link">Reports</Link>
            </li>
            <li className="nav-item">
              <Link to="/Chart" className="nav-link">Chart</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link">Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbarafter;
