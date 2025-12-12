import React from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Loginp from './login'
import Register from './register'
import Showdata from './Showdata'
import Category from './category'
import Subcategory from './subcategory'
import Product from './product'
import Showsubcategory from './showsubcategory'
import Showcate from './showcate'
import Showaddproduct from './showaddproduct'
import Productdetails from './productdetails'
import Userheader from './userheader'
import Home from './home'
import Addtocart from './addtocart'
import Checkout from './checkout'
import Deliveryaddress from './deliveryaddress'
import { Landing } from './landingpage'
import ContactUs from './contactus'
import ChatBot from './chatbot'
import { Adminroutes } from './protectroutes'
import { Userdata } from './userdata'

const  SiteRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Landing/>}></Route>
            <Route path="/login" element={<Loginp/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/category" element={<Adminroutes mycomp={Category}/>}></Route>
            <Route path="/scategory" element={<Adminroutes mycomp={Subcategory}/>}></Route>
            <Route path="/product" element={<Adminroutes mycomp={Product}/>}></Route>
            <Route path="/showsub" element={<Showsubcategory/>}></Route>
            <Route path="/showcat" element={<Showcate/>}></Route>
            <Route path="/showproduct" element={<Showaddproduct/>}></Route>
            <Route path="/productdetails" element={<Productdetails/>}></Route>
            <Route path="/userheader" element={<Userheader/>}></Route>
            <Route path="/home" element={<Adminroutes mycomp={Home}/>}></Route>
            <Route path="/addtocart" element={<Addtocart/>}></Route>
            <Route path="/checkout" element={<Checkout/>}></Route>
            <Route path="/deliveryaddress" element={<Deliveryaddress/>}></Route>
            <Route path="/contact" element={<ContactUs/>}></Route>
            <Route path="/chat" element={<ChatBot/>}></Route>
            <Route path="/alluser" element={<Adminroutes mycomp={Userdata}/>}></Route>  
        </Routes>
      
    </div>
  )
}

export default SiteRoutes
