import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import context from "./usecontext";

export const Adminroutes=(props)=>{

     const { Loggedin,} = useSelector((state) => state.userslice); 

     const{usertype}=useContext(context)

 const navigate=useNavigate()
useEffect(()=>{
    if(!Loggedin){
        navigate("/login")

    }
    else{
        if(usertype!=="Admin"){
            navigate("/login")
        }
    }

})

return(
    <>
<props.mycomp/>
    </>
)


}