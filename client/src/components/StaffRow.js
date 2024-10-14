import React from "react";
import axios from "axios";
import jsPDF from "jspdf";

const StaffRow = ({ item }) => {

  const logo = new Image();
  logo.src = "/images/Hospital-logo-W.png";

  const deleteStaff = async () => {
    axios
      .delete(`http://localhost:8070/admin/delete/${item._id}`)
      .then((res) => {
        alert("Staff Deleted");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const downloadStaff = async()=> {
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 5;

    const text = `\n\nStaff Report \n\n
      Name : ${item.name}\n
      Stafff ID : ${item._id}\n
      Email : ${item.email} \n
      Role : ${item.roleName}\n
      Allocated Work : ${item.allocatedWork} \n
      
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

    doc.save(`${item._id}.pdf`);
  }
  return (
    <tr className="tr-tests">
      <td>{item._id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.roleName}</td>
      <td>{item.allocatedWork}</td>
      <td>
        <button onClick={deleteStaff} className="btn-delete-staff">
          Delete
        </button>
        <a href={"/editStaff/" + item._id}>
          <button className="btn-edit-staff">Edit</button>
        </a>

        <button className="btn-download-staff" onClick={downloadStaff}>Download Details</button>
      </td>
    </tr>
  );
};

export default StaffRow;
