import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrash, FaEye } from "react-icons/fa";

const ReportedContent = () => {
  const [reportedProducts, setReportedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchReportedProducts = async () => {
      try {
        const response = await axiosSecure.get("/reported-products");
        console.log("Received products:", response.data); // For debugging
        setReportedProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch reported products", error);
        Swal.fire("Error", "Failed to fetch reported products", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchReportedProducts();
  }, [axiosSecure]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/products/${id}`);
        setReportedProducts((products) =>
          products.filter((product) => product._id !== id)
        );
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire("Error", "Failed to delete product", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <h2 className="text-3xl font-bold mb-6 p-6 text-gray-800">
          Reported Products{" "}
          <span className="text-accent">({reportedProducts.length})</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-gray-700 to-accentDark">
              <tr>
                <th className="px-6 py-4 text-white font-semibold text-left">#</th>
                <th className="px-6 py-4 text-white font-semibold text-left">Product Name</th>
                <th className="px-6 py-4 text-white font-semibold text-center">Report Count</th>
                <th className="px-6 py-4 text-white font-semibold text-center">Status</th>
                <th className="px-6 py-4 text-white font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportedProducts.map((product, index) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="text-sm md:text-base font-medium text-gray-700">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm md:text-base font-medium text-gray-700">
                      {product.productName}
                    </div>
                    <div className="md:hidden mt-2 space-y-1">
                      <div className="text-sm text-gray-500 mb-1">
                        #{index + 1}
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        Reports: {product.reports}
                      </span>
                      <span className={`inline-flex ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      {product.reports}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 justify-center">
                      <Link
                        to={`/product/${product._id}`}
                        className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accentDark transition-colors"
                      >
                        <FaEye className="mr-2 inline" /> View
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <FaTrash className="mr-2 inline" /> Delete
                      </button>
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

export default ReportedContent;
