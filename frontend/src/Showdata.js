import React, { useEffect, useState } from 'react'

const Showdata = () => {
    const[list,setlist]=useState([])
    useEffect(()=>{
        datafetch()
    },[])
     const datafetch=async()=>{
try{
    const res= await fetch("https://ecom-2-dmmb.onrender.com/api/fetchdata",{
        method:"get",
    })
    if(res.ok){
        const result=await res.json()
        if(result.statuscode===1){
setlist(result.data)
        }else{
            alert("data is not fetch")
        }
    }
   
}catch(err){
alert(err)
}

     }
  return (
    <>
   {list.map((data)=>
   <div>
     <h2>{data.firstname}</h2>
     <h2>{data.lastname}</h2>
     <h2>{data.email}</h2>
     <h2>{data.password}</h2>
     </div>
     )}
    </>
  )
}

export default Showdata
