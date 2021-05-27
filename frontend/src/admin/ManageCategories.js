import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome admin" className='mt-5 text-white mb-5'>
      <h2 className="mb-4">All Breeds</h2>
      <Link className="btn btn-danger" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <table className="table">
            <thead className="thead-light">
              <th>Breed</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {categories.map((category, index) => {
                return (
                  <tr>
                    <td key={index}>{category.name}</td>
                    <td>
                      <button onClick={() => {}} className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-md-2"></div>
      </div>
    </Base>
  );
};

export default ManageCategories;
