import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
/*
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
*/

// import SocialLogin from "../Compenents/SocialLogin";
import useAuth from "../hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Login = () => {
  // Context and state
  const { signInUser } = useAuth();
  const [loading, setLoading] = useState(false);
  // const [disableLogin, setDisableLogin] = useState(true);
  // const captchaRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path or default to home
  const from = location.state?.from?.pathname || "/";

  // Initialize form with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Load captcha on mount
  /*
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  */

  // Enhanced captcha validation
  /*
  const handleValidateCaptcha = () => {
    const userCaptchaValue = captchaRef.current.value;

    if (!userCaptchaValue) {
      toast.error("Please enter captcha");
      return;
    }

    if (validateCaptcha(userCaptchaValue)) {
      setDisableLogin(false);
      toast.success("Captcha validated!");
    } else {
      setDisableLogin(true);
      toast.error("Invalid captcha, try again");
    }
  };
  */

  // Enhanced form submission
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Validate captcha again before submission
      /*
      if (disableLogin) {
        toast.error("Please validate captcha first");
        return;
      }
      */

      await signInUser(data.email, data.password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error?.message || "Login failed");
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-center text-2xl font-bold text-white mb-8">
              Login
            </h2>

            {/* Loading spinner */}
            {loading && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}

            {/* Email field */}
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
                <p className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
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
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Captcha section */}
            {/*
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/90 mb-1">
                Captcha Verification
              </label>
              <div className="bg-white/20 p-2 rounded-lg">
                <LoadCanvasTemplate />
              </div>
              <input
                type="text"
                ref={captchaRef}
                placeholder="Type the captcha above"
                className="w-full px-4 py-2.5 rounded-lg border border-white/10 
                bg-white/10 text-white placeholder-white/50
                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition duration-200 backdrop-blur-sm"
                disabled={loading}
              />
              <button
                type="button"
                onClick={handleValidateCaptcha}
                className="w-full px-4 py-2 rounded-lg text-white/90 text-sm font-medium
                bg-white/10 hover:bg-white/20
                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                transition duration-200 disabled:opacity-50"
                disabled={loading}
              >
                Validate Captcha
              </button>
            </div>
            */}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg text-white font-medium
              bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600
              focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
              transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              shadow-lg shadow-purple-500/30"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Social login */}
          <div className="mt-6">
            <div className="mt-6">
              <SocialLogin />
            </div>
          </div>

          {/* Sign up link */}
          <p className="mt-4 text-center text-sm text-white/70">
            New here?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
