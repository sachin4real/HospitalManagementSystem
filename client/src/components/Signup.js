import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [gaurdianName, setGaurdianName] = useState("");
  const [gaurdianNIC, setGaurdianNIC] = useState("");
  const [gaurdianPhone, setGaurdianPhone] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [medicalStatus, setMedicalStatus] = useState("");
  const [allergies, setAllergies] = useState("");
  const [insuranceNo, setInsuranceNo] = useState("");
  const [insuranceCompany, setInsuranceCompany] = useState("");

  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return emailRegex.test(email);
  };

  const validatePassword = (tpassword) => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return pattern.test(tpassword);
  };

  const validatePhone = (phn) => {
    const phoneNumberPattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneNumberPattern.test(phn);
  };

  function createPatient(e) {
    e.preventDefault();

    if (validateEmail(email)) {
      if (validatePassword(password)) {
        if (validatePhone(phone)) {
          if (cpassword == password) {
            if (validatePhone(emergencyPhone)) {
              const newPatient = {
                email,
                password,
                firstName,
                lastName,
                dob,
                gender,
                civilStatus,
                phone,
                emergencyPhone,
                gaurdianNIC,
                gaurdianName,
                gaurdianPhone,
                height,
                weight,
                bloodGroup,
                allergies,
                medicalStatus,
                insuranceNo,
                insuranceCompany,
              };

              axios
                .post("http://localhost:8070/patient/add/", newPatient)
                .then((res) => {
                  if (res.data == "exist") {
                    alert("Email already exist");
                  } else {
                    alert("Patient Created");
                    window.location.href = "/patientLogin";
                  }
                })
                .catch((err) => {
                  alert(err);
                });
            } else {
              alert("Invalid Emergency Phone No!");
            }
          } else {
            alert("Password doesnt match");
          }
        } else {
          alert("Invalid Phone Number");
        }
      } else {
        alert(
          "Password must conatin 8 characters including 1 lower case letter , one upper case letter , one number and atleast one special character"
        );
      }
    } else {
      alert("Invalid Email");
    }
  }

  return (
    <div id="login-whole">
      <center>
        <div id="patient-registration-container">
          <div id="login-form-container">
            <form action="" id="login-form" onSubmit={createPatient}>
              <div className="signup-heading">
                <img
                  className="signup-img"
                  src="/images/Hospital logo B.png"
                  alt=""
                />
                <h1 className="signupheading">Patient Registration</h1> <br />
              </div>
              <h4>Patient Details</h4> <br />
              <input
                id="cpasswordInput"
                className="input-fields"
                type="text"
                placeholder="First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
              />{" "}
              <br /> <br />
              <input
                id="cpasswordInput"
                className="input-fields"
                type="text"
                placeholder="Last Name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
              />{" "}
              <br /> <br />
              <input
                className="input-fields"
                type="email"
                name=""
                id="emailInput"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />{" "}
              <br /> <br />
              <input
                className="input-fields"
                type="number"
                name=""
                id="passwordInput"
                placeholder="Phone No"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                required
              />
              <br /> <br />
              <label htmlFor="">Date of Birth</label> <br />
              <br />
              <input
                id="cpasswordInput"
                className="input-fields"
                type="date"
                placeholder="Date Of Birth"
                onChange={(e) => {
                  setDob(e.target.value);
                }}
                required
              />
              <br /> <br />
              <select
                className="input-fields"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                required
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <br /> <br />
              <select
                className="input-fields"
                placeholder="Civil Status"
                onChange={(e) => {
                  setCivilStatus(e.target.value);
                }}
                required
              >
                <option value="">Civil Status</option>
                <option value="Married">Married</option>
                <option value="Single">Single</option>
                <option value="Other">Other</option>
              </select>
              <br /> <br />
              <input
                className="input-fields"
                type="number"
                name=""
                placeholder="Heigh In cm"
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
                required
              />
              <br /> <br />
              <input
                className="input-fields"
                type="number"
                name=""
                placeholder="Weigh In Kg"
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
                required
              />
              <br /> <br />
              <select
                className="input-fields"
                onChange={(e) => {
                  setBloodGroup(e.target.value);
                }}
                required
              >
                <option value="">Blood Group</option>
                <option value="A+">A positive</option>
                <option value="A-">A negative</option>
                <option value="B+">B positive</option>
                <option value="B-">B negative</option>
                <option value="O+">O positive</option>
                <option value="O-">O negative</option>
                <option value="AB+">AB positive</option>
                <option value="AB-">AB negative</option>
              </select>{" "}
              <br /> <br />
              <input
                className="input-fields"
                type="text"
                name=""
                placeholder="Medical Status Eg: Cancer Patient"
                onChange={(e) => {
                  setMedicalStatus(e.target.value);
                }}
                required
              />
              <br /> <br />
              <input
                className="input-fields"
                type="text"
                name=""
                placeholder="Allergies"
                onChange={(e) => {
                  setAllergies(e.target.value);
                }}
                required
              />
              <br /> <br />
              <input
                className="input-fields"
                type="number"
                name=""
                placeholder="Emergency Contact No"
                onChange={(e) => {
                  setEmergencyPhone(e.target.value);
                }}
                required
              />
              <br /> <br />
              <br /> <h4>Guardian Details</h4> <br />
              <input
                className="input-fields"
                type="text"
                name=""
                placeholder="Gaurdian Name"
                onChange={(e) => {
                  setGaurdianName(e.target.value);
                }}
              />
              <br /> <br />
              <input
                className="input-fields"
                type="number"
                name=""
                placeholder="Gaurdian Phone No"
                onChange={(e) => {
                  setGaurdianPhone(e.target.value);
                }}
              />
              <br /> <br />
              <input
                className="input-fields"
                type="text"
                name=""
                placeholder="Gaurdian NIC"
                onChange={(e) => {
                  setGaurdianNIC(e.target.value);
                }}
              />
              <br /> <br />
              <br /> <h4>Insurance Details(Optional)</h4> <br />
              <input
                className="input-fields"
                type="text"
                name=""
                placeholder="Insurance No"
                onChange={(e) => {
                  setInsuranceNo(e.target.value);
                }}
              />
              <br /> <br />
              <input
                className="input-fields"
                type="number"
                name=""
                placeholder="Insurance Company"
                onChange={(e) => {
                  setInsuranceCompany(e.target.value);
                }}
              />
              <br /> <br /> <br /> <br />
              <input
                className="input-fields"
                type="password"
                name=""
                id="passwordInput"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />{" "}
              <br /> <br />
              <input
                id="civil-status"
                className="input-fields"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setCpassword(e.target.value);
                }}
              />
              <br /> <br />
              <button type="submit" id="verify-button">
                Register
              </button>{" "}
              <br /> <br />
              <p>
                Already have an account? <a href="/PatientLogin">login</a>
              </p>
            </form>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Signup;
