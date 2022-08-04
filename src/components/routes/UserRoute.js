import React from "react";
import { useSelector } from "react-redux";
import LoadingToredirect from "./LoadingToredirect";
const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));

  if (!user || !user.token) {
    return <LoadingToredirect />;
  }
  return children;
};

export default UserRoute;
