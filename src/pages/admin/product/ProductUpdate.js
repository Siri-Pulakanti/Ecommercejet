import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Gold", "Brown", "Silver", "White", "Blue", "Grey"],
  brands: [
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
  ],
  color: "",
  brand: "",
};

const ProductUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  const { slug } = useParams();
  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      setValues({ ...values, ...p.data });
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data);
      });
      let arr = [];
      p.data.subs.map((s) => arr.push(s._id));
      setArrayOfSubs((prev) => arr);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        navigate("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, "-----------------", e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [] });
    setSelectedCategory(e.target.value);
    getCategorySubs(e.target.value).then((res) => {
      // console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });
    // console.log("EXISTING CATEGORY values.category", values.category);

    if (values.category._id === e.target.value) {
      loadProduct();
    } else setArrayOfSubs([]);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product update</h4>
          )}
          {/* {JSON.stringify(values)} */}
          <hr />
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            values={values}
            setValues={setValues}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
