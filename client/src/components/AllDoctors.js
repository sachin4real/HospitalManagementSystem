import React, { useEffect, useState } from "react";
import axios from "axios";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors();
  }, []);
  const getDoctors = async () => {
    axios
      .get(`http://localhost:8070/doctor/`)
      .then((res) => {
        console.log(res.data);
        setDoctors(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <table className="tests-table">
        <tr className="th-tests">
          <th>Doctor ID</th>
          <th>Doctor Name</th>
          <th>Email</th>
          <th>Specialization</th>
          <th>Qualification</th>
          <th>Action</th>
         
        </tr>

        {doctors.map((item, index) => (
          <tr className="tr-tests">
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.specialization}</td>
            <td>{item.qualifications}</td>
            <td>
              <button className="delete-doctor-btn">Delete</button>
            </td>
            
          </tr>
        ))}
      </table>
    </div>
  );
};

export default AllDoctors;
