import React, { useEffect, useState } from "react";
import axios from "axios";

const SingleChannel = ({ channel }) => {
  const did = channel.doctor ;
  const [count, setCount] = useState(0);
  const [doctor, setDoctor] = useState([]);
  

  useEffect(() => {
    getPatientNo();
   
  }, []);

  const getPatientNo = async () => {
    axios
      .get(`http://localhost:8070/channel/NoOfAppointments/${channel._id}`)
      .then((res) => {
        setCount(res.data.count);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  
  return (
    <div className="channel-container-doctor">
      <div>
        <h5>Doctor : {channel.drName}</h5>
        <h5>Specialized In : {channel.specialization}</h5>
        <h5>{new Date(channel.startDateTime).toString()}</h5>
        <h5>
          Available Spots : {parseInt(channel.maxPatients) - parseInt(count)}
        </h5>
      </div>

      <div>
        {channel.maxPatients == count ? (
          <a href={"/makeApt/" + channel._id}>
            <button id="make-apt-btn" disabled>
              Appointment Full
            </button>
          </a>
        ) : (
          <a href={"/makeApt/" + channel._id}>
            <button id="make-apt-btn">Make Appointment</button>
          </a>
        )}
      </div>
    </div>
  );
};

export default SingleChannel;
