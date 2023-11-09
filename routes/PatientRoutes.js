import express  from "express";
const router = express.Router();

import checkAuth from "../Middleware/authMiddleware.js";

import {
    addPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient
} from '../controllers/PatientController.js';

router.post('/', checkAuth, addPatient);
router.get('/', checkAuth, getPatients);
router.get('/:id', checkAuth, getPatient);
router.put('/:id', checkAuth, updatePatient);
router.delete('/:id', checkAuth, deletePatient);


export default router;