import React from "react";
import "./ChooseLogin.css"; // Import the CSS file for styling

const ChooseLogin = () => {
  const handleAdminButton = () => {
    window.location.href = "/adminLogin";
  };

  const handlePatientButton = () => {
    window.location.href = "/patientLogin";
  };

  const handleDoctorButton = () => {
    window.location.href = "/doctorLogin";
  };

  return (
    <div className="choose-login-container">
      <div className="login-content">
        <div className="login-buttons">
          <button className="login-button" onClick={handleAdminButton}>
            Admin
          </button>
          <button className="login-button" onClick={handlePatientButton}>
            Patient
          </button>
          <button className="login-button" onClick={handleDoctorButton}>
            Doctor
          </button>
        </div>
        <div className="login-image-container">
          <img
            className="login-image"
            src="images/Hospital-logo-W.png"
            alt="Hospital Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseLogin;
