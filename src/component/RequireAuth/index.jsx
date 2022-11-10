import React from "react";
import { Navigate } from "react-router-dom";

import { toast } from "react-toastify";

const RequireAuth = ({ children }) => {
  const isAuth = localStorage.getItem("token");
  // const role = localStorage.getItem("role");
  // const isRefreshAuth = localStorage.getItem("refreshToken");

  if (!isAuth) {
    toast.error("Please Sign In!", { autoClose: 2000, toastId: "errorAuth" });
    return <Navigate to="/sign-in" replace="true" />;
  }
  // else if (isAuth && role !== "seller") {
  //   toast.error("Role not Seller!", { autoClose: 2000 ,toastId: "errorNotSeller" });
  //   return <Navigate to="/home" replace="true" />;
  // }

  // console.log(role)
  return children;
};

export default RequireAuth;
