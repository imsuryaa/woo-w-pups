import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { getOrders } from './helper/adminapicall'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const {user, token} = isAuthenticated()
    const preload = () => {
        console.log(user._id);
        getOrders(user._id, token).then(data => {
            if(data) {
                setOrders(data)
                //console.log(data.error);
            } 
            // else {
            //     setOrders(data)
            // }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    return (
        <Base title="Welcome admin" className='mt-5 text-white mb-5'>
        <h2 className="mb-4">All Orders</h2>
        <Link className="btn btn-danger" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
        </Link>
        <div className="row">
        <div className='col-md-2'></div>
            <div className="col-md-8">
            <table className='table'>
                <thead className='thead-light'>
                    <th>Booking ID</th>
                    <th>Name</th>
                    <th>Dogs Name</th>
                    <th>Payment Status</th>
                    <th>Booking Date & Time</th>
                    <th>No. of Days Booked</th>
                    <th>Deliver Status</th>
                </thead>
                <tbody>
                    {orders.map((order, index) => {
                        return (
                            <tr>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>
                                <td>{order.products[0]['name']}</td>
                                <td>{order.status}</td>
                                <td>{order.createdAt.substring(0,16).replace('T', ' ')}</td>
                                <td>{order.products[0]['count']}</td>
                                <td>
                                    <button onClick={() => {
                                        }} className="btn btn-danger">
                                        Deliver
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
            <div className='col-md-2'></div>
        </div>
        </Base>
    )
} 

export default Orders