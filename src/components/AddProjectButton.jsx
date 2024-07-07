import React from "react";

const AddProjectButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="p-[3px] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
      <div className="px-8 py-1 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
        Add new project
      </div>
    </button>
  );
};

export default AddProjectButton;
