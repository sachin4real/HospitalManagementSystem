import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signup from "./components/Signup";
import Dashboard from "./components/AdminDashboard";
import ChooseLogin from "./pages/Logins/ChooseLogin";
import PatientHome from "./components/PatientHome";
import AdminDashboard from "./components/AdminDashboard";
import PatientLogin from "./pages/Logins/PatientLogin";
import DoctorLogin from "./pages/Logins/DoctorLogin";
import AdminLogin from "./pages/Logins/AdminLogin";
import DoctorDashboard from "./components/DoctorDashboard";
import MakeAppointment from "./components/MakeAppointment";
import ViewChannel from "./components/ViewChannel";

import AddChannel from "./components/AddChannel";
import SearchChannels from "./components/SearchChannels";
import PatientAppointments from "./components/PatientAppointments";
import LaboratoryDashboard from "./components/Admin/LaboratoryDashboard";
import AddPatientReport from "./components/AddPatientReport";
import EditPatientProfile from "./components/EditPatientProfile";
import PatientProfile from "./components/PatientProfile";
import EditChannel from "./components/EditChannel";
import StaffDashboard from "./components/Admin/StaffDashboard";
import AddDoctor from "./components/Admin/AddDoctor";
import EditAppointment from "./components/EditAppointment";
import EditStaff from "./components/EditStaff";
import DoctorProfile from "./components/DoctorProfile";
import StaffProfile from "./components/Admin/StaffProfile";
import EditReport from "./components/EditReport";
import MyRecords from "./components/MyRecords";
import EditRecord from "./components/EditRecord";
import AddInventory from "./components/Admin/AddInventory";
import PrescriptionSummary from "./components/PrescriptionSummary";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/patientLogin" element={<PatientLogin />} />
          <Route path="/doctorLogin" element={<DoctorLogin />} />
          <Route path="/adminLogin" element={<AdminLogin />} />

          {/* Patient */}
          <Route path="/patientHome" element={<PatientHome />} /> 
          <Route path="/records" element={<MyRecords />} />
          <Route path="/editRecord/:id" element={<EditRecord />} />
          <Route path="/editPatientProfile" element={<EditPatientProfile />} />
          <Route path="/patientProfile" element={<PatientProfile />} />
          <Route path="/myAppointments" element={<PatientAppointments />} />
          <Route path="/editApt/:aid/:cid" element={<EditAppointment />} />
          <Route path="/makeApt/:cid" element={<MakeAppointment />} />
          <Route path="/PrescriptionSummary/:itemid" element={<PrescriptionSummary />} />


          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ChooseLogin />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/doctorDashboard" element={<DoctorDashboard />} />
          <Route path="/doctorProfile" element={<DoctorProfile />} />
          <Route path="/inventory" element={<AddInventory />} />
          

          <Route path="/viewChannel/:cid" element={<ViewChannel />} />
          <Route path="/addChannel" element={<AddChannel />} />
          <Route path="/editChannel/:cid" element={<EditChannel />} />
          <Route path="/searchChannels/:date?/:doctor?" element={<SearchChannels />} />

          <Route path="/laboratory" element={<LaboratoryDashboard />} />
          <Route path="/addReport/:tid/:pid" element={<AddPatientReport />} />
          <Route path="/editReport/:tid/:pid" element={<EditReport />} />

          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/doctor" element={<AddDoctor />} />
          <Route path="/editStaff/:sid" element={<EditStaff />} />
          <Route path="/staffProfile" element={<StaffProfile />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
