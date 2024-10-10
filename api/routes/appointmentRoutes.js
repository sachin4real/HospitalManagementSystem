// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/appointments', appointmentController.createAppointment);
router.get('/appointments', appointmentController.getAppointments);
router.put('/appointments/:id', appointmentController.updateAppointment);
router.delete('/appointments/:id', appointmentController.deleteAppointment);

module.exports = router;