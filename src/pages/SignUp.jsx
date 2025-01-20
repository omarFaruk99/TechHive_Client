import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SocialLogin from "./SocialLogin";
// import AuthContext from "../provider/AuthContext";
// import useAxiosPublic from "../Hook/useAxiosPublic";
// import SocialLogin from "../Compenents/SocialLogin";

const SignUp = () => {
  // Auth context for user creation and profile update
  const { createUser, updateUserProfile } = useAuth();
  // Loading state to handle form submission
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();

  // Initialize react-hook-form with watch to compare passwords
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const handleSignUp = async (data) => {
    try {
      setLoading(true);

      // Create user account
      await createUser(data.email, data.password);
      // Update user profile with name and photo
      await updateUserProfile(data.name, data.photoUrl);

      const userInfo = {
        name: data.name,
        email: data.email,
        photoUrl: data.photoUrl,
      };

      // save signup user data into database
      axiosPublic
        .post("/users", userInfo)
        .then((res) => {
          // console.log(res);
        })
        .catch((error) => {
          // console.log(error);
        });

      toast.success("Account created successfully!");
      reset(); // Clear form
      navigate("/"); // Redirect to home
    } catch (error) {
      // Show specific error message or fallback to generic one
      const errorMessage = error?.message || "Failed to create account";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content w-full flex-col lg:flex-row-reverse">
        <div className="card order-first bg-white border border-gray-200 md:w-1/2 lg:w-1/3 max-w-sm shadow-2xl">
          <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
            <h2 className="text-center text-xl font-semibold mb-4">Sign Up</h2>

            {/* Loading spinner */}
            {loading && (
              <div className="flex justify-center my-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              </div>
            )}

            {/* Name field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                type="text"
                placeholder="Enter your name"
                className="input input-bordered"
                disabled={loading}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Photo URL field - Added validation for URL format */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                {...register("photoUrl", {
                  required: "Photo URL is required",
                  pattern: {
                    value:
                      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                    message: "Please enter a valid URL",
                  },
                })}
                type="text"
                placeholder="Enter photo URL"
                className="input input-bordered"
                disabled={loading}
              />
              {errors.photoUrl && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.photoUrl.message}
                </span>
              )}
            </div>

            {/* Email field - Existing validation */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                disabled={loading}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password field - Enhanced validation */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    message:
                      "Password must include uppercase, lowercase, number and special character",
                  },
                })}
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                disabled={loading}
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* New: Confirm Password field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  //   Validate matching passwords
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered"
                disabled={loading}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Submit button with loading state */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </div>
          </form>
          {/* Login with social account */}
          <SocialLogin></SocialLogin>
          {/* Login link */}
          <p className="text-center pb-2">
            Already have an account?
            <Link to="/login" className="text-primary ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
