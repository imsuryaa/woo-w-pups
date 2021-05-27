import React, {useState, useEffect} from 'react'
import '../styles.css'
import { API } from '../backend'
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'
import banner from './../assets/banner.png'
import Testimonials from './Testimonials'

export default function Home() {
    // fetching products from backend and initially it will be an empty array
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProduct = () => {
        getProducts().then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        loadAllProduct()
    }, [])
    console.log('API IS', API);
    return (
        <Base>
            <div className='container-fluid' style={{padding: "0px"}}>
                <img src={banner}  width="100%" />
            </div>
        <br />
        <h1 className='text-white'>Checkout variety of pups here</h1>
        <br />
            <div className='row text-center'>
                    {products.map((product, index) => {
                        return (
                            <div key={index} className='col-md-3'>
                                <Card product={product} />
                            </div>
                        )
                    })}
            </div>
        <br />
        <h1 className='text-center mt-3'>Testimonials</h1>
        <Testimonials />
        </Base>
    )
}
