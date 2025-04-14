const db = require('../models');
const MedicalRecord = db.MedicalRecord;
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Doctor = db.Doctor;
const Patient = db.Patient;

// Create medical record – Only doctors allowed
exports.createMedicalRecord = async (req, res) => {
  try {
    const { patient_id,doctor_id, disease_name, prescription, created_at } = req.body;

    // if (req.user.role !== 'doctor') {
    //   return res.status(403).json({ message: 'Access denied. Only doctors can create records.' });
    // }

    // // Optional: Validate doctor exists
    // const doctor = await Doctor.findOne({ where: { email: req.user.email } });
    // if (!doctor) {
    //   return res.status(404).json({ message: 'Doctor not found.' });
    // }

    const newRecord = await MedicalRecord.create({
      patient_id,
      doctor_id,
      disease_name,
      prescription,
      created_at,
    });

    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create record', error: error.message });
  }
};

// Doctor can get all records
exports.getAllRecords = async (req, res) => {
  try {
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ message: 'Access denied. Only doctors can view all records.' });
    }

    const records = await MedicalRecord.findAll({
      include: ['doctor', 'patient'],
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error: error.message });
  }
};

// Patients can view their own records
exports.getMyRecords = async (req, res) => {
  try {
    if (req.user.role !== 'patient') {
      return res.status(403).json({ message: 'Only patients can view their records.' });
    }

    const patient = await Patient.findOne({ where: { email: req.user.email } });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }

    const records = await MedicalRecord.findAll({
      where: { patient_id: patient.id },
      include: ['doctor', 'patient'],
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error: error.message });
  }
};





// 📌 API to Download Medical Record as PDF
exports.downloadMedicalRecordPdf = async (req, res) => {
    const recordId = req.params.id;

    try {
        const record = await MedicalRecord.findByPk(recordId, {
            include: ['patient', 'doctor']
        });

        if (!record) {
            return res.status(404).send("Medical record not found");
        }

        const doc = new PDFDocument();
        const filePath = path.join(__dirname, `../../MedicalRecord_${recordId}.pdf`);
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);
        doc.fontSize(20).text("Medical Record", { align: "center" });
        doc.moveDown();

        doc.fontSize(14).text(`Record ID: ${record.record_id}`);
        doc.text(`Patient ID: ${record.patient_id}`);
        doc.text(`Doctor ID: ${record.doctor_id}`);
        doc.text(`Disease: ${record.disease_name}`);
        doc.text(`Prescription: ${record.prescription}`);
        doc.text(`Date: ${record.created_at}`);

        doc.end();

        stream.on("finish", () => {
            res.download(filePath, (err) => {
                if (err) {
                    console.error("Download error:", err);
                    return res.status(500).send("Error downloading file");
                }
                fs.unlinkSync(filePath); // Clean up
            });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Server error");
    }
};
