import express from 'express';
const router = express.Router();
import patientController from '../controllers/patientController.js';

router.post('/add', patientController.addPatient);
router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

export default router;
