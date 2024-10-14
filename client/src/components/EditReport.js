import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";

const EditReport = () => {
  let { tid, pid } = useParams();
  const [patient, setPatient] = useState([]);

  const [details, setDetails] = useState("");

  const [result, setResult] = useState(null);
  const [test, setTest] = useState("");
  const [report, setReport] = useState([]);
  const [id ,setId] = useState("") ;
  //   const [pid ,setPid] = useState("") ;

  useEffect(() => {
    getLabTest();
    getPatient();
    getReport();
  }, []);

  const getReport = async () => {
    axios
      .get(`http://localhost:8070/report/getByTest/${tid}`)
      .then((res) => {
        console.log(res.data.report);
        setReport(res.data.report);
        setResult(res.data.report.result);
        setDetails(res.data.report.details);
        setId(res.data.report._id) ;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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

  const updateReport = async (e) => {
    e.preventDefault();
    const updatedReport = {
      tid,
      result,
      details,
      pid,
    };

    axios
      .put(`http://localhost:8070/report/update/${id}`, updatedReport)
      .then((res) => {
        alert("Report Updated");
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
            <h1>Edit report</h1>

            <form action="" onSubmit={updateReport}>
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
                value={
                  patient.firstName + " " + patient.lastName + "-" + patient._id
                }
                readOnly
              />
              <br />
              <h4>Test ID : {test._id}</h4>
              <h4>Test Date : {new Date(test.date).toLocaleString()}</h4>
              <h4>Test Type : {test.type}</h4>
              <h4>Test Status : {test.status}</h4>
              <br />
              <select
                className="patient-report-inputs"
                name=""
                id=""
                placeholder="Test Results"
                value={result}
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
                defaultValue={details}
                placeholder="Test Details"
                onChange={(e) => {
                  setDetails(e.target.value);
                }}
              ></textarea>
              <button id="create-patient-report-btn" type="submit">
                Update And Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReport;
