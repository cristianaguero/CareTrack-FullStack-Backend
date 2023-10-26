import express from 'express';
const router = express.Router();

import checkAuth from '../middleware/authMiddleware.js';

import {
    register,
    authenticate,
    confirmAccount,
    profile,
    forgetPassword,
    checkToken,
    newPassword
} from '../controllers/DoctorController.js';

router.post('/register', register);
router.get('/confirm-account/:token', confirmAccount);
router.post('/login', authenticate);
router.post('/forget-password', forgetPassword);
router.get('/forget-password/:token', checkToken);
router.post('/forget-password/:token', newPassword);

router.get('/profile', checkAuth, profile)

export default router;