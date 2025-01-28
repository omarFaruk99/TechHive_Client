import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FeaturedProducts from "../../components/FeaturedProducts";
import TrendingProducts from "../../components/TrendingProducts";
import useAuth from "../../hooks/useAuth";
import useProduct from "../../hooks/useProduct";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FeaturedTrendingProducts = () => {
  const { user } = useAuth();
  const [products, refetch] = useProduct();
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    // Sort products by timestamp (latest first) and get the first 4 featured products
    const sortedProducts = [...products]
      .filter((product) => product.featured === true)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setFeaturedProducts(sortedProducts.slice(0, 4));

    // Sort products by upvotes (highest first) and get the first 6 trending products
    const trendingSortedProducts = [...products].sort(
      (a, b) => (b.upvotes || 0) - (a.upvotes || 0)
    );
    setTrendingProducts(trendingSortedProducts.slice(0, 6));
  }, [products]);

  const handleUpvote = async (productId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const response = await axiosSecure.post(`/products/${productId}/upvote`);
      if (response.status === 200) {
        refetch(); // Refetch products to update the upvote count
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast("You have already upvoted this product", {
          position: "top-center",
        });
      } else {
        // console.error("Error upvoting product:", error.response.data.message);
      }
    }
  };

  return (
    <div className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Featured Products Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-3 relative inline-block">
              Featured Products
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-accent"></span>
            </h2>
            <p className="text-gray-400 mt-6">
              Discover our latest tech innovations
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <FeaturedProducts
              products={featuredProducts}
              handleUpvote={handleUpvote}
              user={user}
            />
          </div>
        </div>

        {/* Trending Products Section */}
        <div className="relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-3 relative inline-block">
              Trending Products
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-accent"></span>
            </h2>
            <p className="text-gray-400 mt-6">
              Most popular among our community
            </p>
          </div>
          <TrendingProducts
            products={trendingProducts}
            handleUpvote={handleUpvote}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedTrendingProducts;
