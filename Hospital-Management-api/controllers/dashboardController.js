const Doctor = require("../models/Doctor.js");
const Patient = require("../models/Patient.js");
const Department = require("../models/Department.js");
const Appointment = require("../models/Appointment.js");
const Prescription = require("../models/Prescription.js");

const getDashboardStats = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await Patient.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const totalPrescriptions = await Prescription.countDocuments();

    res.status(200).json({
      totalDoctors,
      totalPatients,
      totalDepartments,
      totalAppointments,
      totalPrescriptions
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getDashboardStats };