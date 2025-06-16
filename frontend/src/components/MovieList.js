// src/components/MovieList.js
import React from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ movies = [], onLike, favorites = [], showRemove = false }) => {
  if (!Array.isArray(movies)) {
    console.error("Expected 'movies' to be an array but got:", movies);
    return <div>Error loading movies</div>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id || movie.title}
          movie={movie}
          onLike={onLike}
          isFavorite={favorites.some(f => f.id === movie.id)}
          showRemove={showRemove}
        />
      ))}
    </div>
  );
};

export default MovieList;
