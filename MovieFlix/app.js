const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.set('view engine' , 'ejs')

app.use(express.static('public'))
app.use('/uploads' , express.static('uploads'))

mongoose
  .connect("mongodb://localhost:27017/movieflix")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const movieRoutes = require('./routes/movieRoutes')
app.use('/movies' , movieRoutes)



const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
