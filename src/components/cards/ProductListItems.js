import React from "react";
import { Link } from "react-router-dom";
const ProductListItems = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product;
  return (
    <>
      <ul className="list-group border-0">
        <li className="border-0 list-group-item d-flex justify-content-between align-items-center">
          Price
          <span className=" rounded-pill">₹{price}</span>
        </li>{" "}
        {category && (
          <li className="border-0 list-group-item d-flex justify-content-between align-items-center">
            Category
            <Link to={`/category/${category.slug}`} className=" rounded-pill">
              {category.name}
            </Link>
          </li>
        )}
        {subs && (
          <li className="border-0 list-group-item d-flex justify-content-between align-items-center">
            Sub Category
            {subs.map((s) => (
              <Link to={`/sub/${s.slug}`} className=" rounded-pill" key={s._id}>
                {s.name}
              </Link>
            ))}
          </li>
        )}
        <li className="border-0 list-group-item d-flex justify-content-between align-items-center">
          Shipping
          <span className=" rounded-pill">{shipping}</span>
        </li>
        <li className="border-0 list-group-item d-flex justify-content-between align-items-center">
          Color
          <span className=" rounded-pill">{color}</span>
        </li>
        <li className="border-0 list-group-item d-flex justify-content-between align-items-center">
          Brand
          <span className=" rounded-pill">{brand}</span>
        </li>
        <li className="border-0 list-group-item d-flex justify-content-between align-items-center">
          Available
          <span className=" rounded-pill">{quantity}</span>
        </li>
        <li className="border-0 list-group-item d-flex justify-content-between align-items-center">
          Sold
          <span className=" rounded-pill">{sold}</span>
        </li>
      </ul>
    </>
  );
};

export default ProductListItems;
