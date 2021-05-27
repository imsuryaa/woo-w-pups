import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper/index'
import Base from '../core/Base'
import { createaProduct, getCategories } from './helper/adminapicall'

const AddProduct = () => {
    const {user, token} = isAuthenticated()

    const [values, setValues] = useState({
        name:'',
        description:'',
        gender: '',
        price:'',
        stock:'',
        photo:'',
        categories:[],
        category:'',
        loading: false,
        error:'',
        createdProduct:'',
        getaRedirect: false,
        formData: ''       
    })
    const {name,
        description,
        gender,
        price,
        stock,
        categories,
        category,
        loading,
        error,
        createdProduct,
        getaRedirect,
        formData
    } = values
    const preload = () => {
        getCategories().then(data => {
            console.log(data);
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, categories: data, formData: new FormData()})
                // console.log(categories);
            }
        })
    }
    useEffect(() => {
        preload()
    }, [])
    const onSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: '', loading: true})
        createaProduct(user._id, token, formData)
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values,
                    name:'',
                    description:'',
                    gender:'',
                    price:'',
                    stock:'',
                    photo:'',
                    loading: false,
                    createdProduct: data.name
                })
            }
        })
    }
    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]: value})
    }

    const successMessage = () => (
        <div className='alert alert-success mt-3' style={{display: createdProduct ? '' : 'none'}}>
            <h4>{createdProduct} created successfully</h4>
        </div>
    )

    const createProductForm = () => (
        <form >
          <span>Upload photo</span>
          <div className="form-group">
            <label className="btn btn-block bg-danger">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="description"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("gender")}
              name="gender"
              className="form-control"
              placeholder="Gender: Male (or) Female"
              value={gender}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="price"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select Breed</option>
              {categories && 
                categories.map((cate, index) => (
                 <option key={index} value={cate._id}>{cate.name}</option>   
                ))
                }
            </select>
          </div>          
          <button type="submit" onClick={onSubmit} className="btn btn-danger mb-3">
            Create Profile
          </button>
        </form>
    )

    return (
        <Base
        title='Add a new profile'
        description='Welcome to Product creation section'
        className='container bg-warning p-4 rounded mt-5 mb-5'
        >
            <Link to='/admin/dashboard' className='btn btn-md btn-danger mb-4'>Admin Home</Link>
            <div className='row bg-dark text-white rounded'>
                <div className='col-md-8 offset-md-2'>
                    {successMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    )
}

export default AddProduct