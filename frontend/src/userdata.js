import { useEffect, useState } from "react";

export const Userdata = () => {


    const [user, setuser] = useState([])

    useEffect(() => {

        getuser()
    }, [])




    const getuser = async () => {

        const res = await fetch("https://ecom-2-dmmb.onrender.com/api/alluser", {

            method: "GET"

        });
        if (res.ok) {
            const result = await res.json()
            if (result.statuscode === 1) {
                setuser(result.userlist)

            }
            else {
                alert("No data Fetched")
            }

        }



    }

    const del= async(id)=>{
        const confirm=window.confirm("Do you treally want to delete user");
        if(confirm===true){

        const res= await fetch(`https://ecom-2-dmmb.onrender.com/api/deleteuser/${id}`,{
            method:"DELETE"
        });
        if(res.ok){
            const result=await res.json();
            if(result.statuscode===1){
                alert("User deleted")
                getuser();
                setuser([])
            }
            else{
                alert("error occured")
            }
        }


    }

   
    }
    const changeu = async (id, newType) => {
        const res = await fetch(`https://ecom-2-dmmb.onrender.com/api/updateuser/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usertype: newType })
        });
        if (res.ok) {
            const result = await res.json();
            if (result.statuscode === 1) {
                alert("User type updated");
                getuser();
            } else {
                alert("Error updating user type");
            }
        }
    }
    return (


        <>

            <h1>ALL user</h1>

            <table className="table table-bordered table-striped mt-3">
                <tr>
                    <td>Userid</td>
                    <td>FirstName</td>
                    <td>lastname</td>
                    <td>Email</td>
                    <td>Usertype</td>
                    <td>Change userType</td>
                    <td>Delete user</td>
                </tr>
                {
                    user.map((data, i) => (

                        <tr key={i}>
                             <td>{data._id}</td>
                            <td>{data.firstname}</td>
                            <td>{data.lastname}</td>
                            <td>{data.email}</td>
                            <td>{data.usertype}</td>
                            <td>
                                <button className="btn btn-solid w-auto" onClick={() => changeu(data._id, "Admin")}>Admin</button>
                                <button className="btn btn-solid w-auto" onClick={() => changeu(data._id, "User")}>User</button>
                            </td>
                            <td><button className="btn btn-solid w-auto" onClick={()=>(del(data._id))}>Delete</button></td>


                        </tr>


                    ))
                }


            </table>
        </>
    )
}