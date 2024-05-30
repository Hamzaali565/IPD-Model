import React from "react";

const SidebarItems = ({ title }) => {
  return (
    <p className="text-center text-sm rounded p-1 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg mt-1 font-semibold hover:bg-gray-300 transition-all duration-2000 ease-in cursor-pointer">
      {title}
    </p>
  );
};

export default SidebarItems;
