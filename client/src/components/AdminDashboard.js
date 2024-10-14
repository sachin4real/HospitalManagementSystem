import React, { useEffect, useState } from 'react'
import '../styles/dashboard.css'
import axios from "axios";
import SideBar from './SideBar';
import DashboardHeader from './DashboardHeader';

// import { Jwt } from 'jsonwebtoken';
const secretKey = 'hey';
// import { Jwt } from 'jsonwebtoken';

const AdminDashboard = () => {

    // const [token ,setToken] = useState("") ;
    const [email, setEmail] = useState("") ;
    const [password , setPassword] = useState("") ;
    useEffect(()=>{
        const token = localStorage.getItem("token")
        // setToken(token)
        console.log(token) ;

        getUser()
        localStorage.setItem("previous" , true) ;
        if (token == null) {
            
            // window.location.href = "/";
            getUser()
            
            
            
          } else {
            getUser()
          }

    },[])


    function getUser() {


         
        axios.get("http://localhost:8070/admin/check/" , 
        {headers: {
            Authorization: `${localStorage.getItem("token")}`,
          } }).then((res)=>{ 
            setEmail(res.data.admin.email)
            setPassword(res.data.admin.password)
            console.log(res.data.admin.email)
        }).catch( (err)=> {
            

            localStorage.removeItem("token") ;
            window.location.href = "/"
            
            
        }) 
    }

    
  return (
    <div>
        <DashboardHeader />


        <div className='main-container'>
            <SideBar />

            <div className='content'>
                <h3>Email : {email}</h3>
                <h5>Password : {password}</h5>
            </div>

        </div>
    </div>
  )
}

export default AdminDashboard