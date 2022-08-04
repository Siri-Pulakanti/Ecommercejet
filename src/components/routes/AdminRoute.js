import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingToredirect from "./LoadingToredirect";
import { currentAdmin } from "../../functions/auth";
const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("CURRENT ADMIN RES", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE", err);
          setOk(false);
        });
    }
  }, [user]);
  if (!ok) {
    return <LoadingToredirect />;
  }
  return children;
};

export default AdminRoute;
