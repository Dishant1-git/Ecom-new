import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CartContext } from './cartcontext';

const Addtocart = () => {
 
    const [loading, setLoading] = useState(true);

     const { cartData, setCartData, totalPrice } = useContext(CartContext);
    const navigate = useNavigate();
  const {Loggedin,userid}=useSelector((state)=>
          {
              return state.userslice
          })

    useEffect(() => {
        if (Loggedin) {
            fetchCartData();
        } 
        else{
            navigate('/login')
        }
    }, [Loggedin,userid]);

    const fetchCartData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://ecom-new-2-6hu0.onrender.com/api/cartdata/${userid}`);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch cart data');
            }

            if (result.statuscode === 1) {
                // Add quantity field to each item if not present
                const itemsWithQuantity = result.data.map(item => ({
                    ...item,
                    qnt: item.productquantity || 1
                }));
                setCartData(itemsWithQuantity);
            } else {
                setCartData([]);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to load cart items',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };


    // const updateCartItem = async (productId, newQuantity) => {
    //     try {
    //         const response = await fetch('http://localhost:9000/api/updatecart', {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    //             },
    //             body: JSON.stringify({
    //                 userid,
    //                 productid: productId,
    //                 newQuantity,
    //                 productprice: cartData.find(item => item.productid === productId).productprice
    //             })
    //         });

    //         const result = await response.json();

    //         if (!response.ok || result.statuscode !== 1) {
    //             throw new Error(result.message || 'Failed to update cart');
    //         }

    //         // Refresh cart data after successful update
    //         fetchCartData();
    //     } catch (error) {
    //         console.error('Error updating cart:', error);
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Error',
    //             text: error.message || 'Failed to update cart item',
    //             confirmButtonText: 'OK'
    //         });
    //     }
    // };

    const handleQuantityChange = (index, change) => {
        const newCartData = [...cartData];
        const newQuantity = newCartData[index].qnt + change;

        if (newQuantity < 1) return;

        newCartData[index].qnt = newQuantity;
        setCartData(newCartData);
        // updateCartItem(newCartData[index].productid, newQuantity);
    };

    const deleteCartItem = async (cartItemId) => {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will remove the item from your cart',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        });

        if (!confirmation.isConfirmed) return;

        try {
            const response = await fetch(`https://ecom-new-2-6hu0.onrender.com/api/cartdelete/${cartItemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            const result = await response.json();

            if (!response.ok || result.statuscode !== 1) {
                throw new Error(result.message || 'Failed to delete item');
            }

            Swal.fire('Deleted!', 'Item removed from cart', 'success');
            fetchCartData();
        } catch (error) {
            console.error('Error deleting item:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to delete item',
                confirmButtonText: 'OK'
            });
        }
    };

    const proceedToCheckout = () => {
        if (cartData.length === 0) {
            Swal.fire('Empty Cart', 'Your cart is empty', 'warning');
            return;
        }
        navigate('/checkout',{state:{ totalPrice: totalPrice }});
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading your cart...</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4">Your Shopping Cart</h2>
            
            {cartData.length === 0 ? (
                <div className="text-center py-5">
                    <img 
                        src="/images/empty-cart.png" 
                        alt="Empty Cart" 
                        className="img-fluid mb-4"
                        style={{ maxWidth: '300px' }}
                    />
                    <h4>Your cart is empty</h4>
                    <p className="mb-4">Looks like you haven't added anything to your cart yet</p>
                    <button 
                        className="btn btn-primary"
                        onClick={() => navigate('/')}
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartData.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img 
                                                    src={`uploads/${item.productimage}`}
                                                    alt={item.productname}
                                                    className="img-thumbnail me-3"
                                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                                />
                                                <div>
                                                    <h5 className="mb-1">{item.productname}</h5>
                                                    <p className="text-muted mb-0">{item.productdes}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>₹{item.productprice}</td>
                                        <td>
                                            <div className="input-group" style={{ width: '120px' }}>
                                                <button 
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => handleQuantityChange(index, -1)}
                                                    disabled={item.qnt <= 1}
                                                >
                                                    -
                                                </button>
                                                <input 
                                                    type="text" 
                                                    className="form-control text-center"
                                                    value={item.qnt}
                                                    readOnly
                                                />
                                                <button 
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => handleQuantityChange(index, 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td>₹{(item.productprice * item.qnt).toFixed(2)}</td>
                                        <td>
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteCartItem(item._id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="3" className="text-end fw-bold">Total:</td>
                                    <td className="fw-bold">₹{totalPrice}</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <button 
                            className="btn btn-outline-secondary"
                            onClick={() => navigate('/')}
                        >
                            Continue Shopping
                        </button>
                        <button 
                            className="btn btn-primary"
                            onClick={proceedToCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Addtocart;