const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const session = require("express-session");
const passport = require("./config/passport.js");

const app = express();
app.use(express.json());

const connectDB = require("./config/db.js");
connectDB();

app.use(
  session({
    secret: "hospitalSecretKey",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/authRoutes.js");
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello israr");
});

const departmentRoutes = require("./routes/departmentRoutes.js");
app.use("/api/departments", departmentRoutes);

const doctorRoutes = require("./routes/doctorRoutes.js");
app.use("/api/doctors", doctorRoutes);

app.use("/uploads", express.static("uploads"));

const patientRoutes = require("./routes/patientRoutes.js");
app.use("/api/patients", patientRoutes);

const appointmentRoutes = require("./routes/appointmentRoutes.js");
app.use("/api/appointments", appointmentRoutes);

const prescriptionRoutes = require("./routes/prescriptionRoutes.js");
app.use("/api/prescriptions", prescriptionRoutes);

const medicalReportRoutes = require("./routes/medicalReportRoutes.js");
app.use("/api/reports", medicalReportRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes.js");
app.use("/api/dashboard", dashboardRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server Is Running On port ${PORT}`);
  console.log("http://localhost:8000");
});
