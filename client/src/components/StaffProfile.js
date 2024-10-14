import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import axios from "axios";

const StaffProfile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [roleName, setRoleName] = useState("");
  const [allocatedWork, setAllocatedWork] = useState("");
  const [id, setId] = useState("");

  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios
      .get("http://localhost:8070/admin/check/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setEmail(res.data.admin.email);
        setPassword(res.data.admin.password);
        setConfirmPassword(res.data.admin.password);
        setAdmin(res.data.admin);
        setName(res.data.admin.name);
        setId(res.data.admin._id);
        setPhone(res.data.admin.phone);
        setRoleName(res.data.admin.roleName);
        setAllocatedWork(res.data.admin.allocatedWork);
        console.log(res.data.admin.email);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }

  const editStaff = async (e) => {
    e.preventDefault();
    const updateAdmin = {
      name,
      email,
      roleName,
      allocatedWork,
      phone,
      password,
    };

    if (password == confirmPassword) {
      axios
        .put(`http://localhost:8070/admin/updateStaff/${id}`, updateAdmin)
        .then((res) => {
          alert("Staff Updated");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Password does not match");
    }
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
              <li className="nav-element ">Staff Management</li>
            </a>
            <a href="/doctor">
              <li className="nav-element">Add Doctor</li>
            </a>
            <a href="/staffProfile">
              <li className="nav-element active-element">Profile</li>
            </a>
          </ul>
        </div>

        <div className="content-container">
          <div className="staff-profile-container">
            <h1>Edit Staff Profile</h1>
            <label htmlFor="">Name</label> <br />
            <input
              type="text"
              className="add-staff-inputs"
              defaultValue={admin.name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Email</label> <br />
            <input
              type="text"
              className="add-staff-inputs"
              defaultValue={admin.email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Phone</label> <br />
            <input
              type="number"
              className="add-staff-inputs"
              defaultValue={admin.phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Role </label> <br />
            <input
              type="text"
              className="add-staff-inputs"
              defaultValue={admin.roleName}
              onChange={(e) => {
                setRoleName(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Allocated Work</label> <br />
            <input
              type="text"
              className="add-staff-inputs"
              defaultValue={admin.allocatedWork}
              onChange={(e) => {
                setAllocatedWork(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Password</label> <br />
            <input
              type="password"
              className="add-staff-inputs"
              defaultValue={admin.password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Confirm Password</label> <br />
            <input
              type="password"
              className="add-staff-inputs"
              defaultValue={admin.password}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <button onClick={editStaff} className="update-staff-btn">Update and Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;
