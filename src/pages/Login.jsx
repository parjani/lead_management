import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { toast } from "react-toastify";
import { setToken, setUser } from "../utils/token";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await login(formData);

            setToken(response.data.token);
            setUser(response.data.user);

            toast.success(response.message);

            if (response.data.user.role === "admin") {

                navigate("/admin/dashboard");

            } else {

                navigate("/member/dashboard");

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Login failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-5">

            <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

                {/* Left Section */}

                <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-14">

                    <span className="bg-white/20 w-fit px-4 py-2 rounded-full text-sm font-medium">
                        Lead Management Platform
                    </span>

                    <h1 className="text-5xl font-bold mt-8 leading-tight">
                        Welcome Back
                    </h1>

                    <p className="mt-6 text-lg text-blue-100 leading-8">
                        Manage leads, track customer interactions, assign team members,
                        and grow your business from one secure dashboard.
                    </p>

                    <div className="mt-12 space-y-5">

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            Role-Based Access Control
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            Secure Authentication
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            Lead Tracking & Analytics
                        </div>

                    </div>
                </div>

                {/* Right Section */}

                <div className="p-10 md:p-14 flex items-center">

                    <div className="w-full">

                        <div className="text-center mb-10">

                            <div className="w-16 h-16 rounded-2xl bg-blue-600 mx-auto flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                LF
                            </div>

                            <h2 className="text-3xl font-bold text-gray-800 mt-5">
                                Sign In
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Login to access your dashboard.
                            </p>

                        </div>

                        <form
                            className="space-y-6"
                            onSubmit={handleLogin}
                        >

                            {/* Email */}

                            <div>

                                <label className="text-sm font-medium text-gray-700">
                                    Email
                                </label>

                                <div className="mt-2 flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">

                                    <HiOutlineMail className="text-gray-400 text-xl" />

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full ml-3 outline-none"
                                    />

                                </div>

                            </div>

                            {/* Password */}

                            <div>

                                <label className="text-sm font-medium text-gray-700">
                                    Password
                                </label>

                                <div className="mt-2 flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">

                                    <HiOutlineLockClosed className="text-gray-400 text-xl" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="w-full ml-3 outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-500"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>

                                </div>

                            </div>



                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl disabled:bg-blue-400 disabled:cursor-not-allowed"
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>
                            <div className="mt-5 text-center">
                                <Link
                                    to="/"
                                    className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                                >
                                    ← Back to Home
                                </Link>
                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;