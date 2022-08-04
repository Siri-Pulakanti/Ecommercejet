import React, { useEffect, useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const auth = getAuth();
  const { user } = useSelector((state) => ({ ...state }));
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [navigate, user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    await sendPasswordResetEmail(auth, email, config)
      .then(() => {
        setEmail("");
        setloading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setloading(false);
        toast.error(error.message);
        console.log(error);
      });
  };
  const LoginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        {" "}
        <input
          type="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          autoFocus
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email}
      >
        Submit
      </Button>
    </form>
  );

  return (
    <div className="container p-5 col-md-6 offse-md-3">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Forgot password</h4>
          )}
          {LoginForm()}
        </div>
      </div>
    </div>
  );
}
