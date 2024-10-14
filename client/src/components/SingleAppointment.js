import React, { useEffect, useState } from "react";
import axios from "axios";
import SinglePrescription from "./SinglePrescription";
import jsPDF from "jspdf";

const SingleAppointment = ({ apt }) => {

  const logo = new Image();
  logo.src = "/images/Hospital-logo-W.png";


  const [patient, setPatient] = useState("");
  const [pid, setPid] = useState(apt.patient);
  const [beforAfter, setBeforeAfter] = useState("After");

  const [morning, setMorning] = useState(false);
  const [evening, setEvening] = useState(false);
  const [night, setNight] = useState(false);

  const [morningQ, setMorningQ] = useState(0);
  const [eveningQ, setEveningQ] = useState(0);
  const [nightQ, setNightQ] = useState(0);

  const [text, setText] = useState("");

  const [drug, setDrug] = useState("");

  const [prescriptions, setPrescriptions] = useState([]);

  const addToPres = async (e) => {
    e.preventDefault();

    setText(
      `${text}\n  ${drug} [ ${beforAfter} Meal ] :\n\t Morning - ${morningQ} \n\t Evening - ${eveningQ} \n\t Night - ${nightQ} \n`
    );

    alert("Prescription added!!!!!");
    console.log(text);
  };

  useEffect(() => {
    
    getPrescriptions();
    patientDetails();
  }, []);

  const patientDetails = async () => {
    axios
      .get(`http://localhost:8070/patient/get/${apt.patient}`)
      .then((res) => {
        setPatient(res.data.patient);
        console.log(res.data.patient);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  };

  const getPrescriptions = async (e) => {
    axios
      .get(
        `http://localhost:8070/prescription/appointmentPrescriptions/${apt._id}`
      )
      .then((res) => {
        console.log(res.data.data);
        setPrescriptions(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleBeforeAndAfter = async (e) => {
    setBeforeAfter(e.target.value);
  };

  const generatePres = async (e) => {
    e.preventDefault();

    const newPrescription = {
      text,
      apt,
      pid,
    };

    axios
      .post(`http://localhost:8070/prescription/add`, newPrescription)
      .then(() => {
        alert("Prescription added!!!");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const markConsulted = async () => {
    axios
      .put(`http://localhost:8070/appointment/markConsulted/${apt._id}`)
      .then((res) => {
        alert("Appointment Marked as consulted");
      })
      .catch((err) => {
        alert(err);
      });
  };

  function downloadProfile() {
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 5;

    const text = `\n\nPatient Report \n\n
      Name : ${patient.firstName}  ${patient.lastName} \n
      Date of Birth : ${new Date(patient.dob).toDateString()} \n
      Email : ${patient.email} \n
      Gender : ${patient.gender}\n
      Height : ${patient.height} \n
      Weight : ${patient.weight} \n
      Phone : ${patient.phoneNo}\n
      Blood Group : ${patient.bloodGroup}\n
      Civil Status : ${patient.civilStatus} \n
      Medical Status : ${patient.medicalStatus}\n
      Emergency Phone : ${patient.emergencyPhone}\n
      Gaurdian Name : ${patient.gaurdianName}\n
      Gaurdian NIC : ${patient.gaurdianNIC}\n
      Gaurdian Phone No : ${patient.gaurdianPhone}\n
      Insurance No : ${patient.insuranceNo} \n
      Insurnace Company : ${patient.insuranceCompany} \n
  
      `;
    const splitText = doc.splitTextToSize(
      text,
      doc.internal.pageSize.width - margin * 2
    );
    doc.text(splitText, 10, 60);

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    const canvas1 = document.createElement('canvas');
    canvas1.width = logo.width;
    canvas1.height = logo.height;
    const ctx1 = canvas1.getContext('2d');
    ctx1.drawImage(logo, 0, 0, logo.width, logo.height);
    const dataURL1 = canvas1.toDataURL('image/png');

    doc.addImage(dataURL1, 'PNG', 5 , 5 , (pdfWidth/4) , (pdfWidth/4) * (logo.height / logo.width));

    doc.text(
      "Helasuwa.lk \nTel: 0771231231 \nAddress No: No:11,Kandy road,\n",
      pdfWidth / 4 + 15,
      20
    );

    doc.save(`${patient._id}.pdf`);
  }

  return (
    <div className="apt-container">
      <div>
        <h3>Appointment ID: {apt._id}</h3>
        
        <h3>
          Patient Name : {patient.firstName} {patient.lastName}
        </h3>

        <h4>Notes : {apt.notes}</h4>
        <button className="view-patient-btn" onClick={downloadProfile}>
          View Patient Details
        </button>
        <h3>Appointment No : {apt.appointmentNo}</h3>
      </div>

      <div>
        <textarea
          className="pres-text"
          name=""
          id=""
          cols="30"
          rows="10"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
      </div>

      <div>
        <input
          className="pres-inputs"
          type="text"
          placeholder="Prescription Name"
          onChange={(e) => {
            setDrug(e.target.value);
          }}
        />
        <input
          className="before-after-radio"
          type="radio"
          name="befoAfter"
          value="Before"
          checked={beforAfter == "Before"}
          onChange={handleBeforeAndAfter}
        />
        <label htmlFor="">Before Meal</label>
        <input
          className="before-after-radio"
          type="radio"
          name="befoAfter"
          value="After"
          checked={beforAfter == "After"}
          onChange={handleBeforeAndAfter}
        />
        <label htmlFor="">After Meal</label> <br />
        <div className="pres-form">
          <div>
            <input
              type="checkbox"
              checked={morning}
              onChange={(e) => {
                if (morning) {
                  setMorning(false);
                } else {
                  setMorning(true);
                }
              }}
            />
            <label htmlFor="">Morning</label>
          </div>

          {morning == true ? (
            <input
              className="pres-inputs"
              type="number"
              placeholder="Quantity..."
              name="quantity"
              value={morningQ}
              onChange={(e) => {
                setMorningQ(e.target.value);
              }}
            />
          ) : (
            <input
              className="pres-inputs"
              type="number"
              placeholder="Quantity..."
              name="quantity"
              disabled
              value={morningQ}
              onChange={(e) => {
                setMorningQ(e.target.value);
              }}
            />
          )}
        </div>
        <div className="pres-form">
          <div>
            <input
              type="checkbox"
              checked={evening}
              onChange={(e) => {
                if (evening) {
                  setEvening(false);
                } else {
                  setEvening(true);
                }
              }}
            />
            <label htmlFor="">Evening</label>
          </div>
          {evening == true ? (
            <input
              className="pres-inputs"
              type="number"
              placeholder="Quantity..."
              name="quantity"
              value={eveningQ}
              onChange={(e) => {
                setEveningQ(e.target.value);
              }}
            />
          ) : (
            <input
              className="pres-inputs"
              type="number"
              placeholder="Quantity..."
              name="quantity"
              disabled
              value={eveningQ}
              onChange={(e) => {
                setEveningQ(e.target.value);
              }}
            />
          )}{" "}
        </div>
        <div className="pres-form">
          <div>
            <input
              type="checkbox"
              checked={night}
              onChange={(e) => {
                if (night) {
                  setNight(false);
                } else {
                  setNight(true);
                }
              }}
            />
            <label htmlFor="">Night</label>
          </div>

          {night == true ? (
            <input
              className="pres-inputs"
              type="number"
              placeholder="Quantity..."
              name="quantity"
              value={nightQ}
              onChange={(e) => {
                setNightQ(e.target.value);
              }}
            />
          ) : (
            <input
              className="pres-inputs"
              type="number"
              placeholder="Quantity..."
              name="quantity"
              disabled
              value={nightQ}
              onChange={(e) => {
                setNightQ(e.target.value);
              }}
            />
          )}
        </div>
      </div>

      <div>
        <button id="btn-generate-pres" onClick={generatePres}>
          Generate Prescription
        </button>
        <button id="btn-add-pres" onClick={addToPres}>
          Add To prescription
        </button>
      </div>

      <div>
        <h2>Prescriptions</h2>
        {prescriptions.map((item, index) => (
          <SinglePrescription prescription={item} />
        ))}
      </div>
      <div></div>

      {apt.consulted  ? (
        
            <button className="btn-mark-consulted">Consulted</button>
        
      ) : (
      
          <button className="btn-mark-consulted" onClick={markConsulted}>Mark as Consulted</button>
          
      )}
      
    </div>
  );
};

export default SingleAppointment;
