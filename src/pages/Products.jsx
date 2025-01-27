import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import LoadingSpinner from "../components/LoadingSpinner";
import { useState, useEffect } from "react";
import FeaturedProducts from "../components/FeaturedProducts";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const Products = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Debounce search term
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setDebouncedSearch(searchTerm);
  //   }, 500); // Wait 500ms after last keystroke before searching

  //   return () => clearTimeout(timeoutId);
  // }, [searchTerm]);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", debouncedSearch],
    // enabled: !!debouncedSearch,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/products${debouncedSearch ? `?searchTag=${debouncedSearch}` : ""}`
      );
      // setDebouncedSearch("");
      return res.data;
    },
  });

  const pageCount = Math.ceil(products.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentProducts = products.slice(offset, offset + itemsPerPage);

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

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-center">
          <div className="form-control w-full max-w-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products by tags..."
                className="input input-bordered w-full pr-16"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn bg-accent text-black hover:bg-accentDark absolute top-0 right-0 rounded-l-none"
                onClick={() => setDebouncedSearch(searchTerm)}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeaturedProducts
            products={currentProducts}
            handleUpvote={handleUpvote}
            user={user}
          ></FeaturedProducts>
        </div>
      }

      {products.length > 0 && (
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center gap-2 mt-8"}
          previousLinkClassName={"btn btn-primary btn-sm"}
          nextLinkClassName={"btn btn-primary btn-sm"}
          pageClassName={"btn btn-ghost btn-sm"}
          pageLinkClassName={"px-3 py-1"}
          activeClassName={"btn-active"}
          disabledClassName={"btn-disabled"}
        />
      )}

      {products.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No products found matching your search.
        </div>
      )}
    </div>
  );
};

export default Products;
