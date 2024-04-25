import React from "react";
import {useState } from "react";
import { auth } from "./firebase_config";
import {getUserData} from "./comps/globalFunctions";
import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import "./Navbarbefore.css";


const Navbarafter = () => {
  async function handleLogout() {
    await auth.signOut();
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    console.log("Signout Successful!");
    window.location.replace("/");

  }


  return (
    <div>
      <nav className="navbar">
        <div className="navdiv">
        <div class= "logo-nav">
          <a className="navbar-brand">
            <img
              src="https://cdn.glitch.global/07931069-62a9-4bd9-a047-47fd7905975d/Oxford-Brookes-blue.jpg?v=1709197319114"
              alt=""
              width="140"
              height="110"
            />
            <span className="logo">Attender Feedback System</span>
          </a>
          </div>
          <input type="checkbox" id="check"/>
           <div className="side-bar" id="side-bar">
           <ul className="nav_1">
            <li className="nav-item1">
              <a className="nav-link1">Home</a>
            </li>
            <li className="nav-item1">
              <a className="nav-link1">Log Out</a>
            <li className="nav-item1">
              <Link to="/question" className="nav-link1">Questions</Link>
            </li>
            <li className="nav-item1">
              <Link to="/Report" className="nav-link1">Reports</Link>
            </li>
            <li className="nav-item1">
              <Link to="/Chart" className="nav-link1">Chart</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={()=>handleLogout()}>Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbarafter;
