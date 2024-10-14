import PatientHeader from "./PatientHeader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import DashboardHeader from "./DashboardHeader";

const PatientProfile = () => {

  const logo = new Image();
  logo.src = "/images/Hospital-logo-W.png";


  const [patient, setPatient] = useState([]);
  const [pid, setPid] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
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
        setDob(res.data.patient.dob);
        setPassword(res.data.patient.password);
        setConfirm(res.data.patient.password);
        console.log(res.data.patient.email);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }

  const deletePatient = async () => {
    axios
      .delete(`http://localhost:8070/patient/delete/${pid}`)
      .then(() => {
        alert("Patient Deleted");
      })
      .catch((err) => {
        alert(err);
      });
  };

  function downloadProfile() {
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 5;

    const text = `\n\nPatient Report \n\n
      Name : ${patient.firstName}  ${patient.lastName} \n
      Date of Birth : ${new Date(patient.dob).toDateString()} \n
      Email : ${patient.email} \n
      Gender : ${patient.gender}\n
      Height : ${patient.height} \n
      Weight : ${patient.weight} \n
      Phone : ${patient.phoneNo}\n
      Blood Group : ${patient.bloodGroup}\n
      Civil Status : ${patient.civilStatus} \n
      Medical Status : ${patient.medicalStatus}\n
      Emergency Phone : ${patient.emergencyPhone}\n
      Gaurdian Name : ${patient.gaurdianName}\n
      Gaurdian NIC : ${patient.gaurdianNIC}\n
      Gaurdian Phone No : ${patient.gaurdianPhone}\n
      Insurance No : ${patient.insuranceNo} \n
      Insurnace Company : ${patient.insuranceCompany} \n
  
      `;
    const splitText = doc.splitTextToSize(
      text,
      doc.internal.pageSize.width - margin * 2
    );
    doc.text(splitText, 10, 60);

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    const canvas1 = document.createElement("canvas");
    canvas1.width = logo.width;
    canvas1.height = logo.height;
    const ctx1 = canvas1.getContext("2d");
    ctx1.drawImage(logo, 0, 0, logo.width, logo.height);
    const dataURL1 = canvas1.toDataURL("image/png");

    doc.addImage(
      dataURL1,
      "PNG",
      5,
      5,
      pdfWidth / 4,
      (pdfWidth / 4) * (logo.height / logo.width)
    );

    doc.text(
      "Ceyloan Health \nTel: 0771231231 \nAddress No: No:11,Kandy road,Malabe",
      pdfWidth / 4 + 15,
      20
    );

    doc.save(`${patient._id}.pdf`);
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

            <a href="/records">
              <li className="nav-element">My Records</li>
            </a>
          </ul>
        </div>

        <div className="content-container">
          <button className="btn-profile-delete" onClick={deletePatient}>
            Delete Profile
          </button>
          <br /> <br />
          <div className="patientProfile">
            <h2>
              Patient Name : {patient.firstName} {patient.lastName}
            </h2>
            <div></div>
            <p>
              <b>Date of birth :</b> {new Date(patient.dob).toDateString()}
            </p>
            <p>
              <b>Email :</b> {patient.email}
            </p>
            <p>
              <b>Phone no :</b> {patient.phoneNo}
            </p>
            <p>
              <b>Gender :</b> {patient.gender}
            </p>
            <p>
              <b>Height :</b> {patient.height}cm
            </p>
            <p>
              <b>Weight :</b> {patient.weight}
            </p>
            <p>
              <b>Blood Gorup :</b> {patient.bloodGroup}
            </p>
            <p>
              <b>Medical Status :</b> {patient.medicalStatus}
            </p>
            <p>
              <b>Allergies :</b> {patient.allergies}
            </p>
            <p>
              <b>Emergency No :</b> {patient.emergencyPhone}
            </p>
            <h2>Gaurdian Details</h2> <div></div>
            <p>
              <b>Gaurdian Name :</b> {patient.gaurdianName}
            </p>
            <p>
              <b>Gaurdian Phone :</b> {patient.gaurdianPhone}
            </p>
            <p>
              <b>Gaurdian NIC :</b> {patient.gaurdianNIC}
            </p>
            <div></div>
            <h2>Insurance Details</h2> <div></div>
            <p>
              <b>Insurance No :</b> {patient.insuranceNo}
            </p>
            <p>
              <b>Insurance Company :</b> {patient.insuranceCompany}
            </p>
          </div>
          <br /> <br />
          <a href="/editPatientProfile">
            <button className="update-btn-profile">Edit</button>
          </a>
          <button className="download-profile-btn" onClick={downloadProfile}>
            {" "}
            Download Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
