// src/components/Favorites.js
import React, { useEffect, useState } from 'react';
import MovieList from './MovieList';
import axios from 'axios';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get('https://movie-backend-1-3lad.onrender.com/favorites')
      .then(res => {
        if (Array.isArray(res.data.favorites)) {
          setFavorites(res.data.favorites);
        } else {
          console.error("Unexpected response format:", res.data);
          setFavorites([]);
        }
      })
      .catch(err => {
        console.error("Error fetching favorites:", err);
        setFavorites([]);
      });
  }, []);

  const handleRemove = async (movie) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${movie.id}`);
      setFavorites(prev => prev.filter(f => f.id !== movie.id));
    } catch (error) {
      console.error("Failed to delete movie from favorites:", error);
    }
  };

  return (
    <div className="favorites-container">
      <h2>Your Favorite Movies</h2>
      {favorites.length === 0 ? (
        <div className="empty-message">You haven't liked any movies yet.</div>
      ) : (
        <MovieList
          movies={favorites}
          onLike={handleRemove}
          favorites={favorites}
          showRemove={true}
        />
      )}
    </div>
  );
};

export default Favorites;
