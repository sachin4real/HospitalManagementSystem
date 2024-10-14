import React from "react";
import DashboardHeader from "../DashboardHeader";
import SideBar from "../SideBar";
import AddDoctor from "./AddDoctor";
import AddStaff from "../AddStaff";
import AllStaff from "../AllStaff";

const StaffDashboard = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="main-container">
      <div className="nav-bar">
          <ul className="nav-list">
            <a href="/laboratory">
              <li className="nav-element">Laboratory</li>
            </a>
            <a href="/staff">
              <li className="nav-element active-element">Staff Management</li>
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

        <div className='content-container'>
         <AddStaff />

         <AllStaff />
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
