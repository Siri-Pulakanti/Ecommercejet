import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

const ProductCard = ({ product }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const { Meta } = Card;
  const { title, description, images, slug, price } = product;
  const [tooltip, setTooltip] = useState("Click to add");
  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });
      let unique = _.uniqWith(cart, _.isEqual);
      // console.log("unique ", unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No ratings yet</div>
      )}
      <Card
        // hoverable
        cover={
          <img
            alt={product.title}
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "contain" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning " /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              {" "}
              <ShoppingCartOutlined
                //   onClick={() => handleRemove(slug)}
                className="text-danger "
              />
              <br />
              {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - ₹${price}`}
          description={`${description && description.substring(0, 80)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
