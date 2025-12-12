
import React, { useEffect, useState } from 'react'

const Category = () => {
    const [cname, setcname] = useState()
    const [ctype, setctype] = useState()
    const [fetchd, setfetchd] = useState([])
    const [categoryid, setcategoryid] = useState()
    const [oldpic, setoldpic] = useState()
    useEffect(() => {
        cat();

    }, [])

    const show = async () => {
        const formdata = new FormData();
        formdata.append("cname1", cname)
        formdata.append("ctype1", ctype)
        try {
            const res = await fetch("https://ecom-new-2-6hu0.onrender.com/api/category", {
                method: "post",
                body: formdata,
            })
            if (res.ok) {
                const result = await res.json()
                if (result.statuscode === 1) {
                    alert("category Added")
                }
                else {
                    alert("error")
                }

            }

        }
        catch (err) {
            alert(err)
        }


    }
    const cat = async () => {

        try {
            const res = await fetch("https://ecom-2-dmmb.onrender.com/api/category1", {
                method: "get"
            })
            if (res.ok) {
                const result = await res.json()
                if (result.statuscode === 1) {
                    setfetchd(result.data1)

                }
                else {
                    alert("data did not fetch")
                }
            }
        } catch (err) {
            alert(err)
        }

    }
    const del = async (cid) => {

        try {
            const res = await fetch(`https://ecom-2-dmmb.onrender.com/api/delete/${cid}`, {
                method: "delete"
            })
            if (res.ok) {
                const result = await res.json()
                if (result.statuscode === 1) {
                    setfetchd([])
                    cat()

                } else {
                    alert("data not deleted")
                }
            }
        } catch (err) {
            alert(err)
        }

    }


    const onupdate = (cdata) => {
        setcname(cdata.categoryname)
        setcategoryid(cdata._id)
        setoldpic(cdata.categorytype)



    }
    const update = async () => {
        const formdata = new FormData()
        formdata.append("cname", cname)
        formdata.append("categoryid", categoryid)
        formdata.append("oldpic", oldpic)
        formdata.append("ctype", ctype)

        try {
            const res = await fetch("https://ecom-2-dmmb.onrender.com/api/categoryupdate", {
                method: "put",
                body: formdata,
            })
            if (res.ok) {
                const result = await res.json()
                if (result.statuscode === 1) {
                    setfetchd([])
                    cat()
                    alert('category updated')
                }
                else {
                    alert("category didn't update")
                }


            }
        } catch (err) {
            alert(err)
        }

    }
    return (
        <div>
            <section class="login-page section-b-space">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6">
                            <h3>Category </h3>
                            <div class="theme-card">
                                <div class="theme-form">
                                    <div class="form-box">
                                        <label for="email" class="form-label">Category Name</label>
                                        <input type="text" class="form-control" id="email" placeholder="Category name" required="" value={cname} onChange={(e) => setcname(e.target.value)} />
                                    </div>
                                    <div class="form-box">
                                        <label for="review" class="form-label">Category Type</label>
                                        <input type="file" class="form-control" id="review"
                                            placeholder="Category type" required="" onChange={(e) => setctype(e.target.files[0])} />
                                    </div>
                                    <button class="btn btn-solid" onClick={show}>ADD</button>
                                    <button class="btn btn-solid" onClick={update} style={{ marginLeft: "50px" }}>Update</button>
                                </div>
                            </div>
                        </div>
                        {/* <div class="col-lg-6 right-login">
                    <h3>New Customer</h3>
                    <div class="theme-card authentication-right">
                        <h6 class="title-font">Create A Account</h6>
                        <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to be
                            able to order from our shop. To start shopping click register.</p>
                        <a href="register.html" class="btn btn-solid">Create an Account</a>
                    </div>
                </div> */}
                    </div>
                </div>
            </section>

            <section className="section-b-space pt-0 ratio_asos">
                <div className="container">
                    <div className="g-3 g-md-4 row row-cols-2 row-cols-md-3 row-cols-xl-4">

                        {
                            fetchd.length > 0 ?
                                <>
                                    {fetchd.map((data) =>
                                    (

                                        <div>
                                            <div className="basic-product theme-product-1">
                                                <div className="overflow-hidden">
                                                    <div className="img-wrapper">
                                                        <div className="ribbon"><span>Exclusive</span></div>

                                                        <a href="product-page(image-swatch).html">
                                                            <img style={{ height: "250px" }} src={`uploads/${data.categorytype}`}
                                                                className="img-fluid blur-up lazyload" alt="" />
                                                        </a>


                                                    </div>
                                                    <div className="product-detail">
                                                        <div>
                                                            <div className="brand-w-color" style={{ marginLeft: "100px" }}>
                                                                <a className="product-title" href="product-page(accordian).html">
                                                                    {data.categoryname}
                                                                </a>

                                                            </div>
                                                        </div>

                                                        <button className='btn btn-solid' style={{ marginLeft: "20px" }} onClick={() => del(data._id)}>Delete</button>
                                                        <button className='btn btn-solid' style={{ marginLeft: "20px" }} onClick={() => onupdate(data)}>Update</button>

                                                    </div>
                                                </div>
                                            </div>



                                        </div>
                                    ))}
                                </>
                                : <h1>Data Not Fetched</h1>}
                    </div>

                </div>

            </section>



        </div>
    )
}

export default Category
