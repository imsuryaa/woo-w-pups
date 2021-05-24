import React from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper/index'
import { Link } from 'react-router-dom'


const UserDashBoard = () => {
    
    const { user: {name, email, role} } = isAuthenticated()
    const userLeftSide = () => {
        return (
            <div className='card'>
                <h4 className='card-header bg-dark text-white'>
                    User Panel
                </h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link to='/' className='nav-link text-success'>Profile</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/' className='nav-link text-success'>Bookings</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/' className='nav-link text-success'>Manage Bookings</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/' className='nav-link text-success'>Customer Support</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const userRightSide = () => {
        return(
            <div className='card mb-4'>
                <h4 className='card-header'>User Information</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <span className='badge bg-success mr-2'>Name: </span> {name}
                    </li>
                    <li className='list-group-item'>
                        <span className='badge bg-success mr-2'>Email: </span> {email}
                    </li>
                    <li className='list-group-item'>
                        <span className='badge bg-danger'>User Area</span>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Base 
        title='Welcome to Dashboard'
        className='container p-4'
        >
            <div className='row' style={{backgroundColor: "#E8BD0D"}}>
                <div className='col-3'>
                {userLeftSide()}
                </div>
                <div className='col-9'>
                {userRightSide()}
                </div>
            </div>
        </Base>
    )
}

export default UserDashBoard