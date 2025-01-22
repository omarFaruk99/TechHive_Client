import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Products = () => {
  const { user } = useAuth();
  const [products, refetch] = useProduct();
  const axiosPublic = useAxiosPublic();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Sort products by timestamp (latest first) and get the first 4 featured products
    const sortedProducts = products.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    setFeaturedProducts(sortedProducts.slice(0, 4));
  }, [products]);

  const handleUpvote = async (productId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Implement the upvote logic here
    // Ensure the user can only upvote once and the button is disabled for the product owner
    try {
      const response = await axiosPublic.post(`/products/${productId}/upvote`, {
        email: user?.email,
      });
      if (response.status === 200) {
        refetch(); // Refetch products to update the upvote count
      }
    } catch (error) {
      console.error("Error upvoting product:", error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
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

export default Products;
