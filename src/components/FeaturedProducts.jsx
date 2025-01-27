import { useNavigate } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";

const FeaturedProducts = ({ products, handleUpvote, user }) => {
  const navigate = useNavigate();

  return (
    <>
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 transform hover:-translate-y-2 border border-gray-700"
        >
          <div className="relative group">
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-48 object-cover transform transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity"></div>
          </div>
          <div className="p-5">
            <h3
              onClick={() => navigate(`/product/${product._id}`)}
              className="text-xl font-semibold text-white cursor-pointer hover:text-accent transition-colors"
            >
              {product.productName}
            </h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-accent text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => handleUpvote(product._id)}
              disabled={user?.email === product.owner.email}
              className={`mt-4 rounded btn-xs ${
                user?.email === product.owner.email
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-accent text-white"
              }`}
            >
              <span className="flex justify-center items-center gap-1">
                <FaChevronUp size={20} /> {product.upvotes}
              </span>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedProducts;
