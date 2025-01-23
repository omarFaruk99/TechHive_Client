import { FaChevronUp } from "react-icons/fa";

const ProductDetailsSection = ({ product, onUpvote, onReport, user }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={product.productImage}
            alt={product.productName}
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => onUpvote(product._id)}
              disabled={user?.email === product.owner.email}
              className={`rounded-lg btn-sm ${
                user?.email === product.owner.email
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-accent text-white"
              }`}
            >
              <span className="flex justify-center items-center gap-1 ">
                <FaChevronUp size={20} /> {product.upvotes}
              </span>
            </button>

            <button onClick={onReport} className="btn btn-sm btn-warning">
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
