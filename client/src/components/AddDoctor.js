import React, { useEffect, useState } from "react";
import axios from "axios";
import AllDoctors from "./AllDoctors";
import DashboardHeader from "./DashboardHeader";
import SideBar from "./SideBar";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualifications, setQualifications] = useState("");

  useEffect(() => {}, []);

  const addDoctor = async (e) => {
    e.preventDefault();
    const newDoctor = {
      name,
      email,
      password,
      specialization,
      qualifications,
    };

    axios
      .post(`http://localhost:8070/doctor/add`, newDoctor)
      .then((res) => {
        alert("Doctor Created");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
              <li className="nav-element">Staff Management</li>
            </a>
            <a href="/doctor">
              <li className="nav-element active-element">Add Doctor</li>
            </a>
            <a href="/staffProfile">
              <li className="nav-element">Profile</li>
            </a>
          </ul>
        </div>

        <div className="content">
          <div className="add-doctor-container" onSubmit={addDoctor}>
            <form action="">
              <h1>Add Doctor</h1>
              <input
                className="add-doctor-inputs"
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />{" "}
              <br />
              <input
                className="add-doctor-inputs"
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />{" "}
              <br />
              <input
                className="add-doctor-inputs"
                type="password"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />{" "}
              <br />
              <input
                className="add-doctor-inputs"
                type="text"
                placeholder="Specialization"
                onChange={(e) => {
                  setSpecialization(e.target.value);
                }}
              />{" "}
              <br />
              <input
                className="add-doctor-inputs"
                type="text"
                placeholder="qualifications"
                onChange={(e) => {
                  setQualifications(e.target.value);
                }}
              />{" "}
              <br />
              <button type="submit" id="add-doctor-button">
                Add Doctor
              </button>
            </form>
          </div>

          <AllDoctors />
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
