const MedicalReport = require("../models/MedicalReport.js");

const uploadReport = async (req, res) => {
  try {
    const { patient, reportTitle } = req.body;

    const newReport = new MedicalReport({
      patient,
      reportTitle,
      reportFile: req.file ? req.file.filename : null
    });

    await newReport.save();
    res.status(201).json({ message: "Medical report uploaded successfully", report: newReport });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await MedicalReport.find().populate("patient");
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getReportById = async (req, res) => {
  try {
    const report = await MedicalReport.findById(req.params.id).populate("patient");
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateReport = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.reportFile = req.file.filename;
    }
    const updatedReport = await MedicalReport.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({ message: "Report updated successfully", report: updatedReport });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteReport = async (req, res) => {
  try {
    const deletedReport = await MedicalReport.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { uploadReport, getAllReports, getReportById, updateReport, deleteReport };