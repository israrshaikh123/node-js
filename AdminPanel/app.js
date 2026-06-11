const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/", dashboardRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("http://localhost:8000");
});
