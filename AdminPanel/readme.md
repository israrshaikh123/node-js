# 🖥️ Admin Panel — Node.js + MVC + Session/Passport Authentication

## 🎥 Video Explanation

Admin-Panel HTML To NODE-MVC Conversion: [https://drive.google.com/file/d/1YYr7xe478N4OMr-giNvkbWKpQdjVWwHX/view?usp=drive_link]

Submission 1: [https://drive.google.com/file/d/15nNJy1vFTr7viF9m7iVPiFn07kKYU4ks/view?usp=drive_link]

Submission 2: [https://drive.google.com/file/d/1JIcEcxS3iqkh5aZazvT6c6iidUeQyj6I/view?usp=drive_link]

A professional Admin Panel converted from static HTML (AdminLTE template) into a dynamic **Node.js + Express.js + EJS** application following the **MVC architecture pattern**, with authentication implemented in two stages:

- **Submission 1:** Cookie-based authentication (Signup, Signin, protected routes, Logout)
- **Submission 2:** Upgraded to **session-based authentication using Passport.js** (Local Strategy, Serialize/Deserialize, session-protected routes, Logout)

---

## 🎯 Project Objective

Convert a static HTML Admin Panel into a fully functional Node.js application using the MVC (Model-View-Controller) design pattern, and implement a secure, production-style authentication flow — starting with basic cookies, then upgrading to server-side sessions managed by Passport.js.

---

## 🚀 Features

- ✅ Dynamic dashboard with AdminLTE UI
- ✅ Tables, Forms, and Mailbox pages
- ✅ Reusable EJS partials (header/navbar, sidebar, footer)
- ✅ Active menu highlighting based on current page
- ✅ MVC folder structure (Models, Views, Controllers, Routes, Middlewares, Config)
- ✅ MongoDB database integration via Mongoose
- ✅ User Signup with **bcrypt password hashing**
- ✅ User Signin with secure password comparison
- ✅ **Session-based authentication** using `express-session`
- ✅ **Passport.js Local Strategy** for login verification
- ✅ **Serialize/Deserialize User** for session persistence
- ✅ Custom `setAuthenticated` middleware (session-based route protection)
- ✅ Logout via `req.logout()` with proper session cleanup
- ✅ Responsive layout

---

## 🛠️ Tech Stack

| Technology     | Usage                                |
| -------------- | ------------------------------------- |
| Node.js        | Backend Runtime                       |
| Express.js     | Web Framework                         |
| EJS            | Templating Engine                     |
| MongoDB        | Database                              |
| Mongoose       | ODM for MongoDB                       |
| bcrypt         | Password hashing                      |
| cookie-parser  | Reading/parsing cookies               |
| express-session| Server-side session management        |
| passport       | Authentication middleware framework   |
| passport-local | Email/password authentication strategy|
| AdminLTE       | UI Template                           |
| Bootstrap 5    | CSS Framework                         |

---

## 📁 Project Structure

```
AdminPanel/
│── config/
│   └── passport.js
│── controllers/
│   └── dashboardController.js
│── routes/
│   └── dashboardRoutes.js
│── models/
│   └── User.js
│── middlewares/
│   └── setAuthenticated.js
│── views/
│   ├── partials/
│   │   ├── head.ejs
│   │   ├── navbar.ejs
│   │   ├── sidebar.ejs
│   │   └── footer.ejs
│   ├── dashboard.ejs
│   ├── tables.ejs
│   ├── forms.ejs
│   ├── mailbox.ejs
│   ├── signup.ejs
│   └── login.ejs
│── public/
│   ├── css/
│   ├── js/
│   └── assets/
│       └── screenshots/
│── app.js
└── package.json
```

---

## 🔄 MVC Flow

```
Browser Request
     ↓
app.js (Entry Point — express-session, passport.initialize(), passport.session())
     ↓
routes/dashboardRoutes.js (URL Handler)
     ↓
middlewares/setAuthenticated.js (req.isAuthenticated() check — for protected routes)
     ↓
controllers/dashboardController.js (Logic)
     ↓
models/User.js (Database interaction, if needed)
     ↓
views/*.ejs (UI/Template)
     ↓
Browser Response
```

---

## 🔐 Authentication Flow (Submission 2 — Session + Passport)

1. **Signup** — User submits name/email/password → password is hashed using `bcrypt` → new user document is saved in MongoDB.
2. **Cookie Restriction** — Cookies are hardened with `httpOnly: true` (prevents client-side JS access, mitigates XSS) and `maxAge` (auto-expiry).
3. **Express Session Setup** — `express-session` is configured in `app.js` (`secret`, `resave: false`, `saveUninitialized: false`), giving every request access to a server-side `req.session` object.
4. **Passport Local Strategy** (`config/passport.js`) — On login, Passport looks up the user by email, compares the submitted password against the stored hash using `bcrypt.compare()`, and reports the result via `done()`.
5. **Serialize User** — On successful login, only the user's `_id` (not the full user object) is stored in the session, minimizing exposed/stored data.
6. **Deserialize User** — On every subsequent request, the stored `_id` is used to fetch the full user document from MongoDB and attach it to `req.user`.
7. **Passport Login** — The `/login` POST route uses `passport.authenticate("local", { successRedirect, failureRedirect })` directly, replacing manual credential-checking logic.
8. **setAuthenticated Middleware** — Checks `req.isAuthenticated()` (provided by Passport) on protected routes; redirects to `/login` if the user isn't authenticated.
9. **Protect Routes** — `/`, `/tables`, `/forms`, `/mailbox` are guarded by `setAuthenticated`.
10. **Logout** — Uses Passport's `req.logout()` to clear the authenticated session (replaces the old manual `res.clearCookie()` approach).

> **Note:** The previous cookie-only auth (manually storing `userId` in a cookie and checking it in `middlewares/auth.js`) has been fully replaced by this session/Passport-based flow for better security — no sensitive identifiers are exposed client-side anymore.

---

## ⚙️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/israrshaikh123/node-js.git
cd node-js/AdminPanel
```

2. **Install dependencies**

```bash
npm install
```

3. **Make sure MongoDB is running locally**

By default, the app connects to:

```
mongodb://localhost:27017/adminpanel
```

4. **Start the server**

```bash
npm start
```

5. **Open in browser**

```
http://localhost:8000
```

---

## 📸 Screenshots

### Dashboard

![Dashboard](public/assets/screenshots/ss1.png)

### Tables

![Tables](public/assets/screenshots/ss4.png)

### Forms

![Forms](public/assets/screenshots/ss3.png)

### Mailbox

![Mailbox](public/assets/screenshots/ss2.png)

### Signup

![Signup](public/assets/screenshots/ss6.png)

### Login

![Login](public/assets/screenshots/ss5.png)

---

## 👨‍💻 Developer

**Israr** — Full Stack Development Student

---

## 📄 License

This project is for educational purposes.