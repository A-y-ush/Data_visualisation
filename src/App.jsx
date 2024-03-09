import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Eligibility from "./views/Eligibility";
import Home from "./components/Home";
import BarChartHero from "./components/BarChart";
import ExcelUpload from "./views/marriage";
const App = () => {
  return (
    <div>
      <Navbar />

      <div className="  ">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/attestation" Component={BarChartHero} />
          <Route exact path="/eligibility" Component={Eligibility} />
          <Route exact path="/marriage" Component={ExcelUpload} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
