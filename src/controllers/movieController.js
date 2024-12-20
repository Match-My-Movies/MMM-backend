const axios = require('axios');
const movieService = require('../services/movieService');

const getMoviesByGenres = async (req, res) => {
  try {
    const { genre1, genre2 } = req.query;
    if (!genre1 || !genre2) {
      return res.status(400).json({ error: 'Both genres are required' });
    }
    const movies = await movieService.fetchMoviesByGenres(genre1, genre2);
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies by genres:", error.message);
    res.status(500).json({ error: 'Failed to fetch movies by genres' });
  }
};

const getRandomMovie = async (req, res) => {
  try {
    const movie = await movieService.fetchRandomMovie();
    res.json(movie);
  } catch (error) {
    console.error('Error fetching random movie:', error.message);
    res.status(500).json({ error: "Failed to fetch a random movie" });
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Movie ID is required' });
    }
    const details = await movieService.fetchMovieDetails(id);
    res.json(details);
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
};

const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const results = await movieService.searchMovies(query);
    res.json(results);
  } catch (error) {
    console.error('Error searching movies:', error.message);
    res.status(500).json({ error: 'Failed to search movies' });
  }
};

module.exports = {
  getMoviesByGenres,
  getRandomMovie,
  getMovieDetails,
  searchMovies,
};
