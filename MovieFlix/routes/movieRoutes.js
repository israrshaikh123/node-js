const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movieController')
const upload = require('../config/multer')

router.get('/', movieController.getAllMovies)
router.get('/add' , movieController.getAddMovieForm)
router.post('/add' , upload.single('poster') , movieController.createMovie)
router.post('/delete/:id' , movieController.deleteMovie)
router.get('/edit/:id' , movieController.getEditMovieForm)
router.post('/edit/:id' , upload.single('poster') , movieController.updateMovie)

module.exports = router