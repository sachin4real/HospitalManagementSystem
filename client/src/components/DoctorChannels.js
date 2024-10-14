import React, { useEffect, useState } from 'react'
import axios from "axios";

const DoctorChannels = (params) => {

    const [channels, setChannels] = useState([]) ;
    const id = localStorage.getItem("doctor") ;


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [doctor, setDoctor] = useState([]);
    const [name, setName] = useState("");
    // const [id, setId] = useState("");

    useEffect(()=>{
        // getUser() ;
        getChannels() ;
    },[]) ;

    // const getUser = async () => {
    //   await axios
    //     .get("http://localhost:8070/doctor/check/", {
    //       headers: {
    //         Authorization: `${localStorage.getItem("token")}`,
    //       },
    //     })
    //     .then((res) => {
    //       setEmail(res.data.doctor.email);
    //       setPassword(res.data.doctor.password);
    //       setName(res.data.doctor.name);
    //       setDoctor(res.data.doctor);
    //       setId(res.data.doctor._id);
    //       console.log(res.data.doctor._id);
    //     })
    //     .catch((err) => {
    //       localStorage.removeItem("token");
    //       window.location.href = "/";
    //     });
    // };

    const getChannels = async () => {
        
        axios
          .get(`http://localhost:8070/channel/doctorchannels/${id}`)
          .then((res) => {
            console.log(res.data);
            setChannels(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      function deleteChannel(id)  {
        console.log(id) ;
        // axios
        //   .delete(`http://localhost:8070/channel/delete/${id}`)
        //   .then((res) => {
        //     alert("Channel Deleted") ;
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
      };
  return (
    <div>
        
        <h1 className='heading-channels'>Channeling Times</h1>
        {channels.map((item,index)=>(
            <div className='channel-container-doctor'>

              <div>
                <h2>{item.drName}  </h2>
                <h3>Specialized In : {item.specialization}</h3>
                <h3>Date and Time :{new Date(item.startDateTime).toString()}</h3>
                <h4>Maximum Patients : {item.maxPatients} </h4>
                {/* <h4>Total Patients : {item.patients}</h4> */}

              </div>

              <div>
                <button id='btn-delete-channel' className='channel-buttons' onClick={()=>{
                    axios
          .delete(`http://localhost:8070/channel/delete/${item._id}`)
          .then((res) => {
            alert("Channel Deleted") ;
          })
          .catch(function (error) {
            console.log(error);
          });
                }}>Delete</button>  <br /> <br />
                <a href={"editChannel/"+ item._id}>
                <button id='btn-edit-channel' className='channel-buttons'>Edit</button>    <br /> <br />

                </a>

                <a href={"viewChannel/"+item._id}>
                  <button id='btn-view-channel' className='channel-buttons'>View</button>   <br /><br />

                </a>
              </div>

                
            </div>
        ))}
    </div>
    
  )
}

export default DoctorChannels