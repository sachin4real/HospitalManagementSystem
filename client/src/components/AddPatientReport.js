import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";

const AddPatientReport = () => {
  let { tid, pid } = useParams();
  const [patient, setPatient] = useState([]);

  const [details, setDetails] = useState("");

  const [result, setResult] = useState(null);
  const [test, setTest] = useState("");

  useEffect(() => {
    getPatient();

    getLabTest()
  }, []);

  const getPatient = async () => {
    axios
      .get(`http://localhost:8070/patient/get/${pid}`)
      .then((res) => {
        console.log(res.data.patient);
        setPatient(res.data.patient);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getLabTest = async () => {
    axios
      .get(`http://localhost:8070/test/get/${tid}`)
      .then((res) => {
        console.log(res.data.test);
        setTest(res.data.test);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const createReport = async (e) => {
    e.preventDefault();
    const newReport = {
      tid,
      result,
      details,
      pid,
    };

    axios
      .post(`http://localhost:8070/report/add`, newReport)
      .then((res) => {
        alert("Report Created");
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
      </ul>
    </div>

        <div className="content-container">
          <div className="add-patient-report-container">
            <h1>Add a report</h1>

            <form action="" onSubmit={createReport}>
              {/* <select className='patient-report-inputs' name="" id="" onChange={(e)=>{
                    setPid(e.target.value)
                  }}>
                    <option value="">Select Patient</option>
                    {patients.map((item,index)=>(
                      <option value={item._id}>{item.firstName} {item.lastName} , ID: {item._id}</option>
                    ))}
                  </select> <br /> */}
              <input
                className="patient-report-inputs"
                type="text"
                placeholder="Lab Test"
                value={patient.firstName +" " + patient.lastName + "-" + patient._id}
                readOnly
              />
              <br />
              <h4>Test ID : {test._id}</h4>
              <h4>Test Date : {(new Date(test.date)).toLocaleString()}</h4>
              <h4>Test Type : {test.type}</h4>
              <h4>Test Status : {test.status}</h4>
              <br />
              <select
                className="patient-report-inputs"
                name=""
                id=""
                placeholder="Test Results"
                onChange={(e) => {
                  setResult(e.target.value);
                }}
              >
                <option value="">Test Result</option>
                <option value="true">Positive</option>
                <option value="false">Negative</option>
              </select>{" "}
              <br />
              <textarea
                className="patient-report-inputs"
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Test Details"
                onChange={(e) => {
                  setDetails(e.target.value);
                }}
              ></textarea>
              <button id="create-patient-report-btn" type="submit">
                Create Report
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatientReport;
