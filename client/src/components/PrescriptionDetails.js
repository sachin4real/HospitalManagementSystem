import React from 'react';
import '../styles/PrescriptionDetails.css';

export default function PrescriptionDetails({ prescription, onBack }) {
    return (
        <div className="prescription-details-container">
            <button className="back-button" onClick={onBack}>Back to All Prescriptions</button>
            <h2>Prescription Details</h2>
            <p><strong>Prescription Id:</strong> {prescription._id}</p>
            <p><strong>Appointment Id:</strong> {prescription.appointment || 'N/A'}</p>
            <p><strong>Date:</strong> {new Date(prescription.date).toLocaleString()}</p>
            <p><strong>Prescription:</strong> {prescription.text}</p>
        </div>
    );
}
