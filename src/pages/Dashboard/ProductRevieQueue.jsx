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
    return <div>No products found</div>;
  }

  return (
    <div className="w-11/12 mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Product Review Queue</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Actions</th>
              <th>Status Controls</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.productName}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(product._id)}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleFeature(product._id, product.featured)}
                    className="btn btn-sm btn-secondary"
                    disabled={loading}
                  >
                    {product.featured ? "Remove Featured" : "Make Featured"}
                  </button>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatus(product._id, "accepted")}
                      className="btn btn-sm btn-success"
                      disabled={loading || product.status === "accepted"}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatus(product._id, "rejected")}
                      className="btn btn-sm btn-error"
                      disabled={loading || product.status === "rejected"}
                    >
                      Reject
                    </button>
                    <span className="badge badge-ghost">{product.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductRevieQueue;
