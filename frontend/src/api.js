import axios from 'axios';

const API_KEY = '90f9774ee01bed20adca616ce42d968f';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query = '') => {
  const endpoint = query
    ? `/search/movie?query=${query}&api_key=${API_KEY}`
    : `/movie/popular?api_key=${API_KEY}`;

  const response = await axios.get(`${BASE_URL}${endpoint}`);
  return response.data.results;
};
