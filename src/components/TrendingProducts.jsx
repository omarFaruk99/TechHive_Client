import { useNavigate } from "react-router-dom";

const TrendingProducts = ({ products, handleUpvote, user }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Trending Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3
                onClick={() => navigate(`/product/${product._id}`)}
                className="text-lg font-semibold cursor-pointer hover:underline"
              >
                {product.productName}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleUpvote(product._id)}
                disabled={user?.email === product.owner.email}
                className={`mt-4 w-full py-2 px-4 rounded ${
                  user?.email === product.owner.email
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
              >
                <span className="mr-2">👍</span> {product.upvotes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
