import React from 'react';
import './ExternalLinks.css';

function ExternalLinks({ gameName }) {
  if (!gameName) {
    return null;
  }

  const wikipediaUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(gameName)}`;
  const ebayUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(gameName)} game`;

  return (
    <div className="external-links-container">
      <h3>Find Out More</h3>
      <div className="external-links-list">
        <a href={wikipediaUrl} target="_blank" rel="noopener noreferrer" className="external-link wikipedia">
          Read on Wikipedia
        </a>
        <a href={ebayUrl} target="_blank" rel="noopener noreferrer" className="external-link ebay">
          Shop on eBay
        </a>
      </div>
    </div>
  );
}

export default ExternalLinks;