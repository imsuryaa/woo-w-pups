import React, {useState, useEffect} from 'react'
import '../styles.css'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import PaymentB from './PaymentB'
// import StripeCheckout from './StripeCheckout'

const Cart = () => {
    
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    
    useEffect(() => {
        setProducts(loadCart())
        // [reload] is used for remount the component or force reload after updating items in cart
    }, [reload])

    const loadAllProducts = (products) => {
        return (
            <div>
                <div className="card text-white bg-dark border border-warning">
                    <h2>Have a great time with the buddy</h2>
                </div>
                {products.map((product, index) => (
                    <Card 
                        key={index}
                        product={product}
                        removeFromCart={true}
                        addtoCart={false}
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <div>
                <h2>This section is for checkout</h2>
            </div>
        )
    }

    return (
        <Base title='Checkout'>
            <div className='row text-center mt-5'>
            <div className='col-md-2'></div>
                <div className='col-md-4'>
                    {products.length == 1 ? loadAllProducts(products) : (
                        <h3>Your Checkout is Empty</h3>
                    )}
                </div>
                <div className='col-md-4'>
                    <PaymentB products={products} setReload={setReload} />
                </div>
            <div className='col-md-2'></div>
            </div>
        </Base>
    )
}

export default Cart