// // controllers/doctor.controller.js

// const { Doctor } = require('../models');

// // Create a new doctor
// exports.createDoctor = async (req, res) => {
//   try {
//     const doctor = await Doctor.create(req.body);
//     res.status(201).json(doctor);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Get all doctors
// exports.getAllDoctors = async (req, res) => {
//   try {
//     const doctors = await Doctor.findAll();
//     res.status(200).json(doctors);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get a single doctor by ID
// exports.getDoctorById = async (req, res) => {
//   try {
//     const doctor = await Doctor.findByPk(req.params.id);
//     if (!doctor) {
//       return res.status(404).json({ error: 'Doctor not found' });
//     }
//     res.status(200).json(doctor);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update a doctor
// exports.updateDoctor = async (req, res) => {
//   try {
//     const doctor = await Doctor.findByPk(req.params.id);
//     if (!doctor) {
//       return res.status(404).json({ error: 'Doctor not found' });
//     }
//     await doctor.update(req.body);
//     res.status(200).json(doctor);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Delete a doctor
// exports.deleteDoctor = async (req, res) => {
//   try {
//     const doctor = await Doctor.findByPk(req.params.id);
//     if (!doctor) {
//       return res.status(404).json({ error: 'Doctor not found' });
//     }
//     await doctor.destroy();
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const db = require('../models');
const User = db.User;

exports.getDoctorUsers = async (req, res) => {
  try {
    const doctorUsers = await User.findAll({
      where: { role: 'doctor' },
      attributes: ['id', 'name', 'email', 'role'] // You can customize the fields you want to return
    });

    res.status(200).json(doctorUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch doctor users' });
  }
};

exports.getDoctorById = async (req, res) => {
    const doctorId = req.params.id;
  
    try {
      const doctor = await User.findOne({
        where: {
          id: doctorId,
          role: 'doctor'
        },
        attributes: ['id', 'name', 'email', 'role']
      });
  
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      res.status(200).json(doctor);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch doctor' });
    }
  };
  