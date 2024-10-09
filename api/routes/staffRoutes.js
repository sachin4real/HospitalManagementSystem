import express from 'express';
const router = express.Router();
import staffController from '../controllers/staffController.js';

router.post('/add', staffController.addStaff);
router.get('/', staffController.getAllStaff);
router.get('/:id', staffController.getStaffById);
router.put('/:id', staffController.updateStaff);
router.delete('/:id', staffController.deleteStaff);

export default router;
