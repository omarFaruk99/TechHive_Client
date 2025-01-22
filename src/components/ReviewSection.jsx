const ReviewSection = ({ reviews }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-4">
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{review.reviewerName}</h3>
                <p className="text-sm text-gray-600">{review.rating} stars</p>
              </div>
            </div>
            <p className="text-gray-800">{review.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
