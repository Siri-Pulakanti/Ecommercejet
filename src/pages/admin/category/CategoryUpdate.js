import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(slug).then((c) => {
      setName(c.data.category.name);
      console.log(c.data.category, "dataaaaaaaaaaaaa");
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated`);
        navigate("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Update category</h4>
          )}

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
