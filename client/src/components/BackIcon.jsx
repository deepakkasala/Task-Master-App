import React from "react";

import { useNavigate } from "react-router-dom";

const BackIcon = () => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-600 w-8 h-8 p-0.5 mt-2 ml-2 cursor-pointer"
      onClick={() => {
        navigate("/admin/dashboard");
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />

        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
      </svg>
      Back
    </div>
  );
};

export default BackIcon;
