import React, { useEffect, useRef } from "react";

import axios from "axios";

import { useDispatch } from "react-redux";

import { setToken, setUser } from "../redux/authSlice";

import { Link, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import { API_URL } from "../utils/constants";

const Login = () => {
  const emailRef = useRef();

  const passwordRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    const password = passwordRef.current.value;

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,

        password,
      });

      const { token, user } = response.data;

      if (token) {
        dispatch(setToken(token));

        dispatch(setUser(user));

        localStorage.setItem("token", token);

        console.log("Login successful");

        toast.success(response.data.message);

        if (user.role === "user") {
          navigate("/tasks");
        }

        if (user.role === "admin") {
          navigate("/admin/dashboard");
        }
      }
    } catch (error) {
      // console.log(error.response.data.message);

      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email Input */}

            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-gray-700"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                ref={emailRef}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}

            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-gray-700"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                ref={passwordRef}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                placeholder="Enter your password"
              />
            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200 cursor-pointer"
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}

          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-purple-600 underline hover:text-purple-800"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
