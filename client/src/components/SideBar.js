import React from "react";

const SideBar = () => {
  return (
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
  );
};

export default SideBar;
