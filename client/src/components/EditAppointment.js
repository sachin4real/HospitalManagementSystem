import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PatientHeader from "./PatientHeader";
import DashboardHeader from "./DashboardHeader";

const EditAppointment = (props) => {
  let { aid, cid } = useParams();

  const [channel, setChannel] = useState([]);
  const [notes, setNotes] = useState("");
  const [appointment, setAppointment] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [contact, setContact] = useState(null);
  const [gender, setGender] = useState(null);

  useEffect(() => {
    getApt();
    getChannel();
  }, []);

  const getApt = async () => {
    await axios
      .get(`http://localhost:8070/appointment/get/${aid}`)
      .then((res) => {
        setAppointment(res.data.apt);
        setNotes(res.data.apt.notes);
        setName(res.data.apt.name) ;
        setAge(res.data.apt.age) ;
        setContact(res.data.apt.contact) ;
        setGender(res.data.apt.gender) ;

        console.log(res.data.apt.age);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getChannel = async () => {
    await axios
      .get(`http://localhost:8070/channel/get/${cid}`)
      .then((res) => {
        setChannel(res.data.Channel);

        console.log(res.data.Channel);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  function editApt(e) {
    e.preventDefault();

    const updatedApt = {
      notes,
    };
    axios
      .put(`http://localhost:8070/appointment/update/${aid}`, updatedApt)
      .then((res) => {
        alert("Appointment Udpated");
      })
      .catch((err) => {
        alert(err);
      });
  }

  function logout() {
    localStorage.removeItem("token");
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
            <a href="/patientHome ">
              <li className="nav-element active-element">Home</li>
            </a>
            <a href="/myAppointments">
              <li className="nav-element">My Appointments</li>
            </a>

            <a href="/patientProfile">
              <li className="nav-element">Profile</li>
            </a>
          </ul>
        </div>

        <div className="contetn-container">
          <h1 className="heading-channels">Edit Appointment</h1>

          <div className="channel-details-apt">
            <h4>Channeling Doctor - {channel.drName}</h4>
            <h4>
              Channeling Date and Time -{" "}
              {new Date(channel.startDateTime).toString()}
            </h4>
          </div>

          <form action="" onSubmit={editApt}>
            {/* <input
              className="apt-inputs"
              type="text"
              placeholder="Patient Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />{" "}
            <br /> <br /> */}

          <input
              className="apt-inputs"
              type="text"
              placeholder="Patient Name"
              defaultValue={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />{" "}
            <br /> <br />

            <input
              className="apt-inputs"
              type="Number"
              placeholder="Patient Age"
              defaultValue={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />{" "}
            <br /> <br />

            <input
              className="apt-inputs"
              type="tel"
              placeholder="Contact No"
              defaultValue={contact}
              onChange={(e) => {
                setContact(e.target.value);
              }}
            />{" "}
            <br /> <br />


            <select
              className="apt-inputs"
              defaultValue={gender}
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
              defaultValue={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            ></textarea>{" "}
            <br />
            <br />
            <button className="btn-makeApt" type="submit">
              Update and Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAppointment;
