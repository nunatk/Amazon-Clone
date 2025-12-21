import React from 'react'
import { Routes, Route } from "react-router-dom";
import Landing from './Pages/Landing/Landing';
import SignUp from './Pages/Auth/SignUp';
import Payment from './Pages/Payment/Payment';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart'
import SingleProduct from './Pages/ProductDetail/SingleProduct'
import Results from './Pages/Results/Results';
function Routing() {
  return (

      <Routes>
        <Route path='/' element={<Landing/>}/>
       <Route path='/auth' element={<SignUp/>}/>
       <Route path='/payments' element={<Payment/>}/>
       <Route path='/orders' element={<Orders/>}/>
       <Route path='/cart' element={<Cart/>}/>
       <Route path="/product/:id" element={<SingleProduct />} />
       <Route path="/category/:category" element={<Results />} />
      </Routes>

  )
}

export default Routing