const axios = require('axios');

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMoviesByGenres = async (genre1, genre2) => {
  const randomPage = Math.floor(Math.random() * 10) + 1; // Random page between 1 and 10
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre1},${genre2}&sort_by=popularity.desc&page=${randomPage}`;
  console.log('TMDb API URL:', url); // Debugging
  const response = await axios.get(url);
  return response.data.results;
};

const fetchRandomMovie = async () => {
  const randomPage = Math.floor(Math.random() * 10) + 1; // Random page (1-10)
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${randomPage}`;
  const response = await axios.get(url);
  const movies = response.data.results;
  return movies[Math.floor(Math.random() * movies.length)];
};

const fetchMovieDetails = async (id) => {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

const searchMovies = async (query) => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
  const response = await axios.get(url);
  return response.data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
  })); // Simplify response for frontend
};

module.exports = {
  fetchMoviesByGenres,
  fetchRandomMovie,
  fetchMovieDetails,
  searchMovies,
};
