import React from "react";
import { useSelector } from "react-redux";

export const UserData = () => {
  return useSelector((state) => state.response);
};

export const Url = () => {
  return useSelector((state) => state?.url);
};
