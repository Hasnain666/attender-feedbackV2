import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import "./App.css";
import Signup from "./Signup";
import { Navbarbefore } from "./Navbarbefore";
import { Signinbody } from "./Signinbody";
import Home from "./Home";
import Layout from "./Layout";
import Navbarafter from "./Navbarafter";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Routes>
            <Route path="/" element={<Navbarbefore />} />
            <Route path="/Signup" element={<Navbarbefore />} />
            <Route path="/home" element={<Navbarafter />} />
          </Routes>
        </header>
        <Routes>
          <Route path="/" element={<Signinbody />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
