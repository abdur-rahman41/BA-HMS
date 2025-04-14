const express = require('express');
const router = express.Router();
const controller = require('../controllers/medicalRecord.controller');
const { authenticate ,authorize} = require('../middlewares/auth.middleware');

router.post('/create-medical-record', authenticate,authorize('admin'), controller.createMedicalRecord);
router.get('/', authenticate, controller.getAllRecords);
router.get('/my', authenticate, controller.getMyRecords);


// Other routes...
router.get('/download-pdf/:id', authenticate, controller.downloadMedicalRecordPdf);

module.exports = router;


module.exports = router;
