import React, { useEffect, useState } from 'react';
import './Comments.css';

function Comments({ gameId }) {
  const [comments, setComments] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [newReview, setNewReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // On component mount, load comments from localStorage for the current game.
  useEffect(() => {
    try {
      const storedComments = localStorage.getItem(`comments-${gameId}`);
      if (storedComments) {
        setComments(JSON.parse(storedComments));
      }
    } catch (error) {
      console.error("Failed to parse comments from localStorage", error);
      setComments([]);
    }
  }, [gameId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newComment = {
      rating: newRating,
      review: newReview,
      // In a real app, the API would provide the ID and timestamp
      id: Date.now(),
      posted: new Date().toISOString(),
    };

    // Add the new comment to the list and save to localStorage.
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`comments-${gameId}`, JSON.stringify(updatedComments));
    setNewReview('');
    setNewRating(5);
    setIsSubmitting(false);
  };

  return (
    <div className="comments-section">
      <h2>Leave a Review</h2>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <div className="form-group form-group-rating">
          <label htmlFor="rating">Rating</label>
          <select id="rating" value={newRating} onChange={(e) => setNewRating(Number(e.target.value))} required>
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="What did you think of the game?"
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>

      <div className="comments-list">
        {comments.length > 0 && <h3 className="reviews-title">Reviews</h3>}
        {comments.length === 0 ? (
          <p className="no-reviews-message">Be the first to leave a review!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment">
              <p className="comment-rating">{'★'.repeat(comment.rating) + '☆'.repeat(5 - comment.rating)}</p>
              <p className="comment-review">{comment.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Comments;