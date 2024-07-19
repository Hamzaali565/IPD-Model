import React from "react";
import { useSelector } from "react-redux";

export const UserData = () => {
  const userData = useSelector((state) => state.response);

  return <div>{JSON.stringify(userData)}</div>;
};

export const Url = () => {
  const url = useSelector((state) => state?.url);

  return <div>{url}</div>;
};
