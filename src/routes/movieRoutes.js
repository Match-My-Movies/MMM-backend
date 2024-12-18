const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/genres', movieController.getMoviesByGenres);
router.get('/random', movieController.getRandomMovie);
router.get('/:id', movieController.getMovieDetails);

module.exports = router;
