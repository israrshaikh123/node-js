const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
  medicines: { type: String, required: true },
  diagnosis: { type: String, required: true },
  doctorNotes: { type: String }
});

module.exports = mongoose.model("Prescription", prescriptionSchema);