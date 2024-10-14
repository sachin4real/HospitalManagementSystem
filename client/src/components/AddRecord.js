import React, { useEffect, useState } from "react";
import axios from "axios";
import RowRecords from "./RowRecords";

const AddRecord = () => {
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [pid, setPid] = useState("");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getUser();
    getRecords();
  }, []);

  const getRecords = async () => {
    axios
      .get(`http://localhost:8070/record/`)
      .then((res) => {
        console.log(res.data);
        setRecords(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function getUser() {
    axios
      .get("http://localhost:8070/patient/check/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPid(res.data.patient._id);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }

  const addRecord = async (e) => {
    e.preventDefault();
    const newRecord = {
      title,
      reason,
      pid,
    };

    axios
      .post(`http://localhost:8070/record/add`, newRecord)
      .then((res) => {
        alert("Record Created");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="add-record-container">
      <h1>Create My Records</h1>
      <label htmlFor="">Record Title</label> <br />

      <form onSubmit={addRecord}>
      <input
        className="add-doctor-inputs"
        placeholder="Title"
        type="text"
        Title
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        required
      />{" "}
      <br /> <br />
      <label htmlFor="">Reason</label> <br />
      <input
        className="add-doctor-inputs"
        type="text"
        placeholder="Reason"
        onChange={(e) => {
          setReason(e.target.value);
        }}
        required
      />{" "}
      <br /> <br />

      <h4>
        This will create a record of my patient account upto today's date.
      </h4>{" "}
      <br />
      <button className="btn-makeApt" type="submit" >
        Get My Record
      </button>
      </form>
     
      <h1>My Records</h1>
      <table className="tests-table">
        <tr className="th-tests">
          <th>Record Id</th>
          <th>Patient Id</th>
          <th>Title</th>
          <th>Reason</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>

        {records.map((item, index) => (
          <RowRecords item={item} />
        ))}
      </table>
    </div>
  );
};

export default AddRecord;
