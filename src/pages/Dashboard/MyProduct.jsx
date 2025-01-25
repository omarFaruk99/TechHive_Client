import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from 'react-router-dom';

const MyProduct = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: userProducts = [], refetch } = useQuery({
    queryKey: ["userProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products?email=${user.email}`);
      console.log(`user data${user.email}=====>`, res);
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
            console.error("Error deleting product: ", error);
          });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto mt-5">
      <h2 className="flex justify-center mb-4 text-3xl font-semibold">
        Total Products:{userProducts.length}{" "}
      </h2>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>ProductName</th>
              <th>#ofVotes</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userProducts.map((userProduct, index) => (
              <tr key={userProduct._id}>
                <th>{index + 1}</th>
                <td>{userProduct.productName}</td>
                <td>{userProduct.upvotes}</td>
                <td>
                  <p>Pending</p>
                </td>
                <td>
                  {/* update userProduct button */}
                  <button onClick={() => handleUpdateProduct(userProduct)}>
                    <GrUpdate color="blue" />
                  </button>
                </td>
                <td>
                  {/* delete userProduct button */}
                  <button onClick={() => handleDeleteProduct(userProduct)}>
                    <MdDelete size={25} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProduct;
