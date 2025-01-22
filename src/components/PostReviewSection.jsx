import { useState } from "react";

const PostReviewSection = ({ user, onPostReview }) => {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      description,
      rating,
    };
    onPostReview(reviewData);
    setDescription("");
    setRating(0);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Post a Review</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Reviewer Name
          </label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Reviewer Image
          </label>
          <input
            type="text"
            value={user.photoURL}
            readOnly
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Review Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Rating</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            min="1"
            max="5"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-accent text-white px-4 py-2 rounded hover:bg-accentDark"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostReviewSection;
