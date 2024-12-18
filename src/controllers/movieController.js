const movieService = require('../services/movieService');

const getMoviesByGenres = async (req, res) => {
  try {
    const { genre1, genre2 } = req.query;
    console.log('Genres received by backend:', genre1, genre2); // Debugging
    const movies = await movieService.fetchMoviesByGenres(genre1, genre2);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies by genres' });
  }
};

const getMoviePairing = async (req, res) => {
  try {
    const { movie1, movie2 } = req.query;
    const movies = await movieService.fetchMoviePairing(movie1, movie2);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie pairing" });
  }
};

const getRandomMovie = async (req, res) => {
  try {
    const movie = await movieService.fetchRandomMovie();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch a random movie" });
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const details = await movieService.fetchMovieDetails(id);
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
};

module.exports = { getMoviesByGenres, getRandomMovie, getMovieDetails, getMoviePairing, };
