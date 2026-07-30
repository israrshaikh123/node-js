const mongoose = require("mongoose");

const medicalReportSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  reportTitle: { type: String, required: true },
  reportFile: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MedicalReport", medicalReportSchema);