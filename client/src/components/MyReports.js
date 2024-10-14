import React, { useEffect, useState } from "react";
import axios from "axios";
import RowPrescription from "./RowPrescription";
import RowReports from "./RowReports";

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pid, setPid] = useState("");

  const [query, setQuery] = useState("");

  useEffect(() => {
    // getUser() ;
    getPrescriptions();
  }, []);

  const getSearch = async () => {
    axios
      .get(`http://localhost:8070/report/patient/search/${pid}?query=${query}`)
      .then((res) => {
        console.log(res.data);
        setReports(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPrescriptions = async () => {
    axios
      .get("http://localhost:8070/patient/check/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setEmail(res.data.patient.email);
        setPassword(res.data.patient.password);
        setPid(res.data.patient._id);
        console.log(res.data.patient._id);

        axios
          .get(
            `http://localhost:8070/report/patient/search/${res.data.patient._id}?query=${query}`
          )
          .then((res) => {
            console.log(res.data);
            setReports(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  };
  return (
    <div>
      <div>
        <h1 className="header-topic">My Reports</h1>
        <input
          type="text"
          onKeyUp={getSearch}
          onKeyDown={getSearch}
          className="search-tests-input"
          placeholder="Search"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <table className="tests-table">
        <tr className="th-tests">
          <th>Report Id</th>
          <th>Date</th>
          <th>Test Id</th>
          <th>Details</th>
          <th>Actions</th>
        </tr>

        {reports.map((item, index) => (
          <RowReports item={item} />
        ))}
      </table>
    </div>
  );
};

export default MyReports;
