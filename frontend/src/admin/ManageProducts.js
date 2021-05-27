import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { deleteProduct, getProducts } from './helper/adminapicall'

const ManageProducts = () => {

    const [products, setProducts] = useState([])
    const {user, token} = isAuthenticated()
    const preload = () => {
        getProducts().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const deleteThisProduct = productId => {
        deleteProduct(productId, user._id, token)
        .then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                preload()
            }
        })
    }

    return (
        <Base title="Welcome admin" className='mt-5 text-white mb-5'>
        <Link className="btn btn-danger" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
        </Link>
        <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <table className="table">
            <thead className="thead-light">
              <th>List of Dogs</th>
              <th>Breed</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr>
                    <td key={index}>{product.name}</td>
                    <td>{product.category.name}</td>
                    <td>
                        
                        <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                >
                    <span className="">Update</span>
                </Link>
                   
                      <button onClick={deleteThisProduct()} className="btn btn-danger">
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
    )
}

export default ManageProducts
