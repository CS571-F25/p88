import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const platformMap = {
  nes: 'NES',
  snes: 'SNES',
  playstation: 'PlayStation',
};

function ConsoleGames() {
  const { console } = useParams();
  const [games, setGames] = useState([]);
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
        const platform = platformMap[console];
        if (platform) {
          const filtered = data.filter(game =>
            game.platforms && game.platforms.some(p => p.toLowerCase() === platform.toLowerCase())
          );
          setGames(filtered);
        } else {
          setGames([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [console]);

  return (
    <div>
      <h2>{platformMap[console] || 'Console'} Games</h2>
      {loading && <p>Loading games...</p>}
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      {!loading && !error && (
        games.length > 0 ? (
          <ul>
            {games.map(game => (
              <li key={game.id}>
                <Link to={`/game/${game.id}`}>{game.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No games found for this console.</p>
        )
      )}
    </div>
  );
}

export default ConsoleGames;
