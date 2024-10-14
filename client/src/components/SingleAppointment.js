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
  const [price, setPrice] = useState(0); // New state for price
  const [inventory, setInventory] = useState([]); // New state for inventory
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/inventory")
      .then((response) => {
        setInventory(response.data); // Assuming response.data contains the inventory items
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      });

    getPrescriptions();
    patientDetails();
  }, []);

  const addToPres = async (e) => {
    e.preventDefault();
    setText(
      `${text}\n  ${drug} [ ${beforAfter} Meal ] (Price: $${price}) :\n\t Morning - ${morningQ} \n\t Evening - ${eveningQ} \n\t Night - ${nightQ} \n`
    );
    alert("Prescription added!");
  };

  const patientDetails = async () => {
    axios
      .get(`http://localhost:8070/patient/get/${apt.patient}`)
      .then((res) => {
        setPatient(res.data.patient);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  };

  const getPrescriptions = async () => {
    axios
      .get(`http://localhost:8070/prescription/appointmentPrescriptions/${apt._id}`)
      .then((res) => {
        setPrescriptions(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBeforeAndAfter = (e) => {
    setBeforeAfter(e.target.value);
  };

  const generatePres = (e) => {
    e.preventDefault();

    const newPrescription = {
      text,
      apt,
      pid,
    };

    axios
      .post("http://localhost:8070/prescription/add", newPrescription)
      .then(() => {
        alert("Prescription added!");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const markConsulted = () => {
    axios
      .put(`http://localhost:8070/appointment/markConsulted/${apt._id}`)
      .then(() => {
        alert("Appointment marked as consulted");
      })
      .catch((err) => {
        alert(err);
      });
  };

  function downloadProfile() {
    const doc = new jsPDF();
    const margin = 10;

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
      Guardian Name : ${patient.guardianName}\n
      Guardian NIC : ${patient.guardianNIC}\n
      Guardian Phone No : ${patient.guardianPhone}\n
      Insurance No : ${patient.insuranceNo} \n
      Insurance Company : ${patient.insuranceCompany} \n`;

    const splitText = doc.splitTextToSize(text, doc.internal.pageSize.width - margin * 2);
    doc.text(splitText, 10, 60);

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    const canvas1 = document.createElement("canvas");
    canvas1.width = logo.width;
    canvas1.height = logo.height;
    const ctx1 = canvas1.getContext("2d");
    ctx1.drawImage(logo, 0, 0, logo.width, logo.height);
    const dataURL1 = canvas1.toDataURL("image/png");

    doc.addImage(dataURL1, "PNG", 5, 5, pdfWidth / 4, (pdfWidth / 4) * (logo.height / logo.width));
    doc.text("Helasuwa.lk \nTel: 0771231231 \nAddress: No:11, Kandy road", pdfWidth / 4 + 15, 20);

    doc.save(`${patient._id}.pdf`);
  }

  // Handle selecting a drug and setting its price
  const handleDrugChange = (e) => {
    const selectedDrug = e.target.value;
    setDrug(selectedDrug);

    // Find the selected item in the inventory and update price
    const selectedItem = inventory.find((item) => item.item_name === selectedDrug);
    setPrice(selectedItem ? selectedItem.price : 0); // Set price or 0 if not found
  };

  return (
    <div className="apt-container">
      <div>
        <h3>Appointment ID: {apt._id}</h3>
        <h3>Patient Name : {patient.firstName} {patient.lastName}</h3>
        <h4>Notes : {apt.notes}</h4>
        <button className="view-patient-btn" onClick={downloadProfile}>View Patient Details</button>
        <h3>Appointment No : {apt.appointmentNo}</h3>
      </div>

      <div>
        <textarea
          className="pres-text"
          cols="30"
          rows="10"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>

      <div>
        <select
          className="pres-inputs"
          placeholder="Medicine Name"
          value={drug}
          onChange={handleDrugChange}
        >
          <option value="" disabled>Select Medicine</option>
          {inventory.map((item) => (
            <option key={item.item_id} value={item.item_name}>{item.item_name}</option>
          ))}
        </select>

        {/* New input field for displaying the price */}
        <input
          type="text"
          className="pres-inputs"
          placeholder="Price"
          value={price > 0 ? `$${price}` : ""}
          readOnly
        />

        <input
          className="before-after-radio"
          type="radio"
          name="befoAfter"
          value="Before"
          checked={beforAfter === "Before"}
          onChange={handleBeforeAndAfter}
        />
        <label>Before Meal</label>
        <input
          className="before-after-radio"
          type="radio"
          name="befoAfter"
          value="After"
          checked={beforAfter === "After"}
          onChange={handleBeforeAndAfter}
        />
        <label>After Meal</label> <br />

        <div className="pres-form">
          <input
            type="checkbox"
            checked={morning}
            onChange={() => setMorning(!morning)}
          />
          <label>Morning</label>
          <input
            className="pres-inputs"
            type="number"
            placeholder="Quantity..."
            value={morning ? morningQ : 0}
            disabled={!morning}
            onChange={(e) => setMorningQ(e.target.value)}
          />
        </div>

        <div className="pres-form">
          <input
            type="checkbox"
            checked={evening}
            onChange={() => setEvening(!evening)}
          />
          <label>Evening</label>
          <input
            className="pres-inputs"
            type="number"
            placeholder="Quantity..."
            value={evening ? eveningQ : 0}
            disabled={!evening}
            onChange={(e) => setEveningQ(e.target.value)}
          />
        </div>

        <div className="pres-form">
          <input
            type="checkbox"
            checked={night}
            onChange={() => setNight(!night)}
          />
          <label>Night</label>
          <input
            className="pres-inputs"
            type="number"
            placeholder="Quantity..."
            value={night ? nightQ : 0}
            disabled={!night}
            onChange={(e) => setNightQ(e.target.value)}
          />
        </div>

        <button id="btn-generate-pres" onClick={generatePres}>Generate Prescription</button>
        <button id="btn-add-pres" onClick={addToPres}>Add To prescription</button>
      </div>

      <div>
        <h2>Prescriptions</h2>
        {prescriptions.map((item) => (
          <SinglePrescription key={item._id} prescription={item} />
        ))}
      </div>

      <div>
        {apt.consulted ? (
          <button className="btn-mark-consulted">Consulted</button>
        ) : (
          <button className="btn-mark-consulted" onClick={markConsulted}>Mark as Consulted</button>
        )}
      </div>
    </div>
  );
};

export default SingleAppointment;
