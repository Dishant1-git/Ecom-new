import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Productdetails = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [cartStatus, setCartStatus] = useState(null);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const productId = params.get("id");

  const { Loggedin, email, userid } = useSelector((state) => state.userslice);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (Loggedin && productId && userid) {
      checkCartStatus();
    }
  }, [Loggedin, productId, userid]);

  const fetchProductDetails = async () => {
    try {
      const res = await fetch(`https://ecom-new-2-6hu0.onrender.com/api/pdetails/${productId}`);
      if (!res.ok) throw new Error("Failed to fetch product details");

      const result = await res.json();
      if (result.statuscode === 1) {
        setProduct(result.dd);
        setQuantity(1);
      } else {
        throw new Error(result.message || "Invalid product data");
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Failed to load product details',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  const checkCartStatus = async () => {
    try {
      const res = await fetch("https://ecom-new-2-6hu0.onrender.com/api/checkcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid, idd: productId })
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const result = await res.json();

      if (result.statuscode === 2) {
        setCartStatus(2);
        setQuantity(result.existingQuantity || 1);
      } else if (result.statuscode === 3) {
        setCartStatus(3);
      } else {
        setCartStatus(null);
      }
    } catch (err) {
      console.error("Error checking cart status:", err);
      setCartStatus(null);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      const availableQuantity = product.pq || 1;
      if (newQuantity > 0 && newQuantity <= availableQuantity) {
        setQuantity(newQuantity);
      } else if (newQuantity > availableQuantity) {
        setQuantity(availableQuantity);
        Swal.fire({
          icon: 'warning',
          title: 'Quantity Limit',
          text: `Maximum available quantity is ${availableQuantity}`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  const addToCart = async () => {
    if (!Loggedin) {
      await Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to add items to your cart',
        confirmButtonText: 'OK',
      });
      navigate({
        pathname: '/login',
        search: `?pid=${productId}`,
      });
      return;
    }

    if (!userid) {
      Swal.fire({
        icon: 'error',
        title: 'User ID Missing',
        text: 'User ID is not available, please login again.',
      });
      return;
    }

    try {
      const tprice = product.pprice * quantity;

      const cartData = {
        userid: userid,
        pname: product.pname,
        pq: quantity,
        pimg: product.pimg,
        pprice: product.pprice,
        pdes: product.pdescription,
        email: email,
        tprice: tprice,
        productid: productId,
      };

      let apiResponse;

  //     if (cartStatus === 2) {
  //       const updateRes = await fetch("http://localhost:9000/api/updatecart",{
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //      body: JSON.stringify({
  //   userid: userid,
  //   productid: productId,
  //   pq: quantity,
  //   tprice: product.pprice * quantity
  // })
  //     });
       
  //       if (!updateRes.ok) throw new Error("Failed to update cart");
  //       apiResponse = await updateRes.json();
  //     }
       if (cartStatus===2 || cartStatus===1 ||cartStatus===3){
        const addRes = await fetch("https://ecom-new-2-6hu0.onrender.com/api/addcart", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cartData),
        });

        if (!addRes.ok) throw new Error("Failed to add to cart");
        apiResponse = await addRes.json();
      }

      if (apiResponse.statuscode === 1) {
        await Swal.fire({
          icon: 'success',
          title: cartStatus === 2 ? 'Updated' : 'Added',
          text: cartStatus === 2
            ? 'Cart quantity updated successfully'
            : 'Product added to cart successfully',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/addtocart");
      } else {
        throw new Error(apiResponse.message || 'Operation failed');
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Failed to update cart',
        confirmButtonText: 'OK',
      });
      await checkCartStatus();
    }
  };

  if (loading) return <div className="text-center mt-5">Loading product details...</div>;

  return (
    <div className="collection-wrapper">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="product-slick">
              <img
                src={`uploads/${product.pimg}`}
                alt={product.pname}
                className="w-100 img-fluid"
                style={{ height: "500px", objectFit: 'contain' }}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="product-page-details mt-0">
              <div className="trending-text mb-3">
                <img src="../assets/images/product-details/trending.gif" className="img-fluid" alt="" />
                <h5>Available Quantity: {product.pq}</h5>
              </div>

              <h2 className="main-title">{product.pname}</h2>

              <div className="price-text my-3">
                <h3><span className="fw-normal">MRP:</span> ₹{product.pprice}</h3>
                <span>Inclusive of all taxes</span>
              </div>

              <div className="accordion accordion-flush product-accordion" id="accordionFlushExample">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#desc" aria-expanded="false" aria-controls="desc">
                      Product Description
                    </button>
                  </h2>
                  <div id="desc" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <p>{product.pdescription}</p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#info" aria-expanded="true" aria-controls="info">
                      Information
                    </button>
                  </h2>
                  <div id="info" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <ul className="shipping-info">
                        <li><span>SKU: </span>SP18 (COPY)</li>
                        <li><span>Unit: </span>1 Item</li>
                        <li><span>Weight: </span>150 Gms</li>
                        <li><span>Stock Status: </span>In stock</li>
                        <li><span>Available Quantity: </span>{product.pq}</li>
                        <li>
                          <span>Quantity: </span>
                          <input
                            type="number"
                            min="1"
                            max={product.pq}
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="form-control d-inline-block ms-2"
                            style={{ width: '70px', display: 'inline' }}
                          />
                        </li>
                      </ul>
                      <button
                        className="btn btn-solid mt-4"
                        onClick={addToCart}
                        disabled={!product.pq || product.pq < 1}
                      >
                        {cartStatus === 2 ? 'Update Cart' : 'Add to Cart'}
                      </button>
                      {(!product.pq || product.pq < 1) && (
                        <p className="text-danger mt-2">This product is currently out of stock</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;
