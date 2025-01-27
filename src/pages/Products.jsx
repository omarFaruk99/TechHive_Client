import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import LoadingSpinner from "../components/LoadingSpinner";
import { useState, useEffect } from "react";

const Products = () => {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search term
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setDebouncedSearch(searchTerm);
  //   }, 500); // Wait 500ms after last keystroke before searching

  //   return () => clearTimeout(timeoutId);
  // }, [searchTerm]);

  const { data: products = [], isLoading } = useQuery({
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Featured Products
        </h2>
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
                className="btn btn-primary absolute top-0 right-0 rounded-l-none"
                onClick={() => setDebouncedSearch(searchTerm)}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={product.productImage}
                alt={product.productName}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.productName}</h2>
              <p>{product.description.slice(0, 100)}...</p>
              <div className="flex flex-wrap gap-2 my-2">
                {product.tags.map((tag, idx) => (
                  <span key={idx} className="badge badge-outline">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="badge badge-primary">
                  👍 {product.upvotes}
                </span>
                <div className="card-actions">
                  <a
                    href={product.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Visit Site
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No products found matching your search.
        </div>
      )}
    </div>
  );
};

export default Products;
