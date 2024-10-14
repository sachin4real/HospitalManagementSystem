import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientAppointment = ({ apt }) => {
  const [cid, setCid] = useState(apt.channel);
  const [channel, setChannel] = useState([]);

  useEffect(() => {
    getChannel();
  }, []);

  const getChannel = async () => {
    axios
      .get(`http://localhost:8070/channel/get/${cid}`)
      .then((res) => {
        setChannel(res.data.Channel);

        console.log(res.data.Channel);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteApt = async () => {
    axios
      .delete(`http://localhost:8070/appointment/delete/${apt._id}`)
      .then((res) => {
        alert("Appointment Deleted");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="apt-container">
      <div>
        <h2>Doctor :{channel.drName}</h2>
        <h2>Date and Time : {new Date(channel.startDateTime).toString()}</h2>
        <h4>Appointment Id : {apt._id}</h4>
        <h3>Appointment No : {apt.appointmentNo}</h3>
        <h3>
          Name : {apt.name} | Age : {apt.age} | Gender : {apt.gender}
        </h3>
        <h3>Contact : {apt.contact}</h3>

        <h5>Arrival Time : {new Date(apt.arrivalTime).toLocaleString()}</h5>

        <h5>Notes : {apt.notes}</h5>
        {apt.consulted ? <h5>Consulted</h5> : <h5>No consulted yet</h5>}
      </div>

      <div>
        <button id="btn-delete-apt" onClick={deleteApt}>
          Delete
        </button>

        <a href={"/editApt/" + apt._id + "/" + apt.channel}>
          <button id="btn-edit-apt">Edit</button>
        </a>
      </div>
    </div>
  );
};

export default PatientAppointment;
