const Movie = require("../models/movies");
const fs = require("fs");
exports.getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.render("index", { movies: movies });
};

exports.getAddMovieForm = (req, res) => {
  res.render("add-movie");
};

exports.createMovie = async (req, res) => {
  const newMovie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    releaseYear: req.body.releaseYear,
    duration: req.body.duration,
    rating: req.body.rating,
    description: req.body.description,
    poster: req.file.filename,
  });
  await newMovie.save();
  res.redirect("/movies");
};

exports.deleteMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  fs.unlink(`uploads/${movie.poster}`, (err) => {
    if (err) console.log(err);
  });

  await Movie.findByIdAndDelete(req.params.id);
  res.redirect("/movies");
};

exports.updateMovie = async (req, res) => {
  const updateData = {
    title: req.body.title,
    genre: req.body.genre,
    releaseYear: req.body.releaseYear,
    duration: req.body.duration,
    rating: req.body.rating,
    description: req.body.description,
  };
  if (req.file) {
    updateData.poster = req.file.filename;
  }

  await Movie.findByIdAndUpdate(req.params.id, updateData);
  res.redirect("/movies");
};

exports.getEditMovieForm = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render("edit-movie", { movie: movie });
};
