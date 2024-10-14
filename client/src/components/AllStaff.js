import React, { useEffect, useState } from "react";
import axios from "axios";
import StaffRow from "./StaffRow";

const AllStaff = () => {
  const [staffs, setStaffs] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    getStaffs();
  }, []);

  const getStaffs = async () => {
    axios
      .get(`http://localhost:8070/admin/`)
      .then((res) => {
        console.log(res.data);
        setStaffs(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const searchStaffs = async () => {
    axios
      .get(`http://localhost:8070/admin/search?query=${query}`)
      .then((res) => {
        console.log(res.data);
        setStaffs(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const downloadStaffDetails = async()=> {
    
  }

  return (
    <div>
      <input
        type="text"
        onKeyUp={searchStaffs}
        onKeyDown={searchStaffs}
        className="search-tests-input"
        placeholder="Search"
        onChange={(e)=>{
          setQuery(e.target.value)
        }}
      />
      <table className="tests-table">
        <tr className="th-tests">
          <th>Staff ID</th>
          <th>Staff Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Allocated Work</th>
          <th>Action</th>
        </tr>

        {staffs.map((item, index) => (
          <StaffRow item={item} />
         
        ))}
      </table>
    </div>
  );
};

export default AllStaff;
