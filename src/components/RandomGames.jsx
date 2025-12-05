import React, { useState, useEffect } from 'react';
import './RandomGames.css';
import { Link } from 'react-router-dom';

function RandomGames() {
  const [randomGames, setRandomGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/p88/assets/games.json');
        const allGames = await response.json();
        
        const filteredGames = allGames.filter(game => 
          game.platforms.some(platform => platform === 'PlayStation' || platform.toUpperCase() === 'SNES' || platform.toUpperCase() === 'NES')
        );

        const shuffled = [...filteredGames].sort(() => 0.5 - Math.random());
        setRandomGames(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="random-games-section">
      <h2>Random Games</h2>
      <div className="games-list">
        {randomGames.map((game) => (          
          <Link to={`/game/${game.id}`} state={{ game: game }} key={game.id} className="game-card-link">
            <div className="game-card">
              <img src={game.background_image} alt={game.name} className="game-image" />
              <div className="game-info">
                <h3 className="game-title">{game.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RandomGames;