const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
const port = 3000;

const tasks = [
  {
    id: 1,
    title: "TODO project",
    priority: "HIGH",
    description:
      "we have to make todo-application for daily based tasks to be productive",
    status: "completed",
  },
  {
    id: 2,
    title: "Admin-Panel",
    priority: "HIGH",
    description: "we have to make admin panel for our red and white project",
    status: "pending",
  },
];

app.get("/add-task", (req, res) => {
  res.render("add-task");
});

app.post("/add-task", (req, res) => {
  const { title, description, priority } = req.body;

  const newTask = {
    id: Date.now(),
    title: title,
    priority: priority,
    description: description,
    status: "pending",
  };
  tasks.push(newTask);
  res.redirect("/");
});

app.get("/edit-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskFound = tasks.find((t) => t.id === taskId);

  if (taskFound) {
    res.render("edit-task", { task: taskFound });
  } else {
    res.redirect("/");
  }
});

app.post("/edit-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const { title, description, status } = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = {
      id: taskId,
      title: title,
      description: description,
      status: status,
    };
  }
  res.redirect("/");
});

app.get("/delete-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }
  res.redirect("/");
});

app.get("/", (req, res) => {
  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter((t) => t.status === "pending").length;

  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  res.render("dashboard", {
    tasks: tasks,
    total: totalTasks,
    pending: pendingTasks,
    completed: completedTasks,
  });
});

app.get("/update-status/:id/:newStatus", (req, res) => {
  const taskId = parseInt(req.params.id);

  const newStatus = req.params.newStatus;

  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex].status = newStatus;
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is started on ${port}`);
});
