import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { WithContext as ReactTags } from "react-tag-input";

const UpdateProduct = () => {
  const product = useLoaderData();
  const [tags, setTags] = useState([]);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      productName: product.productName,
      description: product.description,
      link: product.link,
    }
  });
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Initialize tags from product data
  useEffect(() => {
    if (product.tags) {
      const formattedTags = product.tags.map(tag => ({
        id: tag,
        text: tag
      }));
      setTags(formattedTags);
    }
  }, [product.tags]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        tags: tags.map(tag => tag.text)  // Convert tags to the same format as AddProduct
      };

      const res = await axiosSecure.patch(`/products/${product._id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Product Updated Successfully",
          icon: "success",
        });
        navigate('/dashboard/myProduct');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-11/12 mx-auto mt-8">
      <h2 className="text-3xl font-semibold text-center mb-8">Update Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            type="text"
            {...register("productName")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Tags</span>
          </label>
          <ReactTags
            tags={tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            inputFieldPosition="bottom"
            autocomplete
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">External Link</span>
          </label>
          <input
            type="text"
            {...register("link")}
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
