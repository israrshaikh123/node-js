const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileImage: { type: String }
});

module.exports = mongoose.model("Doctor", doctorSchema);