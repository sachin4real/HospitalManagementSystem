import React, { useEffect, useState } from 'react'
import axios from "axios";

const AddLabTest = () => {

    const [patients ,setPatients] = useState([]) ;
    const [pid , setPid] = useState("") ;
    const [name , setName] = useState("") ;
    const [age , setAge] = useState("")  ;
    const [type , setType] = useState("") ;

    useEffect(()=>{
        getPatients() ;

    }, []) ;

    const createLabTest = async (e) => {
        e.preventDefault() ;
        const newTest = {
          name,
          pid,
          age,
          type
        }
            
        axios
          .post(`http://localhost:8070/test/add` , newTest)
          .then((res) => {
            alert("Test Created")
          })
          .catch(function (error) {
            console.log(error);
          });
      };


    const getPatients = async () => {
        
        axios
          .get(`http://localhost:8070/patient/`)
          .then((res) => {
            console.log(res.data);
            setPatients(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
  return (
    <div className='add-lab-container' onSubmit={createLabTest}>

        <form action="">
        <h1>Add Lab Test</h1>
        <input className='add-lab-inputs' type="text" placeholder='Name' onChange={(e)=>{
            setName(e.target.value)
        }} /> <br />

        <select className='add-lab-inputs' name="" id="" onChange={(e)=>{
            setPid(e.target.value)
        }}>
            <option value="">Select Patient</option>
            {patients.map((item,index)=>(
                      <option value={item._id}>{item.firstName} {item.lastName} , ID: {item._id}</option>
                    ))}
        </select>       <br />


        <input className='add-lab-inputs' type="number" placeholder='Age' onChange={(e)=>{
            setAge(e.target.value)
        }} /> <br />

        <input className='add-lab-inputs' type="text" placeholder='Lab Test Type' onChange={(e)=>{
            setType(e.target.value)
        }} /> <br />

        <button type='submit' id='add-lab-button'>Add Lab Test</button>

        </form>

    </div>
  )
}

export default AddLabTest
