import React, { useState, useEffect } from "react";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { app } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("dwaraka.bits@gmail.com");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [navigate, user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration`
    );
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control my-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your Email"
        autoFocus
      />
      <button type="submit" className="btn btn-outline-success my-3">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
}
