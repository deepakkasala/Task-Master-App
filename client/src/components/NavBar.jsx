import React, { useEffect, useState } from "react";

import { FiSun, FiMoon, FiUser } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "../redux/themeSlice";

import { setSearchQuery } from "../redux/searchSlice";

import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.mode);

  // console.log("Theme", theme);

  const user = useSelector((state) => state.auth.user);

  localStorage.setItem("userName", user.firstName);

  // console.log("User", user);

  const searchQuery = useSelector((state) => state.search.query);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    dispatch(toggleTheme(newTheme));

    updateHTMLTheme(newTheme);
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const updateHTMLTheme = (mode) => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    try {
      const fetchUserById = async () => {
        const response = axios.get(`http://localhost:3000/user/get/`);
      };
    } catch (error) {
      console.log("Error in finding User by Id in navbar.");
    }

    updateHTMLTheme(theme);
  }, [theme]);

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="text-2xl font-bold text-purple-600">My Tasks</div>

      <div className="flex items-center gap-4">
        <input
          hidden
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search tasks..."
          className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:border-gray-600"
        />

        <button onClick={handleToggleTheme} className="mr-10">
          {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>

        <p>Hi {user.firstName || localStorage.getItem("userName")}👋</p>

        <button>
          <FiUser size={20} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
