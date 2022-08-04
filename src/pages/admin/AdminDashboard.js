import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { getOrders, changeStatus } from "../../functions/admin";
import Orders from "../../components/order/Orders";
const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadOrders();
  }, []);
  const loadOrders = () => {
    getOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  };
  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />{" "}
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <>
              <h4 className="p-3 ps-0">Admin Dashboard</h4>
              {!orders.length ? <h3>No orders yet</h3> : null}
              <Orders orders={orders} handleStatusChange={handleStatusChange} />
              {/* {JSON.stringify(orders)} */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
