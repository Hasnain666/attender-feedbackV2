import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Signup from "./Signup";
import { Navbarbefore } from "./Navbarbefore";
import { Signinbody } from "./Signinbody";
import Home from "./Home";
import Layout from "./Layout";
import Navbarafter from "./Navbarafter";


import OrgEvents from "./comps/OrgEvents";
import ListNominationComponent from './comps/listNominations';
import Question from './comps/addquest'; // Import the Question component

function App() {
  return (
    <Router>
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
          <Route path="/home" element={<OrgEvents />} />
          <Route path="/home/home" element={<Home />} />
          <Route path="/nominate" element={<ListNominationComponent />} />
          <Route path="/addquest" element={<Question />} /> {/* Add route for "/addquest" */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
