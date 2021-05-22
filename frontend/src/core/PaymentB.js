import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cartHelper'
import { createOrder } from './helper/orderHelper'
import { getmeToken, processPayment } from './helper/paymentbHelper'
import DropIn from 'braintree-web-drop-in-react'


const PaymentB = ({products, setReload = f => f, reload = undefined}) => {
    
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getmeToken(userId, token).then(info => {
            // console.log('INFORMATION',info)
            if(info.error) {
                setInfo({...info, error: info.error})
            } else {
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })
    }

    const showBrainTreeDropIn = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options= {{authorization: info.clientToken}}
                            onInstance= {instance => {info.instance = instance}}
                        />
                        <button className='btn btn-danger' onClick={onPurchase}>Make Payment</button>
                        <br />
                        <br />
                        <button className='btn btn-danger' onClick={()=>{}}>Pay Later</button>
                    </div>
                ) : (<h3>Please Login</h3>)}
            </div>
        )
    }


    useEffect(() => {
        getToken(userId, token)
    }, [])
    
    const onPurchase = () => {
        setInfo({loading: true})
        let nonce
        let getNonce = info.instance.requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount()
                }
                processPayment(userId, token, paymentData)
                .then(response => {
                    setInfo({...info, loading: false , success: response.success})
                    console.log('PAYMENT SUCCESS');
                    // todo empty cart
                    const orderData = {
                        products: products,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount
                    }
                    createOrder(userId, token, orderData)
                    cartEmpty(() => {
                        console.log('any crash..?');
                    })
                    setReload(!reload)
                })
                .catch(error => {
                    setInfo({loading: false, success: false})
                    console.log('PAYMENT FAILED');
                })
            })
    }

    const getAmount = () => {
        let amount = 0
        products.map((p, index) => {
            amount = amount + p.price
        })
        return amount
    }

    return (
        <div>
        <div className="card text-white bg-dark border border-warning">
            <h2>Make Payment for <span className='btn btn-warning rounded'>$ {getAmount()}</span></h2>
            </div>    
            {showBrainTreeDropIn()}
            
        </div>
    )
}

export default PaymentB
