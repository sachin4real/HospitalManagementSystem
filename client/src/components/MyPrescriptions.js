import React, { useEffect, useState } from 'react'
import axios from "axios";
import RowPrescription from './RowPrescription';

const MyPrescriptions = () => {
    const [prescriptions ,setPrescriptions] = useState([]) ;
    const [email, setEmail] = useState("") ;
    const [password , setPassword] = useState("") ;
    const [pid ,setPid] = useState("") ;

    const [query, setQuery] = useState("");

    useEffect(()=>{
      // getUser() ;
      getPrescriptions() ;
    },[]) ;

    const getSearch = async () => {
      axios
          .get(
            `http://localhost:8070/prescription/patient/search/${pid}?query=${query}`
          )
          .then((res) => {
            console.log(res.data);
            setPrescriptions(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    };


    const getPrescriptions =  async() => {


    
      axios.get("http://localhost:8070/patient/check/" , 
      {headers: {
          Authorization: `${localStorage.getItem("token")}`,
        } }).then((res)=>{ 
          setEmail(res.data.patient.email) ;
          setPassword(res.data.patient.password) ;
          setPid(res.data.patient._id) ;
          console.log(res.data.patient._id)

          axios
          .get(
            `http://localhost:8070/prescription/patient/search/${res.data.patient._id}?query=${query}`
          )
          .then((res) => {
            console.log(res.data);
            setPrescriptions(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });

      }).catch( (err)=> {
          

          localStorage.removeItem("token") ;
          window.location.href = "/"
          
          
      }) 
  }
  return (
    <div>
      <div>
        <h1 className='header-topic'>My Prescriptions</h1>
      <input
        type="text"
        onKeyUp={getSearch}
        onKeyDown={getSearch}
        className="search-tests-input"
        placeholder="Search"
        onChange={(e)=>{
          setQuery(e.target.value)
        }}
      />
      </div>
      <table className="tests-table">
        <tr className='th-tests'>
          <th>Prescription Id</th>
          {/* <th>Patient</th> */}
          <th>Appintment Id</th>
          <th>Date</th>
          <th>Prescription</th>
          <th>Actions</th>
        </tr>
      
      {prescriptions.map((item,index)=>(

        <RowPrescription item={item} />
        
      ))}
      </table>
    </div>
  )
}

export default MyPrescriptions
