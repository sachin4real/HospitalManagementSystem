import React from 'react';
import '../styles/PrescriptionDetails.css';
import jsPDF from 'jspdf';

export default function PrescriptionDetails({ prescription, onBack }) {

    function downloadPrescription() {
        const doc = new jsPDF();
        
        // Optional: Add a title or logo
        doc.setFontSize(18);
        doc.text("Prescription Details", 10, 10);
        
        // Adding prescription details to PDF
        doc.setFontSize(12);
        doc.text(`Prescription ID: ${prescription._id}`, 10, 30);
        doc.text(`Appointment ID: ${prescription.appointment || 'N/A'}`, 10, 40);
        doc.text(`Date: ${new Date(prescription.date).toLocaleString()}`, 10, 50);
        doc.text("Prescription:", 10, 60);

        // Multi-line text for prescription text
        const prescriptionText = prescription.text || "No details available";
        const splitText = doc.splitTextToSize(prescriptionText, 180); // Split text to fit width
        doc.text(splitText, 10, 70);

        // Save the PDF
        doc.save(`Prescription_${prescription._id}.pdf`);
    }

    return (
        <div className="prescription-details-container">
            <button className="download-btn-pres" onClick={onBack}>Back to All Prescriptions</button>
            <h2>Prescription Details</h2>
            <p><strong>Prescription Id:</strong> {prescription._id}</p>
            <p><strong>Appointment Id:</strong> {prescription.appointment || 'N/A'}</p>
            <p><strong>Date:</strong> {new Date(prescription.date).toLocaleString()}</p>
            <p><strong>Prescription:</strong> {prescription.text}</p>

            <div>
                <button 
                    className="download-btn-pres" 
                    onClick={(e) => {
                        e.stopPropagation();
                        downloadPrescription();
                    }}
                >
                    Download
                </button>
            </div>
        </div>
    );
}
