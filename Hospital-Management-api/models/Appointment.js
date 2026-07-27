const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Confirmed", "Cancelled", "Completed"], default: "Pending" }
});

module.exports = mongoose.model("Appointment", appointmentSchema);