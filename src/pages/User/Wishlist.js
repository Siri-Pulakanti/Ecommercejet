import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";
import ProductCard from "../../components/cards/ProductCard";
import { Card, Tooltip } from "antd";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      // console.log(res);
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  return (
    <div className="container-fluid">
      <div className="row pe-3">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col my-3">
          <h3>Wishlist</h3>
          <div className="row">
            {wishlist.map((p) => (
              <div key={p._id} className="col-md-4 border my-3 pb-2">
                <ProductCard product={p} />
                <button
                  onClick={() => handleRemove(p._id)}
                  className="btn btn-sm btn-block btn-outline-danger"
                >
                  <HeartOutlined
                    style={{
                      marginTop: "-10px",
                      fontSize: "20px",
                      paddingRight: "10px",
                    }}
                  />{" "}
                  Remove from Wishlist
                </button>
              </div>
              // <div key={p._id} className="alert alert-secondary">
              //   <Link to={`/product/${p.slug}`}>{p.title}</Link>
              //   <span
              //     onClick={() => handleRemove(p._id)}
              //     className="btn btn-sm float-right"
              //   >
              //     <DeleteOutlined className="text-danger" />
              //   </span>
              // </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
