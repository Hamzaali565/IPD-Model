import React from "react";

const SidebarItems = ({ title }) => {
  return (
    <p className="text-center text-sm bg-yellow-200 mt-1 font-semibold hover:bg-gray-300 transition-all duration-2000 ease-in cursor-pointer">
      {title}
    </p>
  );
};

export default SidebarItems;
