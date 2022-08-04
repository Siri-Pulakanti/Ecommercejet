import React, { useState, useEffect } from "react";
import { Card, Tabs, Tooltip } from "antd";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  getWishlist,
  removeWishlist,
} from "../../functions/user";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const { title, images, description, _id } = product;
  const [wishlist, setWishlist] = useState([]);
  const [tooltip, setTooltip] = useState("Click to add");
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (user) {
      loadWishlist();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      wishlist.map((w) => {
        if (w._id === product._id) {
          setIsWishlisted(true);
        }
      });
    }
  }, [user, wishlist]);

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
      }); // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      // console.log(res);
      setWishlist(res.data.wishlist);
    });

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("Added to Wishlist");
      toast.success("Added to wishlist");
      setIsWishlisted(true);
      // navigate("user/wishlist");
    });
  };

  const handleRemoveWishlist = (e) => {
    e.preventDefault();
    removeWishlist(product._id, user.token).then((res) => {
      loadWishlist();
      setIsWishlisted(false);
      toast.error("Removed from wishlist");
    });
  };
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => <img src={i.url} key={i.public_id} alt="" />)}
          </Carousel>
        ) : (
          <Card
            cover={<img src={Laptop} className="mb-3 card-image" alt="" />}
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        <span style={{ display: "none" }}>{JSON.stringify(isWishlisted)}</span>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No ratings yet</div>
        )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart}>
                {" "}
                <ShoppingCartOutlined
                  //   onClick={() => handleRemove(slug)}
                  className="text-success "
                />
                <br />
                Add to Cart
              </a>
            </Tooltip>,
            <>
              {isWishlisted ? (
                <a onClick={handleRemoveWishlist}>
                  {" "}
                  <HeartFilled className="text-danger" /> <br />
                  Remove from Wishlist
                </a>
              ) : (
                <a onClick={handleAddToWishlist}>
                  <HeartOutlined className="text-info" /> <br /> Add to Wishlist
                </a>
              )}{" "}
            </>,
            <RatingModal>
              <StarRatings
                name={_id}
                numberOfStars={5}
                rating={star}
                isSelectable={true}
                starRatedColor="red"
                changeRating={onStarClick}
                // changeRating={(newRating, name) => {
                //   console.log("new rating", newRating, "name", name);
                // }}
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
