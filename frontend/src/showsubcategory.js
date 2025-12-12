
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Showsubcategory = () => {
    const[sub,setsub]=useState([])
    const[params]=useSearchParams()
    const id=params.get("id")
    useEffect(()=>{
        show();
    },[])
    const show= async()=>{
        try{
            const res=await fetch(`https://ecom-2-dmmb.onrender.com/api/subcat1/${id}`,{
                method:"get"
            })
            if(res.ok){
                const result=await res.json()
                if(result.statuscode===1){
                    setsub(result.dd)

                }
                else{
                    alert("didn't fetch")
                }
            }
    }catch(err){
        alert(err)
    }
}
    
  return (
    <div>
         <section className="section-b-space pt-0 ratio_asos">
       <div className="container">
           <div className="g-3 g-md-4 row row-cols-2 row-cols-md-3 row-cols-xl-4">
              
               {
               sub.length >0 ? 
           <>
           {sub.map((data)=>
           
           (
            <Link to={`/showproduct?id=${data._id}`}>
             
                <div>
                   <div className="basic-product theme-product-1">
                       <div className="overflow-hidden">
                           <div className="img-wrapper">
                               <div className="ribbon"><span>Exclusive</span></div>
                                
                               <a href="product-page(image-swatch).html">
                                   <img style={{height:"250px"}} src={`uploads/${data.subtype}`}
                                       className="img-fluid blur-up lazyload" alt="" />
                               </a>
                               <div className="rating-label"><i className="ri-star-fill"></i><span>4.5</span>
                               </div>
                               <div className="cart-info">
                                   <a href="#!" title="Add to Wishlist" className="wishlist-icon">
                                       <i className="ri-heart-line"></i>
                                   </a>
                                   <button data-bs-toggle="modal" data-bs-target="#addtocart" title="Add to cart">
                                       <i className="ri-shopping-cart-line"></i>
                                   </button>
                                   <a href="#!" data-bs-toggle="modal" data-bs-target="#quickView" title="Quick View">
                                       <i className="ri-eye-line"></i>
                                   </a>
                                   <a href="compare.html" title="Compare">
                                       <i className="ri-loop-left-line"></i>
                                   </a>
                               </div>
                           </div>
                    <div className="product-detail">
                               <div>
                                   <div className="brand-w-color">
                                       <a className="product-title" href="product-page(accordian).html">
                                       {data.catname}
                                       </a> 
                                      
                                   </div>
                                   <div className="brand-w-color">
                                       <a className="product-title" href="product-page(accordian).html">
                                       {data.subname}
                                       </a> 
                                      
                                   </div>
                                 
                                   
                               </div>
                             
                           </div> 
                       </div>
                   </div> 

               
                  
                   </div>
                   </Link>
                    )) }
                    </>
                  
                 :<h1>Data Not Fetched</h1>}
           </div>
       
       </div>
       </section>
      
    </div>
  )
}
export default Showsubcategory