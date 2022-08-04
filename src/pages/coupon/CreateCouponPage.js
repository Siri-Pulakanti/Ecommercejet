import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../components/nav/AdminNav";
import { Link } from "react-router-dom";
import { getCoupons, removeCoupon, createCoupon } from "../../functions/coupon";
import LocalSearch from "../../components/forms/LocalSearch";
import CategoryForm from "../../components/forms/CategoryForm";
const CreateCouponPage = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState(new Date());
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupos] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((c) => setCoupos(c.data));

  const handleRemove = async (slug, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      setLoading(true);
      removeCoupon(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadAllCoupons();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`${res.data.name} is created`);
        loadAllCoupons();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
            <h4>Coupon Create</h4>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Expiry</label>
              {/* <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} /> */}
              <DatePicker
                className="form-contron"
                selected={expiry}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>
            <button className="btn btn-outline-primary my-3">Save</button>
          </form>

          <hr />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.filter(searched(keyword)).map((c) => {
                return (
                  <tr key={c._id}>
                    <td> {c.name}</td>
                    <td>{new Date(c.expiry).toLocaleDateString()}</td>
                    <td>{c.discount}%</td>
                    <td>
                      <DeleteOutlined
                        className=" text-danger pointer"
                        onClick={() => handleRemove(c._id, c.name)}
                      />
                    </td>
                    {/* <span
                      onClick={() => handleRemove(c._id)}
                      className="btn btn-danger btn-sm float-right ml-3"
                    >
                      <DeleteOutlined />
                    </span>
                    <Link to={`/admin/category/${c.slug}`}>
                      <span className="btn btn-warning btn-sm float-right ">
                        <EditOutlined />
                      </span>
                    </Link> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
