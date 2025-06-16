// MovieCard.js
import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onLike, isFavorite = false, showRemove = false }) => {
  return (
    <div className="card">
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.release_date?.slice(0, 4)}</p>

      {showRemove ? (
        <button onClick={() => onLike(movie)} className="remove-button">
          Remove from Favorites
        </button>
      ) : (
        <button onClick={() => onLike(movie)} className="heart-button">
          <span style={{ color: isFavorite ? 'red' : 'white', fontSize: '24px' }}>♥</span>
        </button>
      )}
    </div>
  );
};

export default MovieCard;
