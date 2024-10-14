import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import axios from "axios";
import SideBar from "./SideBar";
import DashboardHeader from "./DashboardHeader";
import SingleChannel from "./SingleChannel";
import PatientHeader from "./PatientHeader";
import AllChannels from "./AllChannels";
import PatientSideBar from "./PatientSideBar";
import MyPrescriptions from "./MyPrescriptions";
import MyReports from "./MyReports";
import AddRecord from "./AddRecord";

const MyRecords = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [channels, setChannels] = useState([]);
  const [searched, setSearched] = useState(false);
  const [sChannels, setSChannels] = useState([]);

  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState(new Date());
  const changes = 1;

  useEffect(() => {
    const token = localStorage.getItem("token");
    // setToken(token)
    console.log(token);

    localStorage.setItem("previous", true);
    if (token == null) {
      window.location.href = "/";
    } else {
    }
  }, []);

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
              <li className="nav-element">My Appointments</li>
            </a>

            <a href="/patientProfile">
              <li className="nav-element">Profile</li>
            </a>
            <a href="/records">
              <li className="nav-element active-element">My Records</li>
            </a>
          </ul>
        </div>

        <div className="content-container">
          <AddRecord />
          <MyPrescriptions />

          <MyReports />
        </div>
      </div>
    </div>
  );
};

export default MyRecords;
