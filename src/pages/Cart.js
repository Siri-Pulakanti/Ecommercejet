import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = () => {
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const showCartItems = () => (
    <table className="table table-bordered ">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row mx-0">
        <div className="col-md-8">
          <h4>Cart - {cart.length} Product(s)</h4>
          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ₹{c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b> ₹{getTotal()}</b>
          <hr />
          {user ? (
            <div className="row">
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-primary m-2 col text-light"
                disabled={!cart.length}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-info m-2 col text-light"
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </button>
            </div>
          ) : (
            <Link to="/login" state={{ from: "/cart" }}>
              <button
                disabled={!cart.length}
                className="btn btn-sm btn-primary mt-4"
              >
                Login to Checkout
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
