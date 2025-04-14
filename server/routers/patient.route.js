const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware'); // adjust path if needed

// Create Patient - only accessible by users with 'doctor' role
router.post('/create-patient', authenticate, authorize('doctor'), patientController.createPatient);

module.exports = router;
