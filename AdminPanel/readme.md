# 🖥️ Admin Panel — HTML to Node.js MVC Conversion

A professional Admin Panel converted from static HTML (AdminLTE template) to a dynamic **Node.js + Express.js + EJS** application following the **MVC architecture pattern**.

---

## 🎯 Project Objective

Convert a static HTML Admin Panel into a fully functional Node.js application using the MVC (Model-View-Controller) design pattern.

---

## 🚀 Features

- ✅ Dynamic dashboard with AdminLTE UI
- ✅ Tables page
- ✅ Forms page
- ✅ Mailbox page
- ✅ MVC folder structure
- ✅ EJS templating engine
- ✅ Responsive layout

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| Node.js | Backend Runtime |
| Express.js | Web Framework |
| EJS | Templating Engine |
| AdminLTE | UI Template |
| Bootstrap 5 | CSS Framework |

---

## 📁 Project Structure

```
AdminPanel/
│── controllers/
│   └── dashboardController.js
│── routes/
│   └── dashboardRoutes.js
│── views/
│   ├── dashboard.ejs
│   ├── tables.ejs
│   ├── forms.ejs
│   └── mailbox.ejs
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
app.js (Entry Point)
     ↓
routes/dashboardRoutes.js (URL Handler)
     ↓
controllers/dashboardController.js (Logic)
     ↓
views/*.ejs (UI/Template)
     ↓
Browser Response
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/AdminPanel.git
cd AdminPanel
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
```

4. **Open in browser**
```
http://localhost:3000
```

---

## 🔗 Available Routes

| Route | Page |
|-------|------|
| `/` | Dashboard |
| `/tables` | Tables |
| `/forms` | Forms |
| `/mailbox` | Mailbox |

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

---

## 👨‍💻 Developer

**Israr** — Full Stack Development Student

---

## 📄 License

This project is for educational purposes.