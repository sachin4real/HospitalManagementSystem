import React, { useEffect, useState } from "react";
import axios from "axios";
import PatientHeader from "./PatientHeader";
import SideBar from "./SideBar";
import AllChannels from "./AllChannels";
import { useParams } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";

const SearchChannels = () => {
  let { date, doctor } = useParams();

  const [channels, setChannels] = useState([]);

  const [doctor1, setDoctor] = useState(doctor);
  const [date1, setDate] = useState(date);

  useEffect(() => {
    console.log(date1);
    console.log(doctor1);
    getSearchChannels();
  }, []);

  const getSearchChannels = async () => {
    console.log(date);
    date = new Date(date).toISOString().substring(0);

    console.log(date);

    axios
      .get(`http://localhost:8070/channel/search/${date}/${doctor}`)
      .then((res) => {
        console.log(res.data.channels);
        setChannels(res.data.channels);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <DashboardHeader />

      <div className="main-container">
        <div className="nav-bar">
          <ul className="nav-list">
            <a href="/patientHome ">
              <li className="nav-element active-element">Home</li>
            </a>
            <a href="/myAppointments">
              <li className="nav-element">My Appointments</li>
            </a>

            <a href="/patientProfile">
              <li className="nav-element">Profile</li>
            </a>
          </ul>
        </div>

        <div className="contetn-container">
          <div className="search-container">
            <input
              className="search-inputs"
              type="text"
              placeholder="Search Doctor"
              onChange={(e) => {
                setDoctor(e.target.value);
              }}
              required
            />
            <input
              className="search-inputs"
              type="date"
              placeholder="Channeling Date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
              required
            />

            <a href={"/searchChannels/" + date1 + "/" + doctor1}>
              <button className="search-btn" type="submit">
                Search
              </button>
            </a>

            <h4>
              Search Results for " {doctor} " and{" "}
              {new Date(date).toLocaleDateString()}
            </h4>
          </div>

          <AllChannels channels={channels} />
        </div>
      </div>
    </div>
  );
};

export default SearchChannels;
