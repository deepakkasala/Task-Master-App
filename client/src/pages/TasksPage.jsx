import React, { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { setTasks } from "../redux/taskSlice";

import Sidebar from "../components/SideBar";

import Navbar from "../components/NavBar";

import TaskCard from "../components/TaskCard";

import { Toaster, toast } from "react-hot-toast";

import _ from "lodash";

import PasswordModal from "../components/PasswordModal";

import TaskModal from "../components/TaskModal";

import Pagination from "../components/Pagination";

import ActionButtons from "../components/ActionButtons";

import Filters from "../components/Filters";

import { API_URL } from "../utils/constants";

import { generateTaskPDF } from "../utils/generatePDF";

const TasksPage = () => {
  const dispatch = useDispatch();

  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

  const taskList = useSelector((state) => state.tasks.taskList);

  const [activeFilter, setActiveFilter] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");

  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [allTasks, setAllTasks] = useState([]); // for status counts

  const [modal, setModal] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);

  const [passwordModal, setPasswordModal] = useState(false);

  const [taskToEdit, setTaskToEdit] = useState(null);

  const [newTask, setNewTask] = useState({
    title: "",

    description: "",

    dueDate: "",
  });

  const [newPassword, setNewPassword] = useState({
    password: "",

    confirmPassword: "",
  });

  const handleStatusClick = (status) => {
    setActiveFilter(status);

    setCurrentPage(1);
  };

  const handleSortChange = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const debouncedSearch = useMemo(() => _.debounce(setSearchTerm, 300), []);

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);

    setCurrentPage(1);
  };

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleOpenModal = () => {
    setNewTask({ title: "", description: "", dueDate: "" });

    setModal(true);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);

    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setNewPassword((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate status counts from allTasks

  const taskCounts = useMemo(
    () => ({
      all: allTasks.length,

      done: allTasks.filter((t) => t.status === "done").length,

      todo: allTasks.filter((t) => t.status === "todo").length,

      "in progress": allTasks.filter((t) => t.status === "in progress").length,
    }),

    [allTasks]
  );

  // Fetch filtered tasks for display

  const fetchFilteredTasks = async () => {
    try {
      const queryParams = new URLSearchParams({
        search: searchTerm,

        status: activeFilter === "all" ? "" : activeFilter,

        sort: sortOrder,

        page: currentPage,

        limit: 6,
      });

      const response = await axios.get(
        `${API_URL}/tasks/all?${queryParams.toString()}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setTasks(response.data.tasks));

      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching filtered tasks:", error);
    }
  };

  //Update Password

  const handlePasswordUpdate = async () => {
    if (!newPassword.password || !newPassword.confirmPassword) {
      toast.error("All fields are required.");

      return;
    }

    if (newPassword.password !== newPassword.confirmPassword) {
      toast.error("Passwords not matched!");

      return;
    }

    const newPasswordObj = {
      password: newPassword.password,
    };

    try {
      const response = await axios.put(
        `${API_URL}/auth/update/password`,

        newPasswordObj,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }

    setPasswordModal(false);

    setNewPassword({
      password: "",

      confirmPassword: "",
    });
  };

  //Create Task

  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.description || !newTask.dueDate) {
      toast.error("All fields are required.");

      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/tasks/createTask`,

        newTask,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(response.data.message);

      // fetchAllTasks();

      await fetchFilteredTasks();

      setNewTask({ title: "", description: "", dueDate: "" });

      setModal(false);

      setCurrentPage(1); // Go to page 1
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Delete Task

  const handleDelete = async (taskId) => {
    console.log("TAsk Id To deLLEte", taskId);

    try {
      const response = await axios.delete(`${API_URL}/tasks/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      toast.success(response.data.message);

      await fetchFilteredTasks();

      setCurrentPage(1);

      // fetchAllTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownloadReport = () => {
    generateTaskPDF(taskList);
  };

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/tasks/all?limit=1000`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAllTasks(response.data.tasks || []);
      } catch (error) {
        console.error("Error fetching all tasks for counts:", error);
      }
    };

    fetchAllTasks();
  }, []);

  useEffect(() => {
    fetchFilteredTasks();
  }, [
    activeFilter,

    searchTerm,

    sortOrder,

    currentPage,

    dispatch,

    token,

    editModalOpen,

    modal,
  ]);

  return (
    <div className="flex bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />

      <Sidebar onForgotPasswordClick={() => setPasswordModal(true)} />

      <main className="flex-1 p-6">
        <Navbar />

        {/* Filters */}

        <Filters
          handleStatusClick={handleStatusClick}
          taskCounts={taskCounts}
          activeFilter={activeFilter}
        />

        {/* Action Buttons, Search and Sort*/}

        <ActionButtons
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleOpenModal={handleOpenModal}
          handleSortChange={handleSortChange}
          sortOrder={sortOrder}
          handleDownloadReport={handleDownloadReport}
        />

        {/* Task Cards */}

        {taskList.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No tasks found for {activeFilter}
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taskList.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                token={token}
                onDelete={handleDelete}
                onEdit={handleEdit}
                fetchTasks={fetchFilteredTasks}

                // handleTaskUpdated={handleTaskUpdated}
              />
            ))}
          </div>
        )}

        {/* Pagination Controls */}

        <Pagination
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />

        {/* Task Modal */}

        {modal && (
          <TaskModal
            newTask={newTask}
            handleInputChange={handleInputChange}
            handleCloseModal={handleCloseModal}
            handleCreateTask={handleCreateTask}
          />
        )}

        {/* Password Modal */}

        {passwordModal && (
          <PasswordModal
            newPassword={newPassword}
            handlePasswordChange={handlePasswordChange}
            setPasswordModal={setPasswordModal}
            handlePasswordUpdate={handlePasswordUpdate}
          />
        )}
      </main>
    </div>
  );
};

export default TasksPage;
