import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import GameItem from './GameItem';
import FilterControls from './FilterControls';
import './ConsoleGames.css';
import './FilterControls.css';

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
  // filter state
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating-desc');
  const [selectedTags, setSelectedTags] = useState(new Set());

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

  // derive available tags (genres) from current games
  const genres = useMemo(() => {
    const s = new Set();
    games.forEach(g => {
      if (g.genres && Array.isArray(g.genres)) g.genres.forEach(t => s.add(t));
    });
    return Array.from(s).sort();
  }, [games]);

  const toggleTag = tag => {
    setSelectedTags(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const filteredAndSorted = useMemo(() => {
    let out = games.slice();
    // filter by rating
    out = out.filter(g => (typeof g.rating === 'number' ? g.rating >= minRating : true));
    // filter by selected tags
    if (selectedTags.size > 0) {
      out = out.filter(g => g.genres && g.genres.some(t => selectedTags.has(t)));
    }
    // sort
    out.sort((a, b) => {
      if (sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'rating-asc') return (a.rating || 0) - (b.rating || 0);
      if (sortBy === 'released-desc') return (new Date(b.released || 0)) - (new Date(a.released || 0));
      if (sortBy === 'released-asc') return (new Date(a.released || 0)) - (new Date(b.released || 0));
      return 0;
    });
    return out;
  }, [games, minRating, selectedTags, sortBy]);

  return (
    <div className="console-games-container">
      <h2 className="console-title">{platformMap[console] || 'Console'} Games</h2>
      {loading && <p className="loading-message">Loading games...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {!loading && !error && (
        games.length > 0 ? (
          <>
            <FilterControls
              minRating={minRating}
              onMinRatingChange={setMinRating}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              tags={genres}
              selectedTags={selectedTags}
              onToggleTag={toggleTag}
            />
            {filteredAndSorted.length > 0 ? (
              <div className="games-grid">
                {filteredAndSorted.map(game => (
                  <GameItem key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <p className="no-games-message">No games match the current filters.</p>
            )}
          </>
        ) : (
          <p className="no-games-message">No games found for this console.</p>
        )
      )}
    </div>
  );
}

export default ConsoleGames;
