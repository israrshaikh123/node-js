const Prescription = require("../models/Prescription.js");

const addPrescription = async (req, res) => {
  try {
    const { appointment, medicines, diagnosis, doctorNotes } = req.body;

    const newPrescription = new Prescription({ appointment, medicines, diagnosis, doctorNotes });
    await newPrescription.save();

    res.status(201).json({ message: "Prescription added successfully", prescription: newPrescription });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().populate("appointment");
    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id).populate("appointment");
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.status(200).json(prescription);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updatePrescription = async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPrescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.status(200).json({ message: "Prescription updated successfully", prescription: updatedPrescription });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deletePrescription = async (req, res) => {
  try {
    const deletedPrescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!deletedPrescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.status(200).json({ message: "Prescription deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { addPrescription, getAllPrescriptions, getPrescriptionById, updatePrescription, deletePrescription };