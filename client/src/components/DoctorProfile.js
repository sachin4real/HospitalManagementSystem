import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";

const DoctorProfile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [doctor, setDoctor] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualifications, setQualifications] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const validatePassword = (tpassword) => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return pattern.test(tpassword);
  };

  const validatePhone = (phn) =>{
    const phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;
    return phoneNumberPattern.test(phn) ;

  }

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return emailRegex.test(email);
  };

  const updateDoctor = async () => {
    const updatedDoctor = {
      name,
      email,
      qualifications,
      specialization,
      password,
    };

    if (password == confirmPassword) {
      if (validatePassword(password)) {
        if (validateEmail(email)) {
          await axios
            .put(`http://localhost:8070/doctor/update/${id}`, updatedDoctor)
            .then((res) => {
              alert("Doctor Profile Updated");
            })
            .catch((err) => {
              alert(err);
            });
        } else {
          alert("Invalid Email");
        }
      } else {
        alert(
          "Password must conatin 8 characters including 1 lower case letter , one upper case letter , one number and atleast one special character"
        );
      }
    } else {
      alert("Passwords does not match!");
    }
  };

  const getUser = async () => {
    await axios
      .get("http://localhost:8070/doctor/check/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setEmail(res.data.doctor.email);
        setPassword(res.data.doctor.password);
        setName(res.data.doctor.name);
        setDoctor(res.data.doctor);
        setId(res.data.doctor._id);
        setConfirmPassword(res.data.doctor.password);
        setQualifications(res.data.doctor.qualifications);
        setSpecialization(res.data.doctor.specialization);
        console.log(res.data.doctor._id);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  };

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.setItem("previous", false);
    alert("You have logged out");
    window.location.href = "/";
  }
  return (
    <div>
      <DashboardHeader />

      <div className="main-container">
        <div className="nav-bar">
          <ul className="nav-list">
            <a href="/doctorDashboard">
              <li className="nav-element ">Channeling Times</li>
            </a>
            <a href="/addChannel">
              <li className="nav-element">Create Channel</li>
            </a>
            <a href="/">
              <li className="nav-element active-element">Profile</li>
            </a>
          </ul>
        </div>

        <div className="content-container">
          <div className="doctor-profile-container">
            <h2>Doctor Profile</h2>
            <label htmlFor="">Name</label> <br />
            <input
              type="text"
              className="add-doctor-inputs"
              defaultValue={doctor.name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Email</label> <br />
            <input
              type="email"
              className="add-doctor-inputs"
              defaultValue={doctor.email}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Password</label> <br />
            <input
              type="password"
              className="add-doctor-inputs"
              defaultValue={doctor.password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Confirm Password</label> <br />
            <input
              type="password"
              className="add-doctor-inputs"
              defaultValue={doctor.password}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Specialized In</label> <br />
            <input
              type="text"
              className="add-doctor-inputs"
              defaultValue={doctor.specialization}
              onChange={(e) => {
                setSpecialization(e.target.value);
              }}
            />{" "}
            <br />
            <br />
            <label htmlFor="">Qualifications</label> <br />
            <input
              type="text"
              className="add-doctor-inputs"
              defaultValue={doctor.qualifications}
              onChange={(e) => {
                setQualifications(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <button className="update-doctor-btn" onClick={updateDoctor}>
              Update and Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
