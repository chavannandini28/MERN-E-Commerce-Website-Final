
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaShoppingBag,
    FaCheckCircle,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
    registerUser,
    clearError,
} from "../redux/authSlice";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector(
        (state) => state.auth
    );

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error("Name is required");
            return;
        }

        if (!formData.email.trim()) {
            toast.error("Email is required");
            return;
        }

        if (!formData.phone.trim()) {
            toast.error("Phone Number is required");
            return;
        }

        if (!formData.password.trim()) {
            toast.error("Password is required");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        dispatch(
            registerUser({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            })
        );
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }

        if (success) {
            toast.success("Registration Successful");
            navigate("/login");
        }
    }, [success, error, dispatch, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-4 py-8">

            {/* Main Card */}
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

                {/* ================= LEFT SIDE ================= */}

                <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-12 flex-col justify-between">

                    {/* Decorative circles */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-white/10 rounded-full" />

                    <div className="relative z-10">

                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-14">

                            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
                                <FaShoppingBag className="text-2xl" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold">
                                    ShopSphere
                                </h1>

                                <p className="text-blue-100 text-sm">
                                    Your Shopping Destination
                                </p>
                            </div>

                        </div>

                        {/* Heading */}
                        <h2 className="text-5xl font-extrabold leading-tight">
                            Start Your
                            <br />
                            Shopping Journey
                        </h2>

                        <p className="mt-6 text-blue-100 text-lg leading-8 max-w-md">
                            Create your account and discover a seamless
                            shopping experience with secure payments,
                            fast delivery and personalized offers.
                        </p>

                        {/* Benefits */}
                        <div className="mt-8 space-y-4">

                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-300" />
                                <span>Secure & easy checkout</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-300" />
                                <span>Track your orders easily</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-300" />
                                <span>Save your favorite products</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-300" />
                                <span>Get exclusive offers</span>
                            </div>

                        </div>

                    </div>

                    {/* Image */}
                    <div className="relative z-10 mt-10">

                        <img
                            src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200"
                            alt="Shopping"
                            className="w-full h-56 object-cover rounded-2xl shadow-2xl border border-white/20"
                        />

                    </div>

                </div>

                {/* ================= RIGHT SIDE ================= */}

                <div className="p-6 sm:p-10 lg:p-12 bg-white">

                    {/* Mobile Logo */}
                    <div className="flex lg:hidden items-center justify-center gap-3 mb-8">

                        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                            <FaShoppingBag />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-800">
                            ShopSphere
                        </h1>

                    </div>

                    {/* Heading */}
                    <div className="mb-8">

                        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
                            Welcome
                        </span>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                            Create Account
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Join us and start shopping today.
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Name */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>

                            <div className="relative">

                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />

                            </div>

                        </div>

                        {/* Email */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />

                            </div>

                        </div>

                        {/* Phone */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone Number
                            </label>

                            <div className="relative">

                                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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

                            <p className="text-xs text-gray-400 mt-2">
                                Password must contain at least 6 characters.
                            </p>

                        </div>

                        {/* Confirm Password */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm Password
                            </label>

                            <div className="relative">

                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
                                >
                                    {showConfirmPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>

                        {/* Login */}
                        <p className="text-center text-gray-500 text-sm pt-2">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="text-blue-600 font-bold hover:text-indigo-600 hover:underline transition"
                            >
                                Login
                            </Link>

                        </p>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default Register;
