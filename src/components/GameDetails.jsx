import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Comments from './Comments';
import './GameDetails.css';
import ExternalLinks from './ExternalLinks';

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If game data is passed from a Link, use it directly.
    if (state && state.game) {
      setGame(state.game);
      setLoading(false);
    } else {
      // Otherwise, fetch the data as a fallback.
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
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id, state]);

  if (loading) return <p className="gd-loading">Loading...</p>;
  if (error) return <p className="gd-error">Error: {error}</p>;
  if (!game) return <p className="gd-notfound">Game not found.</p>;

  return (
    <div className="game-details">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="back-link"
      >
        ← Back
      </button>
      <div className="details-card">
        <div className="hero">
          {game.background_image ? (
            <img src={game.background_image} alt={game.name} className="hero-img" />
          ) : null}
        </div>
        <div className="details-body">
          <h1 className="game-title">{game.name}</h1>
          <div className="meta-row">
            <span className="meta-item"><strong>Released:</strong> {game.released || '—'}</span>
            <span className="meta-item"><strong>Rating:</strong> {typeof game.rating === 'number' && game.rating > 0 ? `${game.rating}/5` : 'No rating'}</span>
            <span className="meta-item"><strong>ID:</strong> {game.id}</span>
          </div>

          {game.genres && game.genres.length > 0 && (
            <div className="badges">
              {game.genres.map(g => (
                <span key={g} className="badge genre">{g}</span>
              ))}
            </div>
          )}

          {game.platforms && game.platforms.length > 0 && (
            <div className="badges platforms">
              {game.platforms.map(p => (
                <span key={p} className="badge platform">{p}</span>
              ))}
            </div>
          )}

          <div className="description">
            <h3>Full JSON</h3>
            <details>
              <summary>Show raw data</summary>
              <pre className="raw-json">{JSON.stringify(game, null, 2)}</pre>
            </details>
          </div>

          <ExternalLinks gameName={game.name} />

          <Comments gameId={id} />
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
