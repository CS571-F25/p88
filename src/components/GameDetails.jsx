import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/p88/assets/games.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch games.json');
        return res.json();
      })
      .then(data => {
        const found = data.find(g => String(g.id) === String(id));
        setGame(found);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{color: 'red'}}>Error: {error}</p>;
  if (!game) return <p>Game not found.</p>;

  return (
    <div>
      <h2>{game.name}</h2>
      <img src={game.background_image} alt={game.name} style={{maxWidth: '300px'}} />
      <p><strong>Released:</strong> {game.released}</p>
      <p><strong>Rating:</strong> {game.rating}</p>
      <p><strong>Platforms:</strong> {game.platforms && game.platforms.join(', ')}</p>
      <p><strong>Genres:</strong> {game.genres && game.genres.join(', ')}</p>
      
    </div>
  );
}

export default GameDetails;
