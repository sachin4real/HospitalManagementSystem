import React from "react";
import jsPDF from "jspdf";

const RowPrescription = ({ item }) => {
  const logo = new Image();
  logo.src = "/images/Hospital-logo-W.png";

  function downloadPrescription() {
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 5;

    const text = `\n\nDate :${new Date(item.date).toString()} \n\n ${
      item.text
    }`;
    const splitText = doc.splitTextToSize(
      text,
      doc.internal.pageSize.width - margin * 2
    );
    doc.text(splitText, 10, 60);

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    const canvas1 = document.createElement("canvas");
    canvas1.width = logo.width;
    canvas1.height = logo.height;
    const ctx1 = canvas1.getContext("2d");
    ctx1.drawImage(logo, 0, 0, logo.width, logo.height);
    const dataURL1 = canvas1.toDataURL("image/png");

    doc.addImage(
      dataURL1,
      "PNG",
      5,
      5,
      pdfWidth / 4,
      (pdfWidth / 4) * (logo.height / logo.width)
    );

    doc.text(
      "Helasuwa.lk  \nTel: 0771231231 \nAddress No: No:11,Kandy road,\n",
      pdfWidth / 4 + 15,
      20
    );
   
    doc.save(`${item._id}.pdf`);
    //------------------------------------
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
        <button className="download-btn-pres" onClick={downloadPrescription}>
          Download
        </button>
      </td>
    </tr>
  );
};

export default RowPrescription;
