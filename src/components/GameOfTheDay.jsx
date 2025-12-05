import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GameOfTheDay.css';

function GameOfTheDay() {
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameOfTheDay = async () => {
      try {
        const response = await fetch('/p88/assets/games.json');
        const allGames = await response.json();

        const filteredGames = allGames.filter(game =>
          game.platforms.some(platform => platform === 'PlayStation' || platform.toUpperCase() === 'SNES' || platform.toUpperCase() === 'NES')
        );

        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 0);
        const diff = now - startOfYear;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        const gameIndex = dayOfYear % filteredGames.length;
        const gameOfTheDay = filteredGames[gameIndex];
        setGame(gameOfTheDay);
      } catch (error) {
        console.error("Failed to fetch game of the day:", error);
      }
    };

    fetchGameOfTheDay();
  }, []);

  if (!game) {
    return <div>Loading Game of the Day...</div>;
  }

  return (
    <div className="gotd-section">
      <h2>Game of the Day</h2>
      <Link to={`/game/${game.id}`} state={{ game: game }} className="gotd-card-link">
        <img src={game.background_image} alt={game.name} className="gotd-image" />
        <h3 className="gotd-title">{game.name}</h3>
      </Link>
    </div>
  );
}

export default GameOfTheDay;