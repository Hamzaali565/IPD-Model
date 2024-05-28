import React from "react";
import LoginInput from "../../Components/LofginInput/LoginInput";
import "./Login.css";
const Login = () => {
  return (
    <div className="h-screen grid place-items-center sm: same">
      <div className="grid gap-y-8 w-full  max-w-md mx-auto p-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg rounded-3xl">
        <img
          src={require("../../Images/hospital.png")}
          style={{ width: "100px", height: "100px" }}
          alt=""
          className="justify-self-center"
        />
        <h1 className="text-2xl underline justify-self-center text-gray-500 font-bold">
          Welcome Back!
        </h1>
        <div className="grid gap-4 gap-x-3">
          <LoginInput placeholder={"User ID "} icon={"bi bi-person-circle"} />
          <LoginInput placeholder={"Password "} icon={"bi bi-eye-slash"} />
        </div>
        <div className="justify-self-center grid text-wrap">
          <p className="mt-20">
            Dont have Account?{" "}
            <span className="text-blue-700 underline">Contact to Admin.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
