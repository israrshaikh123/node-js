const Todo = require("../models/Todo");

const indexController = {
  index: async (req, res) => {
    const todos = await Todo.find();
    res.render("index", { todos: todos });
  },
  addTask: async (req, res) => {
    const task = req.body.task;
    await Todo.create({ task: task });
    res.redirect("/");
  },
  deleteTask: async (req, res) => {
    const taskId = req.params.id;
    await Todo.findByIdAndDelete(taskId);
    res.redirect("/");
  },
  getEdit: async (req, res) => {
    const taskId = req.params.id;

    const todo = await Todo.findById(taskId);

    res.render("edit", { todo: todo });
  },

  postEdit: async (req, res) => {
    const taskId = req.params.id;

    const newTask = req.body.task;

    await Todo.findByIdAndUpdate(taskId, { task: newTask });

    res.redirect("/");
  },
};

module.exports = indexController;
