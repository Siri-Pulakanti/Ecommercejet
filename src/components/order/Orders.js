import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => {
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
  return (
    <div className="p-4">
      {orders.map((order) => (
        <div key={order._id} className="row pb-5">
          <div className="btn btn-block bg-light py-4">
            <ShowPaymentInfo order={order} showStatus={false} />
            <div className="row my-4">
              <div className="col-md-4 h5">Delivery Status:</div>
              <div className="col-md-8">
                <select
                  className="form-control"
                  defaultValue={order.orderStatus}
                  name="Status"
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="Not Processed">Not Processed</option>
                  {/* <option value="Cash On Delivery">Cash On Delivery</option> */}
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            {showOrderInTable(order)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
