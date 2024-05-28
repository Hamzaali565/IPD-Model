import React from "react";

const LoginInput = ({ placeholder, icon }) => {
  return (
    <div className="grid grid-cols-[1fr,auto] border-2 border-gray-500 rounded-2xl w-full p-3">
      <input
        type="text"
        placeholder={placeholder}
        className="outline-none bg-transparent"
      />
      <i class={`${icon} text-2xl`}></i>
    </div>
  );
};

export default LoginInput;
