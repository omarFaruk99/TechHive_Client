import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const MyProduct = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: userProducts = [], refetch } = useQuery({
    queryKey: ["userProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products?email=${user.email}`);
      // console.log(`user data${user.email}=====>`, res);
      return res.data;
    },
  });

  const handleUpdateProduct = (userProduct) => {
    navigate(`/dashboard/updateProduct/${userProduct._id}`);
  };

  const handleDeleteProduct = (userProduct) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/products/${userProduct._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: `${userProduct.productName} has been deleted.`,
                icon: "success",
              });
            }
          })
          .catch((error) => {
            // console.error("Error deleting product: ", error);
          });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto mt-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        My Products ({userProducts.length})
      </h2>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
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
                  Votes
                </th>
                <th className="px-6 py-4 text-white font-semibold text-center">
                  Status
                </th>
                <th className="px-6 py-4 text-white font-semibold text-center">
                  Update
                </th>
                <th className="px-6 py-4 text-white font-semibold text-center">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userProducts.map((userProduct, index) => (
                <tr
                  key={userProduct._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 font-medium py-4 text-gray-800">
                    {userProduct.productName}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                      {userProduct.upvotes}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full font-medium ${
                        userProduct.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : userProduct.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {userProduct.status || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleUpdateProduct(userProduct)}
                      className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                      title="Update"
                    >
                      <GrUpdate className="text-blue-600" size={18} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteProduct(userProduct)}
                      className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                      title="Delete"
                    >
                      <MdDelete className="text-red-600" size={18} />
                    </button>
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

export default MyProduct;
