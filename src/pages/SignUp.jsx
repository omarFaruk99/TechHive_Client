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
      const result = await createUser(data.email, data.password);

      // Check if user creation was successful
      if (!result.user) {
        throw new Error("Failed to create user");
      }

      // Update user profile with name and photo
      await updateUserProfile(data.name, data.photoUrl);

      const userInfo = {
        name: data.name,
        email: data.email,
        photoUrl: data.photoUrl,
      };

      // save signup user data into database
      await axiosPublic.post("/users", userInfo);

      toast.success("Account created successfully!");
      reset(); // Clear form
      navigate("/"); // Direct navigation to home
    } catch (error) {
      // Show specific error message or fallback to generic one
      const errorMessage = error?.message || "Failed to create account";
      toast.error(errorMessage);
      // Removed the navigation to login page
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background design elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"></div>
      </div>

      <div className="flex justify-center items-center relative z-10">
        <div className="card w-full md:w-[450px] backdrop-blur-xl bg-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6">
            <h2 className="text-center text-2xl font-bold text-white mb-8">
              Create Account
            </h2>

            {/* Loading spinner */}
            {loading && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}

            {/* Form fields with updated styling */}
            <div className="space-y-4">
              {/* Name field */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">
                  Name
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
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 
                  bg-white/10 text-white placeholder-white/50
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  transition duration-200 backdrop-blur-sm"
                  disabled={loading}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Photo URL field - Added validation for URL format */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">
                  Photo URL
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
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 
                  bg-white/10 text-white placeholder-white/50
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  transition duration-200 backdrop-blur-sm"
                  disabled={loading}
                />
                {errors.photoUrl && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.photoUrl.message}
                  </p>
                )}
              </div>

              {/* Email field - Existing validation */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">
                  Email
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
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 
                  bg-white/10 text-white placeholder-white/50
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  transition duration-200 backdrop-blur-sm"
                  disabled={loading}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password field - Enhanced validation */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">
                  Password
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
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 
                  bg-white/10 text-white placeholder-white/50
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  transition duration-200 backdrop-blur-sm"
                  disabled={loading}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* New: Confirm Password field */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">
                  Confirm Password
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
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 
                  bg-white/10 text-white placeholder-white/50
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  transition duration-200 backdrop-blur-sm"
                  disabled={loading}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit button with updated styling */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg text-white font-medium
                bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600
                focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                shadow-lg shadow-purple-500/30"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Social login divider */}
          <div className="mt-6">
            <div className="relative">
            </div>

            <div className="mt-6">
              <SocialLogin />
            </div>
          </div>

          {/* Login link */}
          <p className="mt-4 text-center text-sm text-white/70">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
