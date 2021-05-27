import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper/index'
import Base from '../core/Base'
import { createaService, getCategories } from './helper/adminapicall'

const AddService = () => {
    const {user, token} = isAuthenticated()

    const [values, setValues] = useState({
        name:'',
        description:'',
        address: '',
        price:'',
        petsowned:'',
        photo:'',
        loading: false,
        error:'',
        createdService:'',
        getaRedirect: false,
        formData: ''       
    })
    const {name,
        description,
        address,
        price,
        petsowned,
        loading,
        error,
        createdService,
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
        createaService(user._id, token, formData)
        .then(data => {
            if(data?.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values,
                    name:'',
                    description:'',
                    address: '',
                    price:'',
                    petsowned:'',
                    photo:'',
                    loading: false,
                    createdService: data.name
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
        <div className='alert alert-success mt-3' style={{display: createdService ? '' : 'none'}}>
            <h4>{createdService} created successfully</h4>
        </div>
    )

    const createServiceForm = () => (
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
            <textarea
              onChange={handleChange("address")}
              name="address"
              className="form-control"
              placeholder="Address"
              value={address}
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
            <input
              onChange={handleChange("petsowned")}
              type="petsowned"
              className="form-control"
              placeholder="No. Of Pets Owned"
              value={petsowned}
            />
          </div>        
          <button type="submit" onClick={onSubmit} className="btn btn-danger mb-3">
            Create Profile
          </button>
        </form>
    )

    return (
        <Base
        title='Add a new profile'
        description='Welcome'
        className='container bg-warning p-4 rounded mt-5'
        >
            <Link to='/admin/dashboard' className='btn btn-md btn-danger mb-4'>Admin Home</Link>
            <div className='row bg-dark text-white rounded'>
                <div className='col-md-8 offset-md-2'>
                    {successMessage()}
                    {createServiceForm()}
                </div>
            </div>
        </Base>
    )
}

export default AddService