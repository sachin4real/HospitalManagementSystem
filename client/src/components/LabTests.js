import React, { useEffect, useState } from "react";
import axios from "axios";
import TestRow from "./TestRow";

const LabTests = () => {
  const [tests, setTests] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getTests();
  }, []);

  const getTests = async () => {
    axios
      .get(`http://localhost:8070/test/`)
      .then((res) => {
        console.log(res.data);
        setTests(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const searchTest = async (e) => {
    setQuery(e.target.value);
    console.log(e.target.value);

    axios
      .get(`http://localhost:8070/test/search?query=${query}`)
      .then((res) => {
        console.log(res.data);
        setTests(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <input
        type="text"
        onKeyUp={searchTest}
        onKeyDown={searchTest}
        className="search-tests-input"
        placeholder="Search"
        onChange={(e)=>{
          setQuery(e.target.value) 
        }}
      />
      <table className="tests-table">
        <tr className="th-tests">
          <th>Test ID</th>
          <th>Patient ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Date</th>
          <th>Type</th>
          <th>Status</th>
          <th>Report</th>
        </tr>

        {tests.map((item, index) => (
      
          <TestRow item={item} />
        ))}
      </table>
    </div>
  );
};

export default LabTests;
