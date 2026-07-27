const Department = require("../models/Department.js");

const addDepartment = async (req, res) => {
  try {
    const { departmentName, description } = req.body;
    const newDept = new Department({ departmentName, description });
    await newDept.save();
    res.status(201).json({ message: "Department added successfully", department: newDept });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const updatedDept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDept) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ message: "Department updated successfully", department: updatedDept });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const deletedDept = await Department.findByIdAndDelete(req.params.id);
    if (!deletedDept) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { addDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment };