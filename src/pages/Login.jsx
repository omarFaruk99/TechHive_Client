import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

// import SocialLogin from "../Compenents/SocialLogin";
import useAuth from "../hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Login = () => {
  // Context and state
  const { signInUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [disableLogin, setDisableLogin] = useState(true);
  const captchaRef = useRef(null);
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
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  // Enhanced captcha validation
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

  // Enhanced form submission
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Validate captcha again before submission
      if (disableLogin) {
        toast.error("Please validate captcha first");
        return;
      }

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
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-full flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body -mb-5">
            <h2 className="text-center text-2xl font-bold mb-4">Login</h2>

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-center my-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              </div>
            )}

            {/* Email field with validation */}
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
                placeholder="email"
                className="input input-bordered"
                disabled={loading}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password field with validation */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
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
                placeholder="password"
                className="input input-bordered"
                disabled={loading}
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Captcha section */}
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                ref={captchaRef}
                placeholder="Type the captcha"
                className="input input-bordered"
                disabled={loading}
              />
              <button
                type="button"
                onClick={handleValidateCaptcha}
                className="btn btn-outline btn-xs mt-2"
                disabled={loading}
              >
                Validate Captcha
              </button>
            </div>

            {/* Submit button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || disableLogin}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          {/* social login */}
          <SocialLogin></SocialLogin>
          {/* Sign up link */}
          <p className="text-center pb-2">
            New here?
            <Link to="/signup" className="text-primary ml-1">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
