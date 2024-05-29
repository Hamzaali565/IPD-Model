import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import SidebarItems from "../../Components/SidebarItems/SidebarItems";
import SimpleButton from "../../Components/Button/SimpleButton";
import "./Main.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoginToggle } from "../../Store/action";

const MainPage = () => {
  const [toggle, setToggle] = useState(false);
  const Dispatch = useDispatch();
  const url = useSelector((state) => state.url);
  const logout = async () => {
    try {
      let response = await axios.post(
        `${url}/logout`,
        {},
        { withCredentials: true }
      );
      Dispatch(setLoginToggle(false));
      // console.log("resp", response);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="grid grid-rows-[3rem,1fr] h-screen overflow-hidden">
      {/* Header */}
      <div className="flex justify-between bg-yellow-400 items-center p-2 fixed w-full top-0 left-0 z-20">
        <button onClick={() => setToggle(!toggle)} className="font-extrabold">
          {toggle ? (
            <i className="bi bi-x-lg"></i>
          ) : (
            <i className="bi bi-grid-3x3-gap-fill"></i>
          )}
        </button>
        <h1>HAmza</h1>
      </div>

      {/* Sidebar */}

      <div
        className={`sidebar fixed top-10 left-0 bg-pink-500 h-[calc(100%-2.5rem)] transition-all duration-500 ease-in-out ${
          toggle ? "w-32 overflow-y-auto" : "w-0 overflow-hidden"
        }`}
      >
        <Sidebar buttonTitle={"IPD"}>
          <SidebarItems title={"Master"} />
          <SidebarItems title={"Transaction"} />
          <SidebarItems title={"Patient"} />
          <SidebarItems title={"Welfare"} />
          <SidebarItems title={"Direct Services"} />
          <SidebarItems title={"Reports"} />
        </Sidebar>

        <div
          className={` ${toggle === true ? "fixed bottom-3 ml-5" : "hidden"}`}
        >
          <SimpleButton title={"Logout"} onClick={logout} />
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`grid col-span-full row-span-full bg-orange-400 overflow-y-auto pt-12 ${
          toggle ? "pl-36" : "pl-0"
        } transition-all duration-500 ease-in-out`}
      >
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
        <p>i am body</p>
      </div>
    </div>
  );
};

export default MainPage;
