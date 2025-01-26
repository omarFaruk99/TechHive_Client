import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ProductRevieQueue = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { data: products = [], refetch } = useQuery({
    queryKey: ["review-queue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/review-queue");
      return res.data;
    },
  });

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  const handleFeature = async (id, featured) => {
    try {
      setLoading(true);
      await axiosSecure.patch(`/products/${id}/featured`, {
        featured: !featured,
      });
      toast.success("Product featured status updated!");
      refetch();
    } catch (error) {
      toast.error("Failed to update featured status");
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      await axiosSecure.patch(`/products/${id}/status`, { status: newStatus });
      toast.success(`Product ${newStatus} successfully!`);
      refetch();
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  if (!products?.length) {
    return (
      <div className="w-11/12 mx-auto mt-8">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <p className="text-gray-500 text-lg">No products found in review queue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <h2 className="text-3xl font-bold mb-6 p-6 text-gray-800">
          Product Review Queue<span className="text-accent">({products.length})</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-gray-700 to-accentDark">
              <tr>
                <th className="px-6 py-4 text-white font-semibold text-left">
                  #
                </th>
                <th className="px-6 py-4 text-white font-semibold text-left">
                  Product Name
                </th>
                <th className="px-6 py-4 text-white font-semibold text-center">
                  Actions
                </th>
                <th className="px-6 py-4 text-white font-semibold text-center">
                  Status Controls
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {product.productName}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => handleViewDetails(product._id)}
                        className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accentDark transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() =>
                          handleFeature(product._id, product.featured)
                        }
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          product.featured
                            ? "bg-amber-500 hover:bg-amber-600 text-white"
                            : "bg-teal-500 hover:bg-teal-600 text-white"
                        }`}
                        disabled={loading}
                      >
                        {product.featured ? "Remove Featured" : "Make Featured"}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 items-center justify-center">
                      <button
                        onClick={() => handleStatus(product._id, "accepted")}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          product.status === "accepted"
                            ? "bg-green-100 text-green-700 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                        disabled={loading || product.status === "accepted"}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatus(product._id, "rejected")}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          product.status === "rejected"
                            ? "bg-red-100 text-red-700 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                        disabled={loading || product.status === "rejected"}
                      >
                        Reject
                      </button>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : product.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {product.status || "pending"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductRevieQueue;
