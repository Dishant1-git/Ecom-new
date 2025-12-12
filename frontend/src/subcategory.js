import React, { useEffect, useState } from 'react'

const Subcategory = () => {
   
    const[subname,setsubname]=useState()
    const[subtype,setsubtype]=useState()
    const[sub,setsub]=useState([])
    const[catid,setcatid]=useState()
    const[list,setlist]=useState([])

    const[oldpic,setoldpic]=useState()
    const[subcategoryid,setsubcategoryid]=useState()
    useEffect(()=>{
        data();
        fetchc();

    },[])
    const show=async()=>{
        const formdata=new FormData()
        formdata.append("catid",catid)
        formdata.append("subname1",subname)
        formdata.append("subtype1",subtype)
        try{
            const res= await fetch("https://ecom-2-dmmb.onrender.com/api/subcategory",{
                method:'post',
                body:formdata
            })
            if(res.ok){
            
                const result= await res.json()
                if(result.statuscode===1){
                    alert("file saved")
                }
                else{
                    alert("error")
                }
            }

        }catch(err){
            alert(err)
        }
    }

    const fetchc=async()=>{
        try{
            const res= await fetch("http://localhost:9000/api/category1",{
                method:"get",
                headers:{'Content-type':"application/json; charset=UTF-8"}
            })
            if(res.ok){
                const result= await res.json()
                if(result.statuscode===1){
                    setlist(result.data1)
                }
                else{
                    alert("error")
                }
            }
        }catch(err){
            alert(err)
        }
    }








      const data=async()=>{
        try{
            const res= await fetch("http://localhost:9000/api/subcat",{
                method:"get",
            })
            if(res.ok){
                const result= await res.json()
                if(result.statuscode===1){
                    setsub(result.dd)
                }
                else{
                    alert("not fetch")
                }
            }
        }catch(err){
            alert(err)
        }
        

      }
      const del=async(sid)=>{
         try{
            const res= await fetch(`http://localhost:9000/api/sdelete/${sid}`,{
                method:"delete"
            })
            if(res.ok){
                const result= await res.json()
                if(result.statuscode===1){
                    setsub([])
                    data()
                }
            }
         
         }catch(err){
            alert(err)
         }


      }
      const onupdate=(sdata)=>{

        setsubname(sdata.subname)
        setoldpic(sdata.subtype)
        setsubcategoryid(sdata._id)
      }
      const update=async()=>{
        const formdata=new FormData()
        formdata.append("subname",subname)
        formdata.append("subtype",subtype)
        formdata.append("oldpic",oldpic)
        formdata.append("subcategoryid",subcategoryid)
        try{
            const res= await fetch("http://localhost:9000/api/updatesubcategory",{
                method:"put",
                body:formdata

            })
            if(res.ok){
                const result=await res.json()
                if(result.statuscode===1){
                    setsub([])
                    data()
                }
                else{
                    alert("data didn't update")

                }
            }
        }catch(err){
            alert(err)
        }

      }
  return (
    <div>
         <section className="login-page section-b-space">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <h3>Subcategory</h3>
                    <div className="theme-card">
                        <div className="theme-form">
                        <div className="form-box">
                            {
                                list.length>0?
                                (<>

                           
                                <label for="" className="form-label">Select Category</label>
                                <select className='form-control'   placeholder="Category Name" required=""  onChange={(e)=>setcatid(e.target.value)}>
                                   
                                   <option>choose category</option>
                                    {
                                        list.map((data)=>
                                            <option value={data._id}>{data.categoryname}</option>
                                        
                                        )
                                    }
                                    </select>
                                </>):null

                                 }
                            </div>
                            <div className="form-box">
                                <label for="email" className="form-label">Subcateogry Name</label>
                                <input type="text" className="form-control"  placeholder="Subcategory Name" required="" value={subname} onChange={(e)=>setsubname(e.target.value)}/>
                            </div>
                            <div className="form-box">
                                <label for="review" className="form-label">Subcategory Type</label>
                                <input type="file" className="form-control" id="review"
                                    placeholder="Subcategory Type" required="" onChange={(e)=>setsubtype(e.target.files[0])}/>
                            </div>
                            <button className="btn btn-solid" onClick={show}>Add Subcategory</button>
                            <button className="btn btn-solid" style={{marginLeft:"20px"}} onClick={update}>Update Subcategory</button>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </section>
    {/* { 
        showdata.length>0?<>
        {
            showdata.map((data)=>
                <div>
                    <h2>{data.catename}</h2>
                    <h2>{data.subname}</h2>
                    <img src={`uploads/${data.subtype}`}/>
                </div>
              )
        }

        </>:null
    } */}
     <section className="section-b-space pt-0 ratio_asos">
       <div className="container">
           <div className="g-3 g-md-4 row row-cols-2 row-cols-md-3 row-cols-xl-4">
              
               {
               sub.length >0 ? 
           <>
           {sub.map((data)=>
           (
             
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
                                   <button className='btn btn-solid' style={{marginLeft:"20px"}} onClick={()=>del(data._id)}>Delete</button>
                                   <button className='btn btn-solid'  style={{marginLeft:"20px"}} onClick={()=>onupdate(data)}>Update</button>
                                 
                                  
                                 
                                   
                               </div>
                             
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

export default Subcategory
