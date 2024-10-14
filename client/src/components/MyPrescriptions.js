import React, { useEffect, useState } from 'react'
import axios from "axios";
import RowPrescription from './RowPrescription';
import RowPrescriptionView from './RowPrescriptionView';
import PrescriptionDetails from './PrescriptionDetails';

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null); // State for selected prescription
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pid, setPid] = useState('');
  const [query, setQuery] = useState('');


   

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
      {selectedPrescription ? (
                <PrescriptionDetails 
                    prescription={selectedPrescription} 
                    onBack={() => setSelectedPrescription(null)} 
                />
            ) : (
                <table className="tests-table">
                    <thead>
                        <tr className="th-tests">
                            <th>Prescription Id</th>
                            <th>Appointment Id</th>
                            <th>Date</th>
                            <th>Prescription</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prescriptions.map((item) => (
                            <RowPrescriptionView 
                                key={item._id} 
                                item={item} 
                                onClick={() => setSelectedPrescription(item)} // Pass function to view prescription
                            />
                        ))}
                    </tbody>
                </table>
            )}

     <div>

     </div>
    </div>
  )
}

export default MyPrescriptions
