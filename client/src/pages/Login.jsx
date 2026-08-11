
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShoppingBag,
  FaArrowRight,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { loginUser, clearError } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user, token } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (token && user) {
      toast.success("Login Successful");

      switch (user.role) {
        case "Admin":
          navigate("/admin");
          break;

        case "Vendor":
          navigate("/vendor");
          break;

        default:
          navigate("/");
      }
    }
  }, [token, user, error, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8 md:py-12">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* ===========================
            LEFT SECTION
        =========================== */}

        <div className="hidden lg:flex relative flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white p-12">

          {/* Decorative Circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/10" />

          <div className="relative z-10">

            {/* Logo */}
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <FaShoppingBag className="text-2xl" />
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight">
                ShopSphere
              </h1>

            </div>

            <div className="mt-16">

              <span className="inline-block bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm font-medium">
                Welcome back 👋
              </span>

              <h2 className="text-5xl font-extrabold leading-tight mt-6">
                Shop smarter.
                <br />
                Live better.
              </h2>

              <p className="mt-6 text-lg leading-8 text-blue-100 max-w-md">
                Login to explore thousands of products, manage your orders,
                save your favorites and enjoy a seamless shopping experience.
              </p>

            </div>

          </div>

          {/* Image */}
          <div className="relative z-10 mt-10">

            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200"
              alt="shopping"
              className="w-full h-72 object-cover rounded-2xl shadow-2xl border border-white/10"
            />

          </div>

        </div>

        {/* ===========================
            RIGHT SECTION
        =========================== */}

        <div className="p-6 sm:p-10 md:p-14 lg:p-12">

          {/* Header */}
          <div className="mb-8">

            <div className="lg:hidden flex items-center justify-center gap-2 mb-8">

              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white">
                <FaShoppingBag />
              </div>

              <span className="text-2xl font-extrabold text-gray-900">
                ShopSphere
              </span>

            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Welcome back!
            </h2>

            <p className="text-gray-500 mt-2">
              Sign in to continue to your account.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 text-gray-800 outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-12 text-gray-800 outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between pt-1">

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">

                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />

                Remember Me

              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl text-base font-bold shadow-md hover:shadow-lg transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Logging In...
                </>
              ) : (
                <>
                  Login
                  <FaArrowRight size={14} />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">

              <div className="flex-1 h-px bg-gray-200" />

              <span className="text-gray-400 text-xs font-semibold">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-200" />

            </div>

            {/* Google Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 py-3.5 rounded-xl font-semibold text-gray-700 transition-all duration-200"
            >

              <span className="font-bold text-lg">
                G
              </span>

              Continue with Google

            </button>

            {/* Register */}
            <div className="text-center pt-2">

              <span className="text-gray-500 text-sm">
                Don't have an account?
              </span>

              <Link
                to="/register"
                className="ml-2 text-blue-600 font-bold hover:text-blue-700 hover:underline text-sm"
              >
                Create Account
              </Link>

            </div>

          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400 leading-6">

            By logging in, you agree to our

            <Link
              to="/terms"
              className="text-blue-600 hover:underline ml-1"
            >
              Terms
            </Link>

            <span className="mx-1">&</span>

            <Link
              to="/privacy"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;

