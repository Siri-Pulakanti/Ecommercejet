import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminProductCard from "../../../components/cards/AdminProductCard";
const AllProducts = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadAllProducts();
  }, []);
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleRemove = (slug) => {
    setLoading(true);
    if (window.confirm(`Delete ${slug} ?`)) {
      removeProduct(slug, user.token)
        .then((res) => {
          setLoading(false);
          loadAllProducts();
          toast.error(`${res.data.title} deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
            console.log(err);
          }
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />{" "}
        </div>

        <div className="col">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>All Products</h4>
          )}
          <hr />
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 pb-3" key={product._id}>
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
