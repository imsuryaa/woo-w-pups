import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './core/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import UserDashBoard from './user/UserDashBoard'
import AdminDashBoard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import ManageCategories from './admin/ManageCategories'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import Cart from './core/Cart'
import Orders from './admin/Orders'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/signup' component={Signup} />
                <Route path='/signin' component={Signin} />
                <Route path='/cart' component={Cart} />
                <PrivateRoute path='/user/dashboard' exact component={UserDashBoard}/>
                <AdminRoute path='/admin/dashboard' exact component={AdminDashBoard}/>
                <AdminRoute path='/admin/create/category' exact component={AddCategory}/>
                <AdminRoute path='/admin/categories' exact component={ManageCategories}/>
                <AdminRoute path='/admin/create/product' exact component={AddProduct}/>
                <AdminRoute path='/admin/products' exact component={ManageProducts}/>
                <AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct}/>
                <AdminRoute path='/admin/orders' exact component={Orders}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes