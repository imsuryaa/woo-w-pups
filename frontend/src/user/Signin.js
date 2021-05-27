import React, { useState } from "react"
import Base from "../core/Base"
import { Redirect } from "react-router-dom"

import { signin, authenticate, isAuthenticated } from "../auth/helper"

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  })

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated()

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true })
    signin({ email, password })
      .then(data => {
        if(data.error) {
          setValues({ ...values, error: data.error, loading: false })
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            })
          })
        }
      })
      .catch(console.log("signin request failed"))
  }

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/user/dashboard" />
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />
    }
  }

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    )
  }

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
    )
  }

  const signInForm = () => {
    return (
      <div className='container-fuild'>
      <div className="row">
      <div className='col-md-2'></div>
      <div className='col-md-4'>
        <img src='https://images.unsplash.com/photo-1596698338259-00c6169b63e2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI5fHxwdXBwaWVzJTIwYW5kJTIwaHVtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' />
      </div>
        <div className="col-md-4 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn mt-2 mb-2 text-white"
            style={{ backgroundColor: "#E92929", borderRadius: "12px" }}>
              Sign In
            </button>
          </form>
        </div>
      <div className='col-md-2'></div>
      </div>
      </div>
    )
  }

  return (
    <Base title="Sign In">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  )
}
// <p className="text-white text-center">{JSON.stringify(values)}</p>
export default Signin;
