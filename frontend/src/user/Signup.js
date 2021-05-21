import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    sucess: false,
  });

  const { name, email, password, error, sucess } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, sucess: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            sucess: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-4">
          <img src="https://images.unsplash.com/photo-1611003229244-fa443d2a2a96?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z29sZGVuJTIwcmV0cmlldmVyJTIwcHVwcHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
        </div>
        <div className="col-md-4 text-left">
          <form>
            <div className="form-group">
              <label className="text-white">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-white">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-white">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
              />
            </div>
            <br />
            <button
              onClick={onSubmit}
              className="btn mt-2 mb-2 text-white"
              style={{ backgroundColor: "#E92929", borderRadius: "12px" }}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="col-md-2"></div>
      </div>
    );
  };

  const sucessMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: sucess ? "" : "none" }}
          >
            New Account was created sucessfully. Please{" "}
            <Link to="/signin"> Login here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signup Page" description="A page for user to signup!">
      {sucessMessage()}
      {errorMessage()}
      {signupForm()}
    </Base>
  );
};
// <p className='text-white text-center'>{JSON.stringify(values)}</p>

export default Signup;
