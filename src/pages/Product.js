import React, { useState, useEffect } from "react";
import { getProduct, productStar, getRelated } from "../functions/product";
import { useNavigate, useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";
import ProductCard from "../components/cards/ProductCard";
import { useSelector } from "react-redux";

const Product = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSingleProduct();
    console.log("user roken", user);
  }, [slug]);

  useEffect(() => {
    // console.log("product.ratings && user", product.ratings, " ", user);
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  }, [user, product]);

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    // console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      // console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  };

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      getRelated(res.data._id).then((res) => {
        setRelated(res.data);
      });
    });
  };

  return (
    <div className="contaner-fluid">
      <div className="row pt-4 mx-0">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>
      <div className="row  mx-0">
        <div className="col text-center py-5">
          <hr />
          <h4>Related Products</h4>

          <hr />
        </div>
      </div>
      <div className="row pb-5 mx-0">
        {related.length ? (
          related.map((r) => (
            <div key={r.id} className="col-md-4">
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Product;
