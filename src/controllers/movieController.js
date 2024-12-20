const axios = require('axios');
const movieService = require('../services/movieService');

const getMoviesByGenres = async (req, res) => {
  try {
    const { genre1, genre2 } = req.query;
    console.log('Genres received by backend:', genre1, genre2); // Debugging
    const movies = await movieService.fetchMoviesByGenres(genre1, genre2);
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies by genres:", error);
    res.status(500).json({ error: 'Failed to fetch movies by genres' });
  }
};

const getRandomMovie = async (req, res) => {
  try {
    const movie = await movieService.fetchRandomMovie();
    res.json(movie);
  } catch (error) {
    console.error('Error fetching random movie:', error);
    res.status(500).json({ error: "Failed to fetch a random movie" });
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extract movie ID from the route
    if (!id) {
      return res.status(400).json({ error: 'Movie ID is required' });
    }
    const url = `${process.env.TMDB_API_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}`;
    console.log('Fetching movie details from:', url); // Debugging
    const response = await axios.get(url);
    res.json(response.data); // Return movie details
  } catch (error) {
    console.error('Error fetching movie details:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
};

const searchMovies = async (req, res) => {
  try {
    const { query } = req.query; // Extract the 'query' parameter from the request
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const url = `${process.env.TMDB_API_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
    console.log('TMDb Search URL:', url); // Log the API URL for debugging
    const response = await axios.get(url);
    res.json(response.data.results); // Return the results to the frontend
  } catch (error) {
    console.error('Error searching movies:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to search movies' });
  }
};

module.exports = {
  getMoviesByGenres,
  getRandomMovie,
  getMovieDetails,
  searchMovies,
};
