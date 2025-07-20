import axios from "axios";

import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import TaskCard from "../../components/TaskCard";

import toast, { Toaster } from "react-hot-toast";

import Navbar from "../../components/NavBar";

import BackIcon from "../../components/BackIcon";
import { API_URL } from "../../utils/constants";

const UserDetailPage = () => {
  const token = useSelector((state) => state.auth.token);

  const { id } = useParams();

  const [user, setUser] = useState({});

  const [tasks, setTasks] = useState([]);

  const [tableModal, setTableModal] = useState(false);

  const navigate = useNavigate();

  console.log(id);

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/admin/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.user[0]);

      setUser(response.data.user[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const makeAdmin = async (userId) => {
    try {
      const payload = { role: "admin" };

      const response = await axios.put(
        `${API_URL}/admin/user/${userId}/role`,

        payload,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      if (response.data.success) toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewTasks = async (userId) => {
    try {
      console.log(API_URL);

      const response = await axios.get(
        `${API_URL}/admin/user/${userId}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setTasks(response.data.tasks);

      setTableModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAllTasks = async (userId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/admin/user/${userId}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser(id);
  }, []);

  // console.log(id);

  if (!id) return <h1 className="text-center text-xl mt-10">Loading...</h1>;

  return (
    <>
      <Navbar />

      <BackIcon />

      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          User Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-gray-500 text-sm">Full Name</p>

            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              {user.firstName + " " + user.lastName}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>

            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Total Tasks</p>

            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              {tasks.length}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            disabled={user.role === "admin"}
            onClick={() => makeAdmin(user._id)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:bg-blue-300"
          >
            Make {user.firstName} Admin
          </button>

          <button
            disabled={tasks.length === 0}
            onClick={() => handleDeleteAllTasks(user._id)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition disabled:bg-red-300"
          >
            Delete All Tasks
          </button>

          <button
            onClick={() => handleViewTasks(user._id)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            View Tasks
          </button>

          <button
            onClick={() => setTableModal(false)}
            className="px-4 py-2 bg-gray-900 hover:bg-gray-600 text-white rounded-lg transition"
          >
            Hide Tasks
          </button>
        </div>
      </div>

      {tableModal && (
        <div className="hover:pointer-events-none cursor-not-allowed">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No tasks found!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserDetailPage;
