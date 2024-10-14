
import DoctorSideBar from './DoctorSideBar'
import DashboardHeader from './DashboardHeader'
import React, { useEffect, useState } from "react";

import axios from "axios";

const AddChannel = () => {

    const [doctor, setDoctor] = useState([]);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
  
    const [maxPatients, setMaxPatients] = useState(0);
    const [startDateTime, setStartDateTime] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [specialization , setSpecialization] = useState("") ;

    useEffect(()=>{
        getUser() ;
    }, []) ;

    const createChannel = async (e) => {
        e.preventDefault();
    
        const drName = doctor.name;
    
        const newChannel = {
          doctor,
          drName,
          startDateTime,
          maxPatients,
          specialization
        };
    
        await axios
          .post("http://localhost:8070/channel/add/", newChannel)
          .then((res) => {
            alert("Channel created!!!");
            window.location.reload();
          })
          .catch((err) => {
            alert(err);
          });
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
            setSpecialization(res.data.doctor.specialization);
            setDoctor(res.data.doctor);
            setId(res.data.doctor._id);
            console.log(res.data.doctor._id);
          })
          .catch((err) => {
            localStorage.removeItem("token");
            window.location.href = "/";
          });
      };
  return (

    <div>
        <DashboardHeader />
        <div className='main-container'>

        <div className="nav-bar">
      <ul className="nav-list">
        <a href="/doctorDashboard">
          <li className="nav-element">Channeling Times</li>
        </a>
        <a href="/addChannel">
          <li className="nav-element active-element">Create Channel</li>
        </a>
        <a href="/doctorProfile">
          <li className="nav-element">Profile</li>
        </a>
      </ul>
    </div>

            <div className='content-container'>

                <h1 className='heading-channels'>Create Channeling Time</h1>

            <form action="" onSubmit={createChannel}>

                <div className='add-channel-form'>

            <input type="text" value={doctor.name} readOnly className='add-form-input' /> <br /> <br />
            <input
            className='add-form-input'
                type="number"
                placeholder="Maximun Patients"
                onChange={(e) => {
                setMaxPatients(e.target.value);
                }}
            />{" "}
            <br /> <br />
            <input
                className='add-form-input'
                type="datetime-local"
                name="endDate"
                id=""
                onChange={(e) => {
                setStartDateTime(e.target.value);
                }}
            />{" "}
            <br /> <br />
            <button id='add-channel-btn' type="submt">Create Channeling tiime</button>
                </div>
        </form>
            </div>
            
        </div>
    </div>
  )
}

export default AddChannel