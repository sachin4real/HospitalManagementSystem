import React from "react";

const DoctorSideBar = () => {
  return (
    <div className="nav-bar">
      <ul className="nav-list">
        <a href="/doctorDashboard">
          <li className="nav-element">Channeling Times</li>
        </a>
        <a href="/addChannel">
          <li className="nav-element">Create Channel</li>
        </a>
        <a href="">
          <li className="nav-element active-element">Profile</li>
        </a>
      </ul>
    </div>
  );
};

export default DoctorSideBar;
