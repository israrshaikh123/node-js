const Patient = require("../models/Patient.js");

const registerPatient = async (req, res) => {
  try {
    const { name, age, gender, address, mobileNumber, bloodGroup } = req.body;

    const newPatient = new Patient({ name, age, gender, address, mobileNumber, bloodGroup });
    await newPatient.save();

    res.status(201).json({ message: "Patient registered successfully", patient: newPatient });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient updated successfully", patient: updatedPatient });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { registerPatient, getAllPatients, getPatientById, updatePatient, deletePatient };