// controllers/appointmentController.js
const Appointment = require('../models/Appointment');

// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json(updatedAppointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: "Appointment deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};