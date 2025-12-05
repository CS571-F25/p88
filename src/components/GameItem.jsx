import React from 'react';
import { Link } from 'react-router-dom';
import './GameItem.css';

function GameItem({ game }) {
  return (
    <div className="game-item">
      <Link to={`/game/${game.id}`} className="game-link">
        <div className="game-image-container">
          {game.background_image && (
            <img 
              src={game.background_image} 
              alt={game.name} 
              className="game-image"
            />
          )}
        </div>
        <div className="game-info">
          <h3 className="game-name">{game.name}</h3>
          <div className="game-meta">
            {game.released && (
              <p className="game-released">Released: {game.released}</p>
            )}
            <p className="game-rating">Rating: {typeof game.rating === 'number' && game.rating > 0 ? `${game.rating}/5` : 'No rating'}</p>
            {game.genres && game.genres.length > 0 && (
              <p className="game-genres">{game.genres.join(', ')}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default GameItem;
