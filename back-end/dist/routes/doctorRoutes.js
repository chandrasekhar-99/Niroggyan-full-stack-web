import express from 'express';
import { getAllDoctors } from '../controllers/doctorController';
const router = express.Router();
router.get('/', getAllDoctors);
export default router;
