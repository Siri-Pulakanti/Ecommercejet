import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import Invoice from "../../components/order/Invoice";
import { handlePdfDownlod } from "../../components/order/Invoice";
import { DownloadOutlined } from "@ant-design/icons";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>₹{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}

        <div
          className="col "
          style={{ transform: "scale(0.01)", maxHeight: "1px" }}
        >
          {" "}
          <Invoice product={order} />
        </div>
        <button
          className="btn btn-outline-primary btn-sm m-auto"
          style={{ width: "200px" }}
          onClick={handlePdfDownlod}
        >
          <DownloadOutlined /> Download Invoice
        </button>
      </div>
    ));
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />{" "}
        </div>
        <div className="col text-center">
          <h3 className="mt-3 mb-0">
            {orders.length > 0 ? "Previous orders" : "No previous orders"}
          </h3>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
