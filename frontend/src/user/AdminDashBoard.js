import React from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper/index'
import { Link } from 'react-router-dom'


const AdminDashBoard = () => {
    
    const { user: {name, email, role} } = isAuthenticated()
    const adminLeftSide = () => {
        return (
            <div className='card'>
                <h4 className='card-header bg-dark text-white'>
                    Admin Panel
                </h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link to='/admin/create/category' className='nav-link text-dark'>Create Breed</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/create/product' className='nav-link text-dark'>Create Profile</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/create/service' className='nav-link text-dark'>Create a Pet Sitter</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/categories' className='nav-link text-dark'>Manage Breeds</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/products' className='nav-link text-dark'>Manage Profiles</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/orders' className='nav-link text-dark'>Manage Bookings</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const adminRightSide = () => {
        return(
            <div className='card mb-4'>
                <h4 className='card-header bg-dark text-white'>Admin Information</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <span className='badge bg-success mr-2'>Name: </span> {name}
                    </li>
                    <li className='list-group-item'>
                        <span className='badge bg-success mr-2'>Email: </span> {email}
                    </li>
                    <li className='list-group-item'>
                        <span className='badge bg-danger'>Admin Area</span>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Base 
        title='Welcome to Admin Dashboard' 
        description='Manage all your products here'
        className='container p-4'
        >
            <div className='row' >
                <div className='col-3'>
                {adminLeftSide()}
                </div>
                <div className='col-9'>
                {adminRightSide()}
                </div>
            </div>
        </Base>
    )
}

export default AdminDashBoard