import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const Product = () => {
    const[pname,setpname]=useState()
    const[pq,setpq]=useState()
    const[pimg,setpimg]=useState()
     const[pfetch,setpfetch]=useState([])
    const[catid,setcatid]=useState()

    const[clist,setclist]=useState([])
    const[sublist,setsublist]=useState([])
    
const[pprice,setprice]=useState()
const[pdescription,setdescription]=useState()

const[productid,setproductid]=useState()
const[oldpic,setoldpic]=useState()


    useEffect(()=>{
        data();
       
        data1()
    },[])
    const show=async()=>{
        const formdata=new FormData()
        formdata.append("catid",catid)
     
        formdata.append("pname1",pname)
        formdata.append("pq1",pq)
        formdata.append("pimg1",pimg)
        formdata.append("pprice",pprice)
        formdata.append("pdescription",pdescription)
        try{
            const res=await fetch("https://ecom-new-2-6hu0.onrender.com/api/product",{
                method:"post",
                body:formdata
            })
            if(res.ok){
                const result= await res.json()
                if(result.statuscode===1){
                    Swal.fire('Success', 'Added product', 'success')
                }
                else{
                    Swal.fire('Error', "Didn't add", 'error')
                }
            }
        }catch(err){
            Swal.fire('Error', err, 'error')
        }
    }
    const data=async()=>{
        try{
            const res=await fetch("https://ecom-new-2-6hu0.onrender.com/api/category1",{
                method:"get"
            })
            if(res.ok){
                const result=await res.json()
                if(result){
                    setclist(result.data1)

                }
                else{
                    Swal.fire('Error', "error", 'error')
                }
            }
        }catch(err){
            Swal.fire('Error', err, 'error')

        }
    }
    const data1=async()=>{
        try{
            const res=await fetch("https://ecom-new-2-6hu0.onrender.com/api/product1",{
                method:"get"
            })
            if(res.ok){
                const result=await res.json()
                if(result){
                    setpfetch(result.dd)

                }
                else{
                    Swal.fire('Error', "error", 'error')
                }
            }
        }catch(err){
            Swal.fire('Error', err, 'error')

        }
    }
   
    const del = async (pid) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        
        if (!result.isConfirmed) return;
    
        try {
            const res = await fetch(`https://ecom-new-2-6hu0.onrender.com/api/pdelete/${pid}`, {
                method: "delete"
            })
            if (res.ok) {
                const result = await res.json()
                if (result.statuscode === 1) {
                    setpfetch([])
                    data1()
                    Swal.fire('Deleted!', 'Your product has been deleted.', 'success')
                }
            }
        } catch (err) {
            Swal.fire('Error', err, 'error')
        }
    }
    const onupdate=(pdata)=>{
        setpname(pdata.pname)
        setpq(pdata.pq)
        setprice(pdata.pprice)
        setdescription(pdata.pdescription)
        setproductid(pdata._id)
        setoldpic(pdata.pimg)

    }
    const update=async()=>{
        const formdata=new FormData()
        formdata.append("pname",pname)
        formdata.append("pq",pq)
        formdata.append("pimg",pimg)
        formdata.append("pprice",pprice)
        formdata.append("pdescription",pdescription)
        formdata.append("oldpic",oldpic)
        formdata.append("productid",productid)
        try{
            const res= await fetch("https://ecom-new-2-6hu0.onrender.com/api/productupdate",{
                method:"put",
                body:formdata
            })
            if(res.ok){
                const result=await res.json()
                if(result.statuscode===1){
                    setpfetch([])
                    data1()
                    setpname('');
                    setpq('');
                    setprice('');
                    setdescription('');
                    Swal.fire('Success', 'Update Success', 'success')
                    
                }
                else{
                    Swal.fire('Error', "Product didn't update", 'error')
                }
            }
        }catch(err){
            Swal.fire('Error', err, 'error')
            
        }

    }

  return (
    <div>
        <section class="login-page section-b-space">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <h3>Add Products</h3>
                    <div class="theme-card">
                        <div class="theme-form">
                        <div class="form-box">
                            {
                            clist.length>0?<>
                                <label for="" class="form-label">Category Name</label>
                                <select class="form-control"  placeholder="categoryname" required="" onChange={(e)=>setcatid(e.target.value)}>
                                <option>choose category</option>

                                    {
                                    clist.map((data)=>
                                    <option value={data._id}> {data.categoryname}</option>
                                )}
                                    </select>
                                    </>:null}
                            </div>
                          
                            <div class="form-box">
                                <label for="email" class="form-label">Product price</label>
                                <input type="text" class="form-control"  placeholder="Product Price" required="" value={pprice} onChange={(e)=>setprice(e.target.value)}/>
                            </div>
                            <div class="form-box">
                                <label for="email" class="form-label">Product description</label>
                                <input type="text" class="form-control"  placeholder="Description" required="" value={pdescription} onChange={(e)=>setdescription(e.target.value)}/>
                            </div>





                        <div class="form-box">
                                <label for="email" class="form-label">Product Name</label>
                                <input type="text" class="form-control"  placeholder="Product Name" required="" value={pname} onChange={(e)=>setpname(e.target.value)}/>
                            </div>
                            <div class="form-box">
                                <label for="email" class="form-label">Quantity</label>
                                <input type="text" class="form-control"  placeholder="Product Quantity" required="" value={pq} onChange={(e)=>setpq(e.target.value)}/>
                            </div>
                            <div class="form-box">
                                <label for="review" class="form-label">Product Image</label>
                                <input type="file" class="form-control" id="review"
                                    placeholder="Subcategory Type" required="" onChange={(e)=>setpimg(e.target.files[0])}/>
                            </div>
                            <button class="btn btn-solid" onClick={show}>Add</button>
                            <button class="btn btn-solid" onClick={update} style={{marginLeft:"30px"}}>Product Update</button>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </section>
   
     <section className="section-b-space pt-0 ratio_asos">
       <div className="container">
           <div className="g-3 g-md-4 row row-cols-2 row-cols-md-3 row-cols-xl-4">
              
               {
               pfetch.length >0 ? 
           <>
           {pfetch.map((data)=>
           (
             
                <div>
                   <div className="basic-product theme-product-1">
                       <div className="overflow-hidden">
                           <div className="img-wrapper">
                               <div className="ribbon"><span>Exclusive</span></div>
                                
                               <a href="product-page(image-swatch).html">
                                   <img style={{height:"250px"}} src={`uploads/${data.pimg}`}
                                       className="img-fluid blur-up lazyload" alt="" />
                               </a>
                             
                           </div>
                    <div className="product-detail">
                               <div>
                                   <div className="brand-w-color">
                                       <a className="product-title" href="">
                                       {data.pname}
                                       </a> 
                                      
                                   </div>
                                   {/* <div className="brand-w-color">
                                       <a className="product-title" href="">
                                       {data.pq}
                                       </a>
                                   </div> */}



                                   <div className="brand-w-color">
                                      <h5><a className="product-title" href="">
                                      ₹ {data.pprice}
                                       </a></h5> 
                                   </div>
                                   <div className="brand-w-color">
                                     <h5>   <a className="product-title" href="">
                                      {data.pdescription}
                                       </a></h5>
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
                 :<h1>No Product Found</h1>}
           </div>
       
       </div>
       </section>
      
      
    </div>
  )
}

export default Product

