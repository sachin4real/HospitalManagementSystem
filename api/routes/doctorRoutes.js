import express from 'express';
const router = express.Router();
import doctorController from '../controllers/doctorController.js';

router.post('/add', doctorController.addDoctor);
router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

export default router;
