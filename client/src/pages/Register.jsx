import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../utils/constants";

const initialState = {
  firstName: "",

  lastName: "",

  email: "",

  password: "",
};

const Register = () => {
  const [user, setUser] = useState(initialState);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/auth/register`, user);

      if (response.status === 201 || response.status === 200) {
        toast.success(response.data.message);

        navigate("/");

        setUser(initialState);
      } else {
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Register
          </h2>

          <form className="space-y-5" onSubmit={handleForm}>
            {/* First Name */}

            <div>
              <label
                htmlFor="firstName"
                className="block mb-1 font-medium text-gray-700"
              >
                First Name
              </label>

              <input
                type="text"
                id="firstName"
                value={user.firstName}
                name="firstName"
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            {/* Last Name */}

            <div>
              <label
                htmlFor="lastName"
                className="block mb-1 font-medium text-gray-700"
              >
                Last Name
              </label>

              <input
                type="text"
                id="lastName"
                value={user.lastName}
                name="lastName"
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            {/* Email */}

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
                value={user.email}
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            {/* Password */}

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
                value={user.password}
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            {/* Register Button */}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
            >
              Register
            </button>
          </form>

          {/* Success or Error message */}

          {/* Login Link */}

          <p className="text-center text-gray-600 mt-6">
            Already registered?{" "}
            <Link
              to="/"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
