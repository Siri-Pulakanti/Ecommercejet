import React, { useState, useEffect } from "react";
import ProductCard from "../../components/cards/ProductCard";
import { getCategory } from "../../functions/category";
import { useParams } from "react-router-dom";

const CategoryHome = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container">
      <div className="row m-0">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 my-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 my-5 display-4 jumbotron">
              {products.length} Products in <strong>{category.name} </strong>
              category
            </h4>
          )}
        </div>
      </div>
      <div className="row mx-0">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
