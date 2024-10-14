import React, { useEffect, useState } from "react";
import PatientHeader from "./PatientHeader";
import axios from "axios";
import PatientAppointment from "./PatientAppointment";
import DashboardHeader from "./DashboardHeader";
const PatientAppointments = () => {
  const [user, setUser] = useState([]);
  const [apts, setApts] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios
      .get("http://localhost:8070/patient/check/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUser(res.data.patient);

        axios
          .get(
            `http://localhost:8070/appointment/patientAppointments/${res.data.patient._id}`
          )
          .then((res) => {
            console.log(res.data.data);
            setApts(res.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });

        console.log(res.data.patient.email);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }

  return (
    <div>
      <DashboardHeader />

      <div className="main-container">
        <div className="nav-bar">
          <ul className="nav-list">
            <a href="/patientHome ">
              <li className="nav-element">Home</li>
            </a>
            <a href="/myAppointments">
              <li className="nav-element active-element">My Appointments</li>
            </a>

            <a href="/patientProfile">
              <li className="nav-element">Profile</li>
            </a>

            <a href="/records">
              <li className="nav-element">My Records</li>
            </a>
          </ul>
        </div>

        <div className="content-container">
          <h1 className="heading-channels">My Appointments</h1>

          {apts.map((item, index) => (
            <PatientAppointment apt={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;
