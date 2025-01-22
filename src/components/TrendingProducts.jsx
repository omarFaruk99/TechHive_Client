import { FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TrendingProducts = ({ products, handleUpvote, user }) => {
  const navigate = useNavigate();

  return (
    <div className="my-7">
      <h2 className="text-2xl font-bold mb-4">Trending Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
          >
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3
                onClick={() => navigate(`/product/${product._id}`)}
                className="text-lg font-semibold cursor-pointer hover:text-accent transition-colors"
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
                className={`mt-4  rounded btn-xs ${
                  user?.email === product.owner.email
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-accent text-white"
                }`}
              >
                <span className="flex justify-center items-center gap-1 ">
                  <FaChevronUp size={20} /> {product.upvotes}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/products")}
        className="mt-6 px-4 py-2 bg-accent text-white rounded hover:bg-accentDark"
      >
        Show All Products
      </button>
    </div>
  );
};

export default TrendingProducts;
