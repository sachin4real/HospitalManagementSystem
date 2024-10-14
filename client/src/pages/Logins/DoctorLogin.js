import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");

    if (token != null && type == "doctor") {
      window.location.href = "/doctorDashboard";
    }
  }, []);

  function login(e) {
    e.preventDefault();

    const doctor = {
      email,
      password,
    };

    axios
      .post("http://localhost:8070/doctor/login", doctor)
      .then((res) => {
        if (res.data.rst === "success") {
          //Session.set("name" , "thanish") ;
          //Session.set("user" , res.data.data._id) ;
          console.log(res.data.data._id);
          console.log(res.data.tok);
          localStorage.setItem("type", "doctor");
          localStorage.setItem("token", res.data.tok);
          localStorage.setItem("doctor", res.data.data._id);

          console.log(res.data.data._id);
          alert("login successfull");
          //console.log("successfull") ;

          window.location = "/doctorDashboard";
        } else if (res.data.rst === "incorrect password") {
          alert("incorrect password");
          console.log("unsuccessfull");
        } else if (res.data.rst === "invalid doctor") {
          alert("invalid user");
          console.log("unsuccessfull");
        }
        //console.log(res)
        //alert("heyyy")
        //window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div id="login-whole">
      <center>
        <div id="login-container">
          <div id="login-form-container">
            <form action="" id="login-form" onSubmit={login}>
              <h1>Doctor Login</h1> <br /> <br />
              <input
                className="input-fields"
                type="text"
                name=""
                id=""
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />{" "}
              <br /> <br />
              <input
                className="input-fields"
                type="password"
                name=""
                id=""
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />{" "}
              <br /> <br />
              <button id="login-button">Login</button> <br /> <br />
              <p>
                Don't have an account? <a href="/">Go Back</a>
              </p>
            </form>
          </div>
          <div id="login-message">
          <img  className='login-image' src="/images/Hospital logo B.png" alt="" />
          </div>
        </div>
      </center>
    </div>
  );
};

export default DoctorLogin;
