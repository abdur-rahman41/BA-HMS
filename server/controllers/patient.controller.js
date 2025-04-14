// const db = require('../models');
// const Patient = db.Patient;
// const bcrypt = require('bcryptjs');

// exports.createPatient = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   console.log(req.body);
//   try {
//     const hashed = bcrypt.hashSync(password, 8);
//     const patient = await Patient.create({ name, email, password: hashed, role });
//     res.json(patient);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.getAllPatients = async (req, res) => {
//   const patients = await Patient.findAll();
//   res.json( patients);
// };

const db = require('../models');
const Patient = db.Patient;

// Create a new Patient
const createPatient = async (req, res) => {
  try {
    const { first_name, last_name, date_of_birth, gender, contact_number, blood_group, address } = req.body;

    if (!first_name || !last_name || !date_of_birth || !gender) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const patient = await Patient.create({
      first_name,
      last_name,
      date_of_birth,
      gender,
      contact_number,
      blood_group,
      address,
    });

    res.status(201).json({ message: "Patient created successfully", patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all Patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patients", error: error.message });
  }
};

// Get Patient by ID
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patient", error: error.message });
  }
};

// Update Patient
const updatePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Patient.update(req.body, {
      where: { id },
    });

    if (updated) {
      const updatedPatient = await Patient.findByPk(id);
      return res.status(200).json({ message: "Patient updated successfully", patient: updatedPatient });
    }

    res.status(404).json({ message: "Patient not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update patient", error: error.message });
  }
};

// Delete Patient
const deletePatient = async (req, res) => {
  try {
    const deleted = await Patient.destroy({
      where: { id: req.params.id },
    });

    if (deleted) return res.status(200).json({ message: "Patient deleted successfully" });
    res.status(404).json({ message: "Patient not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete patient", error: error.message });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
