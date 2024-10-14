import React, { useEffect, useState } from 'react'
import '../styles/dashboard.css'
import axios from "axios";
import SideBar from './SideBar';
import DashboardHeader from './DashboardHeader';
import SingleChannel from './SingleChannel';
import PatientHeader from './PatientHeader';
import AllChannels from './AllChannels';
import PatientSideBar from './PatientSideBar';

const PatientHome = () => {
    const dt = new Date().toISOString().split("T")[0]; 

    const [email, setEmail] = useState("") ;
    const [password , setPassword] = useState("") ;
    const [ channels, setChannels] = useState([]); 
    const [searched, setSearched] = useState(false) ;
    const [sChannels, setSChannels] = useState([]) ; 

    const [doctor , setDoctor] = useState("") ;
    const [date ,setDate] = useState(new Date()) ;
    const changes = 1 ;


    useEffect(()=>{
        const token = localStorage.getItem("token")
        // setToken(token)
        console.log(token) ;

        getUser()
        localStorage.setItem("previous" , true)
        if (token == null) {
            
            window.location.href = "/";
            
            
            
          } else {
            getUser() ;
            getChannels() ;
          }

    },[])
    
    const getChannels = async () => {
        
        axios
          .get(`http://localhost:8070/channel/`)
          .then((res) => {
            console.log(res.data);
            setChannels(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      
    function getUser() {


        
        axios.get("http://localhost:8070/patient/check/" , 
        {headers: {
            Authorization: `${localStorage.getItem("token")}`,
          } }).then((res)=>{ 
            setEmail(res.data.patient.email)
            setPassword(res.data.patient.password)
            console.log(res.data.patient.email)
        }).catch( (err)=> {
            

            localStorage.removeItem("token") ;
            window.location.href = "/"
            
            
        }) 
    }


    function logout() {
        localStorage.removeItem("token") ;
        localStorage.setItem("previous" , false)
        alert("You have logged out")
        window.location.href= "/" ;
    }
  return (
    <div>

    <DashboardHeader />

    <div className='main-container'>
    <div className='nav-bar'>
                <ul className='nav-list'>
                  <a href="/patientHome ">
                    <li className='nav-element active-element'>Home</li>
                  </a>
                  <a href="/myAppointments">
                    <li className='nav-element'>My Appointments</li>
                  </a>

                  <a href="/patientProfile">
                    <li className='nav-element'>Profile</li>
                  </a>
                  <a href="/records">
                    <li className='nav-element'>My Records</li>
                  </a>
                   

                </ul>
            </div>

      <div className='content-container'>
        
      <div className='search-container'>
            
              <input className='search-inputs' type="text" placeholder="Search Doctor" onChange={(e)=>{
                setDoctor(e.target.value);
              }} required/>
              <input className='search-inputs' type="date"  placeholder="Channeling Date" min={dt} onChange={(e)=>{
                setDate(new Date(e.target.value)) ;
              }} required/>

              <a href={"/searchChannels/"+date+"/"+doctor}>
              <button className='search-btn' type='submit'>Search</button>

              </a>
            
          </div>

        
      {/* {channels.map((item,index)=>(
              <div>
                  <SingleChannel channel={item}/>

              </div>
          ))} */}

          <AllChannels channels={channels} />

      </div>

    </div>

    
    </div>
  )
}

export default PatientHome