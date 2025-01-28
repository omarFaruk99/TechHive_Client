import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import ProductDetailsSection from "../components/ProductDetailsSection";
import ReviewSection from "../components/ReviewSection";
import PostReviewSection from "../components/PostReviewSection";
import useProduct from "../hooks/useProduct";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [, refetch] = useProduct();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Fetch product data when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosSecure.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        toast.error("Failed to load product", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch reviews when component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosSecure.get(`/products/${id}/reviews`);
        setReviews(response.data);
      } catch (error) {
        toast.error("Failed to load reviews", error);
      }
    };

    fetchReviews();
  }, [id]);

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

  const handleReport = async () => {
    try {
      await axiosSecure.post(`/products/${id}/report`);
      toast.success("Product reported successfully");
    } catch (error) {
      toast.error("Failed to report product", error);
    }
  };

  const handlePostReview = async (reviewData) => {
    try {
      await axiosSecure.post(`/products/${id}/reviews`, reviewData);
      toast.success("Review posted successfully");
        setReviews((prevReviews) => [...prevReviews, reviewData]);
    //   setReviews(reviewData);
    } catch (error) {
      toast.error("Failed to post review", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {product && (
        <ProductDetailsSection
          product={product}
          user={user}
          onUpvote={handleUpvote}
          onReport={handleReport}
        />
      )}
      <ReviewSection reviews={reviews} />
      {user && (
        <PostReviewSection user={user} onPostReview={handlePostReview} />
      )}
    </div>
  );
};

export default ProductDetails;
