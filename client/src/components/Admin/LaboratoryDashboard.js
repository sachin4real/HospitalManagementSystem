import React, { useEffect, useState } from "react";
import DashboardHeader from "../DashboardHeader";
import SideBar from "../SideBar";

import AddPatientReport from "../AddPatientReport";
import AddLabTest from "../AddLabTest";
import LabTests from "../LabTests";

const LaboratoryDashboard = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="main-container">
      <div className="nav-bar">
          <ul className="nav-list">
            <a href="/laboratory">
              <li className="nav-element active-element">Laboratory</li>
            </a>
            <a href="/staff">
              <li className="nav-element">Staff Management</li>
            </a>
            <a href="/doctor">
              <li className="nav-element">Add Doctor</li>
            </a>
            <a href="/staffProfile">
              <li className="nav-element">Profile</li>
            </a>
            <a href="/inventory">
              <li className="nav-element">Inventory</li>
            </a>
          </ul>
        </div>

        <div className="content-container">
          <AddLabTest />

          <LabTests />
        </div>
      </div>
    </div>
  );
};

export default LaboratoryDashboard;
