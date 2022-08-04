import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { getAuth, updatePassword } from "firebase/auth";
import { app } from "../../firebase";
import { toast } from "react-toastify";

const Password = () => {
  const auth = getAuth();
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(password);

    let user = auth.currentUser;
    updatePassword(user, password)
      .then(() => {
        setLoading(false);
        setpassword("");
        toast.success("Password updated");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-group">
        <label htmlFor="passwordInput">Your Password</label>
        <input
          id="passwordInput"
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          className="form-control"
          placeholder="Enter new Password"
          disabled={loading}
          value={password}
        />{" "}
      </div>
      <button
        className="btn btn-primary"
        disabled={!password || loading || password.length < 6}
      >
        Submit
      </button>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />{" "}
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Password Update</h4>
          )}

          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
