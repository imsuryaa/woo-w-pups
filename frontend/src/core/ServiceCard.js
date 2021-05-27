import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import ServiceImageHelper from './helper/ServiceImageHelper'

const ServiceCard = ({service, addtoCart = true, removeFromCart = false, setReload = f => f, reload = undefined}) => {

  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(service.count)

  const cardTitle = service ? service.name : 'Photo from pixels'
  const cardDescription = service ? service.description : 'Default description'
  const cardPrice = service ? service.price : 'DEFAULT'

  const addToCart = () => {
      addItemToCart(service, () => setRedirect(true))
  }

  // setting initial state in this function
  const getRedirect = (redirect) => {
    if(redirect) {
      return <Redirect to='/cart' />
    }
  }

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
          <button
                onClick={addToCart}
                className="btn mt-2 mb-2 text-white"
                style={{ backgroundColor: "#E92929", borderRadius: "12px" }}
          >
                Request
          </button>
      )
    )
  }

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
                onClick={() => {
                  removeItemFromCart(service._id)
                  setReload(!reload)
                }}
                className="btn mt-2 mb-2 text-white"
                style={{ backgroundColor: "#E92929", borderRadius: "12px" }}
              >
                Delete
              </button>
      )
    )
  }
    return (
      <div className="card text-white bg-dark border border-warning mb-3">
        <div className="card-header">{cardTitle}</div>
        <div className="card-body">
        {getRedirect(redirect)}
          <ServiceImageHelper service={service} />
          <p className="lead font-weight-normal text-wrap">
            {cardDescription}
          </p>
          <div className="row">
            <div className="col-md-4 offset-4">
              <p className="btn btn-warning rounded  btn-sm px-4">$ {cardPrice} /Day</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addtoCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
};

export default ServiceCard