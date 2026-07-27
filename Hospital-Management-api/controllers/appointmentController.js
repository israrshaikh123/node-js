const Appointment = require("../models/Appointment.js");

const bookAppointment = async (req, res) => {
  try {
    const { patient, doctor, department, appointmentDate, appointmentTime } = req.body;

    const newAppointment = new Appointment({
      patient,
      doctor,
      department,
      appointmentDate,
      appointmentTime
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient")
      .populate("doctor")
      .populate("department");
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient")
      .populate("doctor")
      .populate("department");
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment updated successfully", appointment: updatedAppointment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const cancelledAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );
    if (!cancelledAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment cancelled successfully", appointment: cancelledAppointment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const assignDoctor = async (req, res) => {
  try {
    const { doctor } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { doctor, status: "Confirmed" },
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Doctor assigned successfully", appointment: updatedAppointment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  bookAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  assignDoctor
};