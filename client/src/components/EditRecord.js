import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";

const EditRecord = () => {
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [record, setRecord] = useState([]);

  useEffect(() => {
    getRecord();
  }, []);

  const getRecord = async () => {
    console.log(id);
    axios
      .get(`http://localhost:8070/record/get/${id}`)
      .then((res) => {
        console.log(res.data.record);
        setRecord(res.data.record);
        setTitle(res.data.record.title) ;
        setReason(res.data.record.reason) ;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateRecord = async (e) => {
    e.preventDefault();
    const updatedRecord = {
      title,
      reason
    };

    axios
      .put(`http://localhost:8070/record/update/${id}`, updatedRecord)
      .then((res) => {
        alert("Record Updated");
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
          <div className="add-record-container">
            <h1>Create My Records</h1>
            <label htmlFor="">Record Title</label> <br />
            <input
              className="add-doctor-inputs"
              placeholder="Title"
              type="text"
              Title
              defaultValue={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Reason</label> <br />
            <input
              className="add-doctor-inputs"
              type="text"
              placeholder="Reason"
              defaultValue={reason}
              onChange={(e) => {
                setReason(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <h4>
              This will create a record of my patient account upto today's date.
            </h4>{" "}
            <br />
            <button className="btn-makeApt" onClick={updateRecord}>Update and Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecord;
