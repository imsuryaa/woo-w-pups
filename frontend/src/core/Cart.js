import React, {useState, useEffect} from 'react'
import '../styles.css'
import { API } from '../backend'
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
                <h2>This section is to load products</h2>
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
        <Base title='Cart Page' description='Checkout'>
            <div className='row text-center'>
                <div className='col-6'>
                    {products.length > 0 ? loadAllProducts(products) : (
                        <h3>Nothing in cart</h3>
                    )}
                </div>
                <div className='col-6'>
                    <PaymentB products={products} setReload={setReload} />
                </div>
            </div>
        </Base>
    )
}

export default Cart