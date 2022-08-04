import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailLink, updatePassword } from "firebase/auth";
import { app } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

export default function RegisterComplete() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  let dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;
        updatePassword(user, password)
          .then(() => {
            toast.success("Registration succesful");
          })
          .catch((error) => {
            toast.error(error);
          });

        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((error) => console.log(error));
        // redirect
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error, "vachesindi");
    }
  };
  const registerCompleteForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control my-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your Email"
        disabled
      />
      <input
        type="password"
        className="form-control my-3"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Enter your Password"
        autoFocus
      />
      <button type="submit" className="btn btn-outline-success my-3">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete Registration</h4>
          {registerCompleteForm()}
        </div>
      </div>
    </div>
  );
}
