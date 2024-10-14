import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RowPrescriptionView from './RowPrescriptionView';
import { useParams } from 'react-router-dom';
import PrescriptionDetails from './PrescriptionDetails';

export default function PrescriptionSummary() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [selectedPrescription, setSelectedPrescription] = useState(null); // State for selected prescription
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pid, setPid] = useState('');
    const [query, setQuery] = useState('');

    let { _id } = useParams();

    const getPrescriptions = async () => {
        try {
            const res = await axios.get('http://localhost:8070/patient/check/', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            const patient = res.data.patient;
            setEmail(patient.email);
            setPassword(patient.password);
            setPid(patient._id);

            const prescriptionRes = await axios.get(
                `http://localhost:8070/prescription/patient/search/${patient._id}?query=${query}`
            );
            setPrescriptions(prescriptionRes.data);
        } catch (error) {
            console.error(error);
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    };

    useEffect(() => {
        getPrescriptions();
    }, []);

    return (
        <div>
            {selectedPrescription ? (
                <PrescriptionDetails 
                    prescription={selectedPrescription} 
                    onBack={() => setSelectedPrescription(null)} 
                />
            ) : (
                <table className="tests-table">
                    <thead>
                        <tr className="th-tests">
                            <th>Prescription Id</th>
                            <th>Appointment Id</th>
                            <th>Date</th>
                            <th>Prescription</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prescriptions.map((item) => (
                            <RowPrescriptionView 
                                key={item._id} 
                                item={item} 
                                onClick={() => setSelectedPrescription(item)} // Pass function to view prescription
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
