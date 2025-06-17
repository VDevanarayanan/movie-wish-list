// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { fetchMovies } from './api';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import Favorites from './components/Favorites';
import axios from 'axios';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);

  const loadPopularMovies = () => {
    fetchMovies().then(setMovies);
  };

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const handleSearch = (query) => {
    fetchMovies(query).then(setMovies);
  };

  const handleLike = async (movie) => {
    try {
      await axios.post('https://movie-backend-vtje.onrender.com/favorites', {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Movie added to favorites:', movie.title);
    } catch (err) {
      console.error('Error adding movie to favorites:', err.response?.data || err.message);
    }
  };
  

  return (
    <Router>
      <nav>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={loadPopularMovies}>
          Home
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''}>
          Favorites
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={
          <>
            <SearchBar onSearch={handleSearch} />
            <MovieList movies={movies} onLike={handleLike} />
          </>
        } />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
