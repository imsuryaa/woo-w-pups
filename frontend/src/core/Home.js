import React, {useState, useEffect} from 'react'
import '../styles.css'
import { API } from '../backend'
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'

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
        <Base title='Home' description='Connecting with pets'>
        <h1 className='text-white'>Connect with these Buddy's</h1>
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
        </Base>
    )
}
