import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Showalldata = () => {
      const[fetchd,setfetchd]=useState([])
      
        useEffect(()=>{
            cat();
    
        },[])
    const cat=async()=>{
      
        try{
            const res= await fetch("https://ecom-2-dmmb.onrender.com/api/category1",{
                method:"get"
            })
            if(res.ok){
                const result= await res.json()
                if(result.statuscode===1){
                    setfetchd(result.data1)
                    
                }
                else{
                    alert("data did not fetch")
                }
            }
        }catch(err){
            alert(err)
        }
        
    }
  return (
    <div>
         <h2 style={{marginLeft:"600px",marginBottom:"50px"}}>Category Products</h2>
        <section className="section-b-space pt-0 ratio_asos">
       <div className="container">
           <div className="g-3 g-md-4 row row-cols-2 row-cols-md-3 row-cols-xl-4">
           
              
               {
               fetchd.length >0 ? 
           <>
           {fetchd.map((data)=>
           (
             
                <div>
                    
                   <div className="basic-product theme-product-1">
                       <div className="overflow-hidden">
                           <div className="img-wrapper">
                               <div className="ribbon"><span>Exclusive</span></div>
                                
                               <a href="product-page(image-swatch).html">
                                   <img style={{height:"250px"}} src={`uploads/${data.categorytype}`}
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
                                   <div className="brand-w-color"style={{marginLeft:"100px"}}>
                                       <a className="product-title" href="product-page(accordian).html">
                                       {data.categoryname}
                                       </a> 
                                      
                                   </div>  
                               </div>

                               {/* <button className='btn btn-solid' style={{marginLeft:"20px"}} onClick={()=>del(data._id)}>Delete</button> */}
                             {/* <button className='btn btn-solid'  style={{marginLeft:"20px"}}onClick={()=>onupdate(data)}>Update</button> */}
                             
                           </div> 
                       </div>
                   </div> 

               
                  
                   </div>
                    )) }
                    </>
                 :<h1>Data Not Fetched</h1>}
           </div>
       
       </div>
       
       </section>
      
    </div>
  )
}

export default Showalldata
