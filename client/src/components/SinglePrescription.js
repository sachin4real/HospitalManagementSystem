import React from "react";

import axios from "axios";
import jsPDF from "jspdf";

const SinglePrescription = ({ prescription }) => {
  const img = new Image();
  const logo = new Image();
  const date = new Date();

  logo.src = "/images/Hospital-logo-W.png";

  function downloadPrescription() {
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 5;
    //doc.text(`${prescription.date} \n\n ${prescription.text}`, 10, 10);
    // setContent(`${prescription.date} \n\n ${prescription.text}`);

    const text = `\n\nDate :${new Date(prescription.date).toString()} \n\n ${
      prescription.text
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
      "Helasuwa.lk \nTel: 0771231231 \nAddress No: No:11,Kandy road,\n",
      pdfWidth / 4 + 15,
      20
    );
    //    doc.text(`Dr.${doctor.drname} \n${doctor.qualifications}` , (pdfWidth/2) + 10 , 230) ;

    //doc.save('output.pdf');

    //doc.save(`${prescription._id}.pdf`);
    //doc.addImage(img) ;
    doc.save(`${prescription._id}.pdf`);
    //------------------------------------
  }
  return (
    <div>
      <h5>Date Time : {new Date(prescription.date).toISOString()}</h5>
      <h3>{prescription.text}</h3>

      <button className="btn-download-pres" onClick={downloadPrescription}>
        Download
      </button>
    </div>
  );
};

export default SinglePrescription;
