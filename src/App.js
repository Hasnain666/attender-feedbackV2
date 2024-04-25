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
import OrgEvents from "./comps/OrgEvents";
import ListNominationComponent from './comps/listNominations';
import Question from "./pages/question";
import Report from "./Reports/Report";
import Chart  from "./Reports/charts"
import ChartComponent from "./Reports/charts";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Routes>
            <Route path="/" element={<Navbarbefore />} />
            <Route path="/Signup" element={<Navbarbefore />} />
            <Route path="/home" element={<Navbarafter />} />
            <Route path="/question" element={<Navbarafter />} />
            <Route path="/Report" element={<Navbarafter />} />
            <Route path="/Chart" element={<Navbarafter />} />
          </Routes>
        </header>
        <Routes>
          <Route path="/" element={<Signinbody />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/home" element={<OrgEvents />} />
          <Route path="/nominate" element={<ListNominationComponent />} />
          <Route path="/question" element={<Question />} />
          <Route path="/report" element={<Report />} />
          <Route path="/chart" element={<ChartComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
