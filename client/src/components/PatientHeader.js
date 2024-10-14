import React from "react";

const PatientHeader = () => {
  function logout() {
    localStorage.removeItem("token");
    localStorage.setItem("previous", false);
    alert("You have logged out");
    window.location.href = "/";
  }
  return (
    <div className="header-dashboard">
      <div>
        <h1>E Hospital</h1>
      </div>

      <div></div>


      <div className="header-icons">

        


        <div className="profile-container">
          

          
            <div className="profile-btn">
              
            </div>
          

          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;
