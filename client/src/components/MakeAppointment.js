import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PatientHeader from "./PatientHeader";
import DashboardHeader from "./DashboardHeader";

const MakeAppointment = (props) => {
  let { cid } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [patient, setPatient] = useState("");

  const [channel, setChannel] = useState([]);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [contact, setContact] = useState(null);
  const [gender, setGender] = useState(null);

  const [doctor, setDoctor] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [maxPatients, setMaxPatients] = useState("");
  const [drName, setDrName] = useState("");
  const [completed, setCompleted] = useState("");
  const [patients, setPatients] = useState(0);

  useEffect(() => {
    getUser();
    getChannel();
  }, []);

  const getChannel = async () => {
    axios
      .get(`http://localhost:8070/channel/get/${cid}`)
      .then((res) => {
        setChannel(res.data.Channel);
        setDoctor(res.data.Channel.doctor);
        setStartDateTime(res.data.Channel.startDateTime);
        //   setMaxPatients(res.data.channel.maxPatients);
        setDrName(res.data.Channel.drName);
        setCompleted(res.data.Channel.completed);

        console.log(res.data.Channel);
      })
      .catch((err) => {
        alert(err.message);
      });
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
        setEmail(res.data.patient.email);
        setPassword(res.data.patient.password);
        setPatient(res.data.patient._id);

        console.log(res.data.patient.email);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }

  function makeApt(e) {
    e.preventDefault();

    if (age >= 0) {
      if (validatePhone(contact)) {
        const newApt = {
          channel,
          patient,
          notes,
          name,
          age,
          contact,
          gender,
        };
        axios
          .post("http://localhost:8070/appointment/makeapt", newApt)
          .then((res) => {
            alert("Appointment Made");
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        alert("Invalid phone Number");
      }
    } else {
      alert("Age should be 0 or greater than zero");
    }
  }
  return (
    <div>
      <DashboardHeader />

      <div className="main-container">
        <div className="nav-bar">
          <ul className="nav-list">
            <a href="/patientHome ">
              <li className="nav-element active-element">Home</li>
            </a>
            <a href="/myAppointments">
              <li className="nav-element">My Appointments</li>
            </a>

            <a href="/patientProfile">
              <li className="nav-element">Profile</li>
            </a>

            <a href="/records">
              <li className="nav-element">My Records</li>
            </a>
          </ul>
        </div>

        <div className="contetn-container">
          <h1 className="heading-channels">Make an Appointment</h1>

          <h4>Channeling Doctor - {channel.drName}</h4>
          <h4>
            Channeling Date and Time -{" "}
            {new Date(channel.startDateTime).toString()}
          </h4>

          <form action="" onSubmit={makeApt}>
            <input
              className="apt-inputs"
              type="text"
              placeholder="Patient Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <input
              className="apt-inputs"
              type="Number"
              placeholder="Patient Age"
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <input
              className="apt-inputs"
              type="Number"
              placeholder="Patient Contact No"
              onChange={(e) => {
                setContact(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <select
              className="apt-inputs"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <br /> <br />
            <textarea
              className="apt-inputs"
              placeholder="Any Special Notes"
              name=""
              id=""
              cols="30"
              rows="10"
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            ></textarea>{" "}
            <br />
            <br />
            <button className="btn-makeApt" type="submit">
              Make appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeAppointment;
