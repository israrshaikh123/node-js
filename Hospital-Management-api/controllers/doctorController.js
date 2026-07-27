const Doctor = require("../models/Doctor.js");

const addDoctor = async (req, res) => {
  try {
    const { department, name, qualification, specialization, experience, contactNumber, email } = req.body;

    const newDoctor = new Doctor({
      department,
      name,
      qualification,
      specialization,
      experience,
      contactNumber,
      email,
      profileImage: req.file ? req.file.filename : null
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("department");
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("department");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.profileImage = req.file.filename;
    }
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor updated successfully", doctor: updatedDoctor });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { addDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor };