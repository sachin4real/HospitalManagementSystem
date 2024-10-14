import React from "react";

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
    <div id="choose-login-container">
      <center id="center-choose">
        <button className="buttons" onClick={handleAdminButton}>
          Admin
        </button>{" "}
        <br /> <br />
        <button className="buttons" onClick={handlePatientButton}>
          Patient
        </button>{" "}
        <br /> <br />
        <button className="buttons" onClick={handleDoctorButton}>
          Doctor
        </button>{" "}
        <br /> <br />
      </center>

      <div>
        <img id="login-image" src="images/Hospital-logo-W.png" alt="" />
      </div>
    </div>
  );
};

export default ChooseLogin;
