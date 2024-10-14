import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import SideBar from "./SideBar";

const EditStaff = () => {
  let { sid } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [roleName, setRollName] = useState("");
  const [allocatedWork, setAllocatedWork] = useState("");

  const [staff, setStaff] = useState([]);

  useEffect(() => {
    getStaff();
  }, []);

  const editStaff = async (e) => {
    e.preventDefault();
    const updateAdmin = {
      name,
      email,
      roleName,
      allocatedWork,
      phone,
    };

    axios
      .put(`http://localhost:8070/admin/update/${sid}`, updateAdmin)
      .then((res) => {
        alert("Staff Updated");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getStaff = async () => {
    axios
      .get(`http://localhost:8070/admin/get/${sid}`)
      .then((res) => {
        console.log(res.data.staff);
        setStaff(res.data.staff);
        setEmail(res.data.staff.email);
        setName(res.data.staff.name);
        setPhone(res.data.staff.phone);
        setRollName(res.data.staff.roleName);
        setAllocatedWork(res.data.staff.allocatedWork);
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
              <li className="nav-element active-element">Staff Management</li>
            </a>
            <a href="/doctor">
              <li className="nav-element">Add Doctor</li>
            </a>
            <a href="/profile">
              <li className="nav-element">Staff Management</li>
            </a>
          </ul>
        </div>

        <div className="content-container">
          <div className="add-staff-container">
            <form action="" onSubmit={editStaff}>
              <h1>Edit Staff</h1>
              <input
                className="add-staff-inputs"
                type="text"
                placeholder="Name"
                defaultValue={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />{" "}
              <br />
              <input
                className="add-staff-inputs"
                type="email"
                placeholder="Email"
                defaultValue={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />{" "}
              <br />
              <input
                className="add-staff-inputs"
                type="Number"
                placeholder="Phone"
                defaultValue={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />{" "}
              <br />
              <input
                className="add-staff-inputs"
                type="text"
                placeholder="Staff Role"
                defaultValue={roleName}
                onChange={(e) => {
                  setRollName(e.target.value);
                }}
              />{" "}
              <br />
              <input
                className="add-staff-inputs"
                type="text"
                placeholder="Allocated Work"
                defaultValue={allocatedWork}
                onChange={(e) => {
                  setAllocatedWork(e.target.value);
                }}
              />{" "}
              <br />
              <button type="submit" id="add-staff-button">
                Update and Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStaff;
