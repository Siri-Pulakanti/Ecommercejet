import React, { useEffect, useState } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
  BgColorsOutlined,
  CarOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";

const { SubMenu, ItemGroup } = Menu;
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "ASUS",
    "Dell",
    "Acer",
    "HP",
    "MSI",
    "Avita",
    "Realme",
    "Mi",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Gold",
    "Brown",
    "Silver",
    "White",
    "Blue",
    "Grey",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");
  const [ok, setOk] = useState(false);
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  let dispatch = useDispatch();
  const [star, setStar] = useState("");

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    // console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
    // console.log("categories", categories);
  }, []);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setStar(num);
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setSub(sub);
    setColor("");
    setShipping("");
    fetchProducts({ sub: sub });
  };

  const showBrands = () =>
    brands.map((b) => (
      <div key={b}>
        <Radio
          onChange={(e) => handleBrand(e)}
          className="pb-1 pr-4"
          value={b}
          name={b}
          checked={b === brand}
        >
          {b}
        </Radio>
        <br />
      </div>
    ));
  const handleBrand = (e) => {
    // console.log("SUB", sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setColor("");
    setShipping("");
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  const showColors = () =>
    colors.map((c) => (
      <div key={c}>
        <Radio
          onChange={(e) => handleColor(e)}
          className="pb-1 pr-4"
          value={c}
          name={c}
          checked={c === color}
        >
          {c}
        </Radio>
        <br />
      </div>
    ));
  const handleColor = (e) => {
    // console.log("SUB", sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setShipping("");
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  const showShipping = () => (
    <>
      <Checkbox
        onChange={(e) => handleShippingCheck(e)}
        className="pb-2 px-4 "
        value="Yes"
        name="shipping"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>{" "}
      <Checkbox
        onChange={(e) => handleShippingCheck(e)}
        className="pb-2 px-4 "
        value="No"
        name="shipping"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );
  const handleShippingCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />
          <Menu defaultOpenKeys={["1", "2", "3"]} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined className="pr-3" />
                  Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `₹${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="299999"
                />
              </div>
            </SubMenu>
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined className="pr-3" /> Categories
                </span>
              }
            >
              <div className=" py-2" style={{ maringTop: "-10px" }}>
                {showCategories()}
              </div>
            </SubMenu>{" "}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined className="pr-3" /> Rating
                </span>
              }
            >
              <div className="py-2" style={{ maringTop: "-10px" }}>
                {showStars()}
              </div>
            </SubMenu>
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined className="pr-3" />
                  Sub Categories
                </span>
              }
            >
              <div className="px-4 py-2" style={{ maringTop: "-10px" }}>
                {showSubs()}
              </div>
            </SubMenu>
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined className="pr-3" />
                  Brands
                </span>
              }
            >
              <div className="px-4 py-2" style={{ maringTop: "-10px" }}>
                {showBrands()}
              </div>
            </SubMenu>
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <BgColorsOutlined className="pr-3" />
                  Color
                </span>
              }
            >
              <div className="px-4 py-2" style={{ maringTop: "-10px" }}>
                {showColors()}
              </div>
            </SubMenu>
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <CarOutlined className="pr-3" />
                  Shipping
                </span>
              }
            >
              <div className="px-4 py-2" style={{ maringTop: "-10px" }}>
                {showShipping()}
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}
          {products.length < 1 && <p>No products found</p>}
          <div className="row mx-0 pb-5 ">
            {products.map((p) => {
              return (
                <div key={p._id} className="col-md-4 mt-3">
                  <ProductCard product={p} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
