import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {  Logout } from './reducer/userslice';
import context from './usecontext';

const Header = () => {
const location=useLocation()
const [info,setinfo]=useState(() => {
  try {
    const userData = sessionStorage.getItem('userinfo');
    console.log(userData)
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
});
 const { setUsertype } = useContext(context);

useEffect(()=>{
    const User=sessionStorage.getItem('userinfo');
    console.log(User)
    if(User){
        setinfo(JSON.parse(User));
    }
},[]);

 const {Loggedin}=useSelector((state)=>
        {
            return state.userslice
        })
      const  navigate=useNavigate()
    
        const dispatch=useDispatch()
    
        const onlogout=()=>
        {
             setUsertype(null)
            dispatch(Logout())
            sessionStorage.clear()
         
            navigate("/login")
        }


   
  return (
    <div>
       <header>
        <div class="top-header">
            <div class="mobile-fix-option"></div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="header-contact">
                            <ul>
                               <li>Welcome {Loggedin?<><span style={{color:"#ec8951"}}>{info.firstname}</span></>:<><span style={{color:"#ec8951"}}>Guest</span></>}  to Our store Bakery</li>
                                <li><i class="ri-phone-fill"></i>Call Us: 123 - 456 - 7890</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6 text-end">
                        <ul class="header-dropdown">
                          
                            <li class="onhover-dropdown mobile-account"> <i class="ri-user-fill"></i>
                                My Account
                               <ul class="onhover-show-div">{ Loggedin?<>
                                                                   <li onClick={onlogout}><Link>logout</Link></li></>:
                                                                   <>
                                                                   <li><Link to="/login">login</Link></li>
                                                                   <li><Link to="/register">Register</Link></li></>}
                                                               </ul>
                            </li>
                        </ul>
                    </div>  
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="main-menu">
                        <div class="menu-left">
                           
                            <div class="brand-logo">
                                <a href="">
                                    <img src="../assets/images/bakery.png" class="img-fluid blur-up lazyload" alt="" style={{height:"75px"}}/>
                                </a>
                            </div>
                        </div>
                        <div class="menu-right pull-right">
                            <div>
                                <nav id="main-nav">
                                    <div class="toggle-nav"><i class="ri-bar-chart-horizontal-line sidebar-bar"></i>
                                    </div>
                                    <ul id="main-menu" class="sm pixelstrap sm-horizontal">
                                        <li class="mobile-box">
                                            <div class="mobile-back text-end">Menu<i class="ri-close-line"></i></div>
                                        </li>
                                        <li><Link to="/home">Home</Link></li>
                                        <li><Link to="/alluser">User List</Link></li>
                                        <li><Link to="/category">Add Category</Link></li>
                                       
                                        <li>
                                            <Link to="/product">Add Product</Link>
                                         </li>
                                       
                          
                      
                        
                                    </ul>
                                </nav>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    </div>
  )
}

export default Header
