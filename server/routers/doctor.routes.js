const express = require('express');
const router = express.Router();
const userController = require('../controllers/doctor.controller');

router.get('/doctors', userController.getDoctorUsers);
router.get('/doctors/:id', userController.getDoctorById);

module.exports = router;
