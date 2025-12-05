import React from 'react';
import './FilterControls.css';

function FilterControls({ minRating, onMinRatingChange, sortBy, onSortByChange, tags, selectedTags, onToggleTag }) {
  return (
    <div className="filter-controls">
      <div className="filter-row">
        <label className="filter-label">Min Rating</label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={minRating}
          onChange={e => onMinRatingChange(parseFloat(e.target.value))}
        />
        <span className="filter-value">{minRating.toFixed(1)}</span>
      </div>

      <div className="filter-row">
        <label className="filter-label">Sort By</label>
        <select value={sortBy} onChange={e => onSortByChange(e.target.value)}>
          <option value="rating-desc">Rating (high → low)</option>
          <option value="rating-asc">Rating (low → high)</option>
          <option value="released-desc">Released (new → old)</option>
          <option value="released-asc">Released (old → new)</option>
        </select>
      </div>

      <div className="filter-row tags-row">
        <label className="filter-label">Genres</label>
        <div className="tags-list">
          {tags.map(tag => (
            <button
              key={tag}
              type="button"
              className={`tag-button ${selectedTags.has(tag) ? 'selected' : ''}`}
              onClick={() => onToggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterControls;
