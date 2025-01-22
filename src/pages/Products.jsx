import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";

import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import { toast } from "react-toastify";

const Products = () => {
  const { user } = useAuth();
  const [products, refetch] = useProduct();
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    // Sort products by timestamp (latest first) and get the first 4 featured products
    const sortedProducts = products.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    setFeaturedProducts(sortedProducts.slice(0, 4));

    // sort products by upvotes (highest first) and get the first 6 trending products
    const trendingSortedProducts = products.sort(
      (a, b) => b.upvotes - a.upvotes
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
        console.error("Error upvoting product:", error.response.data.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <FeaturedProducts
        products={featuredProducts}
        handleUpvote={handleUpvote}
        user={user}
      />
      <TrendingProducts
        products={trendingProducts}
        handleUpvote={handleUpvote}
        user={user}
      />
    </div>
  );
};

export default Products;
