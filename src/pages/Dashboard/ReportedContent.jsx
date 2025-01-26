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
    <div className="p-2 md:p-4 lg:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-3 md:p-4 lg:p-6">
        <div className="flex justify-between items-center mb-4 md:mb-6 lg:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
            Reported Products{" "}
            <span className="text-accent">({reportedProducts.length})</span>
          </h2>
        </div>

        <div className="overflow-x-auto -mx-3 md:-mx-4 lg:-mx-6">
          {reportedProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                No reported products found
              </p>
            </div>
          ) : (
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-3 md:px-4 lg:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider w-16">
                      SL
                    </th>
                    <th className="px-3 md:px-4 lg:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider w-full md:w-1/4">
                      Product Name
                    </th>
                    <th className="hidden md:table-cell px-4 lg:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider md:w-1/4">
                      Report Count
                    </th>
                    <th className="hidden md:table-cell px-4 lg:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider md:w-1/4">
                      Status
                    </th>
                    <th className="px-3 md:px-4 lg:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider md:w-1/4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportedProducts.map((product, index) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 md:px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm md:text-base font-medium text-gray-700">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-3 md:px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm md:text-base font-medium text-gray-700">
                          {product.productName}
                        </div>
                        {/* Mobile-only info */}
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
                      <td className="hidden md:table-cell px-4 lg:px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                          {product.reports}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-4 lg:px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          product.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-3 md:px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col md:flex-row gap-2 md:gap-3">
                          <Link
                            to={`/product/${product._id}`}
                            className="inline-flex justify-center items-center px-2 md:px-3 py-1 bg-accent text-white text-xs md:text-sm rounded-md hover:bg-blue-600 transition-colors"
                          >
                            <FaEye className="mr-1 md:mr-2" /> View
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="inline-flex justify-center items-center px-2 md:px-3 py-1 bg-red-500 text-white text-xs md:text-sm rounded-md hover:bg-red-600 transition-colors"
                          >
                            <FaTrash className="mr-1 md:mr-2" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportedContent;
