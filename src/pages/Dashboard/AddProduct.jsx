import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { WithContext as ReactTags } from "react-tag-input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_Image_Upload_Api_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);

  const formik = useFormik({
    initialValues: {
      productName: "",
      description: "",
      externalLink: "",
      productImage: null,
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Product Name is required"),
      description: Yup.string().required("Description is required"),
      productImage: Yup.mixed().required("Product Image is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("image", values.productImage);

      try {
        const res = await axiosPublic.post(image_hosting_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const imageUrl = res.data.data.url;

        const productData = {
          ...values,
          productImage: imageUrl,
          owner: {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
          },
          tags: tags.map((tag) => tag.text),
          // timestamp: new Date(),
        };

        const productRes = await axiosSecure.post("/products", productData);
        if (productRes.data.insertedId) {
          toast.success("Product added successfully!");
          navigate("/dashboard/myproduct");
        } else {
          throw new Error("Failed to add product");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to add product");
      }
    },
  });

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.productName}
              className="w-full px-3 py-2 border rounded"
            />
            {formik.touched.productName && formik.errors.productName ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.productName}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="w-full px-3 py-2 border rounded"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Owner Name
            </label>
            <input
              type="text"
              value={user?.displayName}
              disabled
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Owner Image
            </label>
            <input
              type="text"
              value={user?.photoURL}
              disabled
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Owner Email
            </label>
            <input
              type="text"
              value={user?.email}
              disabled
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Tags</label>
            <ReactTags
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              inputFieldPosition="bottom"
              autocomplete
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              External Link
            </label>
            <input
              type="text"
              name="externalLink"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.externalLink}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Product Image
            </label>
            <input
              type="file"
              name="productImage"
              onChange={(event) => {
                formik.setFieldValue(
                  "productImage",
                  event.currentTarget.files[0]
                );
              }}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded"
            />
            {formik.touched.productImage && formik.errors.productImage ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.productImage}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="bg-accent text-white px-4 py-2 rounded hover:bg-accentDark"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
