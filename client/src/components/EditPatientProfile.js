import PatientHeader from "./PatientHeader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";

const EditPatientProfile = () => {
  const [patient, setPatient] = useState([]);
  const [pid, setPid] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState("");

  const [civilStatus, setCivilStatus] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [gaurdianName, setGaurdianName] = useState("");
  const [gaurdianNIC, setGaurdianNIC] = useState("");
  const [gaurdianPhone, setGaurdianPhone] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [medicalStatus, setMedicalStatus] = useState("");
  const [allergies, setAllergies] = useState("");
  const [insuranceNo, setInsuranceNo] = useState("");
  const [insuranceCompany, setInsuranceCompany] = useState("");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

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

  function getUser() {
    axios
      .get("http://localhost:8070/patient/check/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPatient(res.data.patient);
        setPid(res.data.patient._id);
        setFirstName(res.data.patient.firstName);
        setLastName(res.data.patient.lastName);
        setEmail(res.data.patient.email);
        setGender(res.data.patient.gender);
        setDob(new Date(res.data.patient.dob));
        setPassword(res.data.patient.password);
        setConfirm(res.data.patient.password);
        setCivilStatus(res.data.patient.civilStatus);
        setPhone(res.data.patient.phoneNo);
        setEmergencyPhone(res.data.patient.emergencyPhone);
        setGaurdianNIC(res.data.patient.gaurdianNIC);
        setGaurdianName(res.data.patient.gaurdianName);
        setGaurdianPhone(res.data.patient.gaurdianPhone);
        setHeight(res.data.patient.height);
        setWeight(res.data.patient.weight);
        setBloodGroup(res.data.patient.bloodGroup);
        setMedicalStatus(res.data.patient.medicalStatus);
        setAllergies(res.data.patient.allergies);
        setInsuranceNo(res.data.patient.insuranceNo);
        setInsuranceCompany(res.data.patient.insuranceCompany);

        console.log(res.data.patient.height);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }

  function updatePatient(e) {
    e.preventDefault();

    const updatedPatient = {
      firstName,
      lastName,
      dob,
      email,
      gender,
      password,
      civilStatus,
      phone,
      emergencyPhone,
      gaurdianNIC,
      gaurdianName,
      gaurdianPhone,
      height,
      weight,
      bloodGroup,
      allergies,
      medicalStatus,
      insuranceNo,
      insuranceCompany,
    };

    if (validateEmail(email)) {
      if (validatePassword(password)) {
        if (validatePhone(phone)) {
          if (password == confirm) {
            axios
              .put(
                `http://localhost:8070/patient/update/${pid}`,
                updatedPatient
              )
              .then((res) => {
                alert("Patient profile updated!!");
                Window.location.reload();
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            alert("Password Do not Match");
          }
        } else {
          alert("Invalid Phone Number");
        }
      } else {
        alert(
          "Password must conatin 8 characters including 1 lower case letter , one upper case letter , one number and atleast one special character"
        );
      }
    } else {
      alert("Invalid Email");
    }
  }

  useEffect(() => {
    getUser();
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
              <li className="nav-element active-element">Profile</li>
            </a>
          </ul>
        </div>

        <div className="content-container">
          <br />
          <br />

          <form action="" onSubmit={updatePatient}>
            <label className="profile-labels" htmlFor="">
              First Name
            </label>{" "}
            <br />
            <input
              className="profile-inputs"
              type="text"
              id="firstName"
              defaultValue={patient.firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />{" "}
            <br />
            <br />
            <label className="profile-labels" htmlFor="">
              Last Name
            </label>
            <br />
            <input
              className="profile-inputs"
              type="text"
              id="lastName"
              defaultValue={patient.lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Date Of birth
            </label>
            <br />
            <input
              className="profile-inputs"
              type="date"
              id="dob"
              value={dob.toISOString().split("T")[0]}
              onChange={(e) => {
                setDob(new Date(e.target.value));
              }}
            />{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Email{" "}
            </label>
            <br />
            <input
              className="profile-inputs"
              type="email"
              id="email"
              defaultValue={patient.email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Gender
            </label>{" "}
            <br />
            <select
              className="profile-inputs"
              defaultValue={patient.gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Phone No
            </label>
            <br />
            <input
              className="profile-inputs"
              type="text"
              id="email"
              defaultValue={patient.phoneNo}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Civil Status
            </label>{" "}
            <br />
            <select
              className="profile-inputs"
              defaultValue={patient.gender}
              onChange={(e) => {
                setCivilStatus(e.target.value);
              }}
            >
              <option value="Married">Married</option>
              <option value="Single">Single</option>
              <option value="Other">Other</option>
            </select>{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Height{" "}
            </label>
            <br />
            <input
              className="profile-inputs"
              type="number"
              id="email"
              defaultValue={patient.height}
              onChange={(e) => {
                setHeight(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Weight{" "}
            </label>
            <br />
            <input
              className="profile-inputs"
              type="number"
              id="email"
              defaultValue={patient.weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Blood Group
            </label>{" "}
            <br />
            <select
              className="profile-inputs"
              defaultValue={patient.bloodGroup}
              onChange={(e) => {
                setBloodGroup(e.target.value);
              }}
            >
              <option value="A+">A positive</option>
              <option value="A-">A negative</option>
              <option value="B+">B positive</option>
              <option value="B-">B negative</option>
              <option value="O+">O positive</option>
              <option value="O-">O negative</option>
              <option value="AB+">AB positive</option>
              <option value="AB-">AB negative</option>
            </select>{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Medical Status{" "}
            </label>
            <br />
            <input
              className="profile-inputs"
              type="text"
              id="email"
              defaultValue={patient.medicalStatus}
              onChange={(e) => {
                setMedicalStatus(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Alergies
            </label>
            <br />
            <input
              className="profile-inputs"
              type="text"
              id="email"
              defaultValue={patient.allergies}
              onChange={(e) => {
                setAllergies(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Emergency Phone no{" "}
            </label>
            <br />
            <input
              className="profile-inputs"
              type="text"
              id="email"
              defaultValue={patient.emergencyPhone}
              onChange={(e) => {
                setEmergencyPhone(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Gaurdian Name
            </label>
            <br />
            <input
              className="profile-inputs"
              type="text"
              id="email"
              defaultValue={patient.gaurdianName}
              onChange={(e) => {
                setGaurdianName(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Gaurdian NIC
            </label>
            <br />
            <input
              className="profile-inputs"
              type="text"
              id="email"
              defaultValue={patient.gaurdianNIC}
              onChange={(e) => {
                setGaurdianNIC(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Gaurdian Name
            </label>
            <br />
            <input
              className="profile-inputs"
              type="text"
              id="email"
              defaultValue={patient.gaurdianPhone}
              onChange={(e) => {
                setGaurdianPhone(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Insurance No
            </label>
            <br />
            <input
              className="profile-inputs"
              type="text"
              id="email"
              defaultValue={patient.insuranceNo}
              onChange={(e) => {
                setInsuranceNo(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Gaurdian Name
            </label>
            <br />
            <input
              className="profile-inputs"
              type="text"
              id="email"
              defaultValue={patient.insuranceCompany}
              onChange={(e) => {
                setInsuranceCompany(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Password{" "}
            </label>
            <br />
            <input
              className="profile-inputs"
              type="password"
              id="email"
              defaultValue={patient.password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label className="profile-labels" htmlFor="">
              Confirm Password{" "}
            </label>
            <br />
            <input
              className="profile-inputs"
              type="password"
              id="email"
              defaultValue={patient.password}
              onChange={(e) => {
                setConfirm(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <button className="update-btn-profile">Update And Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPatientProfile;
