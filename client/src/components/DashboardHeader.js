import React from "react";

const DashboardHeader = () => {
  function logout() {
    localStorage.removeItem("token");
    localStorage.setItem("previous", false);
    alert("You have logged out");
    window.location.href = "/";
  }
  return (
    <div className="header-dashboard">
      <div>
        <img className="logo-img" src="/images/Hospital logo B.png" alt="" />
      </div>
      <div>
        <h1>Helasuwa.lk</h1>
      </div>
      <div></div>
      <div className="header-icons">
        <div className="profile-container">
          <div></div>
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
