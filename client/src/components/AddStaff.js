import React, { useState } from "react";
import axios from "axios";

const AddStaff = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [roleName, setRollName] = useState("");
  const [allocatedWork, setAllocatedWork] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return emailRegex.test(email);
  };

  const validatePassword = (tpassword) => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return pattern.test(tpassword);
  };

  const validatePhone = (phn) => {
    const phoneNumberPattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneNumberPattern.test(phn);
  };

  const addStaff = async (e) => {
    e.preventDefault();

    if (validateEmail(email)) {
      if (validatePhone(phone)) {
        if (validatePassword(password)) {
          const newAdmin = {
            name,
            email,
            password,
            roleName,
            allocatedWork,
            phone,
          };

          axios
            .post(`http://localhost:8070/admin/add`, newAdmin)
            .then((res) => {
              alert("Staff Created");
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          alert(
            "Password must conatin 8 characters including 1 lower case letter , one upper case letter , one number and atleast one special character"
          );
        }
      } else {
        alert("Invalid Phone");
      }
    } else {
      alert("Invalid Email");
    }
  };

  return (
    <div className="add-staff-container">
      <form action="" onSubmit={addStaff}>
        <h1>Add Staff</h1>
        <input
          className="add-staff-inputs"
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />{" "}
        <br />
        <input
          className="add-staff-inputs"
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />{" "}
        <br />
        <input
          className="add-staff-inputs"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />{" "}
        <br />
        <input
          className="add-staff-inputs"
          type="Number"
          placeholder="Phone"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />{" "}
        <br />
        <input
          className="add-staff-inputs"
          type="text"
          placeholder="Staff Role"
          onChange={(e) => {
            setRollName(e.target.value);
          }}
        />{" "}
        <br />
        <input
          className="add-staff-inputs"
          type="text"
          placeholder="Allocated Work"
          onChange={(e) => {
            setAllocatedWork(e.target.value);
          }}
        />{" "}
        <br />
        <button type="submit" id="add-staff-button">
          Add Staff
        </button>
      </form>
    </div>
  );
};

export default AddStaff;
