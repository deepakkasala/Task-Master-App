import axios from "axios";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { clearAuth } from "../../redux/authSlice";

import toast, { Toaster } from "react-hot-toast";

import Navbar from "../../components/NavBar";

import React from "react";

import { API_URL } from "../../utils/constants";

const AdminDashboard = () => {
  const token = useSelector((state) => state.auth.token);

  console.log(token);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/admin/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      toast.success(response.data.message);

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewUser = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/admin/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />

      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Admin Dashboard
        </h2>

        <button
          className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg transition"
          onClick={() => {
            // Add your logout logic here if needed

            dispatch(clearAuth());

            toast.success("Admin Logged out successfully!");

            navigate("/");

            console.log("Logout clicked");
          }}
        >
          Logout
        </button>
      </div>

      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Welcome, Admin! Use the table below to manage users.
        </p>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Email
                </th>

                <th scope="col" className="px-6 py-3">
                  About User
                </th>

                <th scope="col" className="px-6 py-3">
                  Delete User
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.firstName + " " + user.lastName}
                  </th>

                  <td className="px-6 py-4">{user.email}</td>

                  <td className="px-6 py-4">
                    <a
                      onClick={() => navigate(`/admin/user/${user._id}`)}
                      href="#"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View
                    </a>
                  </td>

                  <td className="px-6 py-4">
                    <a
                      onClick={() => handleDeleteUser(user._id)}
                      href="#"
                      className="text-red-600 dark:text-red-400 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
