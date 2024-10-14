import React from "react";
import jsPDF from "jspdf";

const RowPrescription = ({ item }) => {
  const logo = new Image();
  logo.src = "/images/Hospital-logo-W.png";



  function viewSummery() {
    // Define the URL to which you want to navigate
    const url = `/PrescriptionSummary/${item._id}`; 
  
   
    // Navigate to the specified URL
    window.location.href = url;
  }

 
  return (
    <tr>
      <td>{item._id}</td>
      {/* <td>{item.patient}</td> */}
      <td>{item.appointment}</td>
      <td>{new Date(item.date).toLocaleString()}</td>
      <td>
        {item.text.length > 20 ? `${item.text.slice(0, 20)}...` : item.text}
      </td>
      <td>
       
        <button className="download-btn-pres" onClick={viewSummery}>
          View
        </button>
      </td>
    </tr>
  );
};

export default RowPrescription;
