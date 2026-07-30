# 🏥 Hospital Management REST API

## 🎥 Video Explanation

Project Explanation Video: [https://drive.google.com/file/d/1_6fLzIxDjZYLcbfwZbEbTZsDThydJKpg/view?usp=sharing]

---

A Hospital Management REST API built using **Node.js, Express.js, MongoDB**, and **Session-based Authentication (Passport.js)**, following the **MVC (Model-View-Controller)** architecture. The system allows Admins, Doctors, Receptionists, and Patients to manage hospital departments, doctors, patients, appointments, prescriptions, and medical reports through role-based, secure APIs.

---

## 🛠️ Tech Stack

| Technology       | Usage                                  |
|-------------------|-----------------------------------------|
| Node.js           | Backend Runtime                        |
| Express.js        | Web Framework                          |
| MongoDB           | Database                               |
| Mongoose          | ODM for MongoDB (schemas, populate)    |
| bcrypt            | Password hashing                       |
| express-session   | Server-side session management         |
| passport          | Authentication middleware framework    |
| passport-local    | Email/password authentication strategy |
| multer            | File uploads (doctor images, reports)  |
| dotenv            | Environment variable management        |

---

## 📁 Project Structure

```
hospital-management-api/
├── config/
│   ├── db.js
│   ├── passport.js
│   └── multer.js
├── models/
│   ├── User.js
│   ├── Department.js
│   ├── Doctor.js
│   ├── Patient.js
│   ├── Appointment.js
│   ├── Prescription.js
│   └── MedicalReport.js
├── controllers/
│   ├── authController.js
│   ├── departmentController.js
│   ├── doctorController.js
│   ├── patientController.js
│   ├── appointmentController.js
│   ├── prescriptionController.js
│   ├── medicalReportController.js
│   └── dashboardController.js
├── routes/
│   ├── authRoutes.js
│   ├── departmentRoutes.js
│   ├── doctorRoutes.js
│   ├── patientRoutes.js
│   ├── appointmentRoutes.js
│   ├── prescriptionRoutes.js
│   ├── medicalReportRoutes.js
│   └── dashboardRoutes.js
├── middlewares/
│   ├── isAuthenticated.js
│   └── checkRole.js
├── uploads/
├── .env
├── .gitignore
├── app.js
└── package.json
```

---

## 🔄 MVC Flow

```
Browser / Postman Request
     ↓
app.js (Entry Point — session, passport init, JSON parsing)
     ↓
routes/*.js (URL Handler)
     ↓
middlewares/isAuthenticated.js (session check)
     ↓
middlewares/checkRole.js (role permission check)
     ↓
controllers/*.js (Business Logic)
     ↓
models/*.js (Database interaction via Mongoose, incl. .populate())
     ↓
JSON Response
```

---

## 🔐 Authentication Flow (Session + Passport)

1. **Register** — user submits name/email/password/role/mobileNumber → password hashed with `bcrypt` → user saved in MongoDB.
2. **Express Session Setup** — `express-session` configured in `app.js`.
3. **Passport Local Strategy** — looks up user by email, compares password using `bcrypt.compare()`.
4. **Serialize User** — only `_id` stored in session.
5. **Deserialize User** — `_id` used to fetch full user document, attached to `req.user`.
6. **Login** — `POST /api/login` uses `passport.authenticate("local", ...)`.
7. **isAuthenticated Middleware** — checks `req.isAuthenticated()`, blocks unauthenticated requests.
8. **checkRole Middleware** — restricts routes based on allowed roles array (Admin / Doctor / Receptionist / Patient).
9. **Change Password** — verifies old password via `bcrypt.compare()`, hashes and saves new password.
10. **Logout** — `req.logout()` clears the session.

---

## 🗂️ Relationships (Populate)

```
Department → Doctors
Doctor → Appointments
Patient → Appointments
Appointment → Prescription
Patient → Medical Reports
```

All relational fields use Mongoose `ObjectId` references (`ref`), and `.populate()` is used to join related data when fetching records (e.g., fetching an Appointment returns full Patient, Doctor, and Department details, not just IDs).

---

## 🛡️ Role-Based Access Control

| Role         | Access                                                              |
|--------------|-----------------------------------------------------------------------|
| Admin        | Full access — all modules (Departments, Doctors, Patients, etc.)      |
| Doctor       | View data, manage Prescriptions, manage Medical Reports                |
| Receptionist | Register Patients, book/manage Appointments, manage Medical Reports    |
| Patient      | View own data (read access to relevant endpoints)                     |

Implemented via a higher-order middleware:
```js
const checkRole = (allowedRoles) => (req, res, next) => {
  if (allowedRoles.includes(req.user.role)) return next();
  res.status(403).json({ message: "Unauthorized - You don't have permission" });
};
```

---

## 📦 REST API Endpoints

### Authentication
| Method | Endpoint               |
|--------|--------------------------|
| POST   | /api/register            |
| POST   | /api/login                |
| POST   | /api/logout                |
| PUT    | /api/change-password       |

### Departments
| Method | Endpoint                  |
|--------|-----------------------------|
| POST   | /api/departments             |
| GET    | /api/departments              |
| GET    | /api/departments/:id           |
| PUT    | /api/departments/:id            |
| DELETE | /api/departments/:id             |

### Doctors
| Method | Endpoint              |
|--------|--------------------------|
| POST   | /api/doctors  (multipart/form-data — field: profileImage) |
| GET    | /api/doctors               |
| GET    | /api/doctors/:id             |
| PUT    | /api/doctors/:id  (multipart/form-data)               |
| DELETE | /api/doctors/:id               |

### Patients
| Method | Endpoint            |
|--------|------------------------|
| POST   | /api/patients            |
| GET    | /api/patients             |
| GET    | /api/patients/:id           |
| PUT    | /api/patients/:id            |
| DELETE | /api/patients/:id             |

### Appointments
| Method | Endpoint                          |
|--------|--------------------------------------|
| POST   | /api/appointments                     |
| GET    | /api/appointments                      |
| GET    | /api/appointments/:id                    |
| PUT    | /api/appointments/:id                     |
| DELETE | /api/appointments/:id  (cancels — sets status to "Cancelled") |
| PUT    | /api/appointments/:id/assign-doctor          |

### Prescriptions
| Method | Endpoint                |
|--------|----------------------------|
| POST   | /api/prescriptions            |
| GET    | /api/prescriptions             |
| GET    | /api/prescriptions/:id           |
| PUT    | /api/prescriptions/:id            |
| DELETE | /api/prescriptions/:id             |

### Medical Reports
| Method | Endpoint         |
|--------|---------------------|
| POST   | /api/reports  (multipart/form-data — field: reportFile) |
| GET    | /api/reports          |
| GET    | /api/reports/:id         |
| PUT    | /api/reports/:id  (multipart/form-data)        |
| DELETE | /api/reports/:id           |

### Dashboard
| Method | Endpoint         |
|--------|---------------------|
| GET    | /api/dashboard  (Admin only — returns total doctors, patients, departments, appointments, prescriptions) |

---

## ⚙️ Installation & Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd hospital-management-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Make sure MongoDB is running locally** (via MongoDB Compass or `mongod`)

Default connection string used in `config/db.js`:
```
mongodb://localhost:27017/hospitalDB
```

4. **Create a `.env` file** in the project root (for email/app-specific secrets, if any are added later)

5. **Create the uploads folder** (for doctor images & medical reports)
```bash
mkdir uploads
```

6. **Start the server**
```bash
npm start
```

7. **Server runs at**
```
http://localhost:8000
```

---

## 🧪 Testing

All endpoints were tested using **Postman**. A Postman collection (`Hospital-Management-API.postman_collection.json`) is included in this repository — import it into Postman to test all routes directly.

**Suggested test flow:**
1. Register an Admin user (`role: "admin"`)
2. Login as Admin
3. Create Departments → Doctors → Patients
4. Book Appointments (using Patient/Doctor/Department IDs)
5. Add Prescriptions (login as the relevant Doctor)
6. Upload Medical Reports
7. Check Dashboard stats (Admin only)

---

## 👨‍💻 Developer

**Israr** — Full Stack Development Student

---

## 📄 License

This project is for educational purposes.