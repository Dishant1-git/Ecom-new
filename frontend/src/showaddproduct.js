import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css' 
import Swal from 'sweetalert2' 

const Showaddproduct = () => {
    const [pfetch, setpfetch] = useState([])
    const [params] = useSearchParams()
    const id = params.get("id")

    useEffect(() => {
        data()
    }, [])

    const data = async () => {
        try {
            const res = await fetch(`https://ecom-new-2-6hu0.onrender.com/api/showproduct/${id}`, {
                method: "get"
            })
            if (res.ok) {
                const result = await res.json()
                if (result) {
                    setpfetch(result.dd)
                }
                else {
                    Swal.fire('Error', 'Failed to fetch products', 'error')
                }
            }
        } catch (err) {
            Swal.fire('Error', err.message || 'Network error', 'error')
        }
    }

    return (
        <div>
            <section className="section-b-space pt-0 ratio_asos">
                <div className="container">
                    <div className="g-3 g-md-4 row row-cols-2 row-cols-md-3 row-cols-xl-4">
                        {pfetch.length > 0 ? (
                            pfetch.map((data) => (
                                <Link to={`/productdetails?id=${data._id}`} key={data._id}>
                                    <div>
                                        <div className="basic-product theme-product-1">
                                            <div className="overflow-hidden">
                                                <div className="img-wrapper">
                                                    <div className="ribbon"><span>Exclusive</span></div>
                                                    <img 
                                                        style={{height: "250px"}} 
                                                        src={`uploads/${data.pimg}`}
                                                        className="img-fluid blur-up lazyload" 
                                                        alt={data.pname} 
                                                    />
                                                    <div className="cart-info">
                                                        <button title="Add to Wishlist" className="wishlist-icon">
                                                            <i className="ri-heart-line"></i>
                                                        </button>
                                                        <button title="Add to cart">
                                                            <i className="ri-shopping-cart-line"></i>
                                                        </button>
                                                        <button title="Quick View">
                                                            <i className="ri-eye-line"></i>
                                                        </button>
                                                        <button title="Compare">
                                                            <i className="ri-loop-left-line"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="product-detail">
                                                    <div>
                                                        <div className="brand-w-color">
                                                            <span className="product-title">{data.pname}</span>
                                                        </div>
                                                        <div className="brand-w-color">
                                                            <span className="product-title">Price: ₹{data.pprice}</span>
                                                        </div>
                                                        <div className="brand-w-color">
                                                          <span className="product-title"> <p>{data.pdescription}</p> </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : <h1>No Products Found</h1>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Showaddproduct