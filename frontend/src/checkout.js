import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import context from './usecontext';
import Swal from 'sweetalert2';
import { CartContext } from './cartcontext';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [address, setaddress] = useState('');
  const [cash, setcash] = useState('');
  const { orderid } = useContext(context);
  const navigate = useNavigate();
    const location = useLocation();
     const { totalPrice } = location.state || {};
       const { cartData, setCartData,  } = useContext(CartContext);
         const {Loggedin,userid}=useSelector((state)=>
                 {
                     return state.userslice
                 })


      const fetchCartData = async () => {
             
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
             } 
         };
    
  const checkout = async () => {
  if (!name || !email || !mobile || !address || !cash) {
    alert("Please fill all fields properly.");
    return;
  }

  const items = cartData.map(item => ({
    pname: item.productname,              
    pq: item.productquantity , 
    tprice: item.productprice  
  }));

  const data = {
    name,
    email,
    mobile,
    address,
    cash,
    orderid,
    totalPrice,
    data: items   
  };

  try {
    const res = await fetch("https://ecom-new-2-6hu0.onrender.com/api/checkcartdata", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (result.statuscode === 1) {
      alert("Data saved successfully");
      navigate("/deliveryaddress", {
        state: { name, mobile, address, totalPrice, cash, email, items },
        search: `?id=${orderid}`,
      });
    } else {
      alert("Data not saved. Please try again");
    }
  } catch (error) {
    console.error("Checkout Error:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message || 'Server error. Please try again later.',
      confirmButtonText: 'OK'
    });
  }
};


  return (
    <div>
      <div className="breadcrumb-section">
        <div className="container">
          <h2>Checkout</h2>
        </div>
      </div>

      <section className="login-page section-b-space">
        <div className="container">
          <h3>Checkout</h3>
          <div className="theme-card">
            <div className="theme-form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-box">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Name"
                      value={name} onChange={(e) => setname(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-box">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email"
                      value={email} onChange={(e) => setemail(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-box">
                    <label>Mobile No.</label>
                    <input type="text" className="form-control" placeholder="Mobile No."
                      value={mobile} onChange={(e) => setmobile(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-box">
                    <label>Address</label>
                    <textarea className="form-control" style={{ height: "100px" }}
                      value={address} onChange={(e) => setaddress(e.target.value)}></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-box">
                    <p>totalPrice:{totalPrice}</p>
                    <label>Payment Methods</label>
                    <select className="form-control" value={cash} onChange={(e) => setcash(e.target.value)}>
                      <option value="">Choose Method</option>
                      <option value="Cash On Delivery">Cash On Delivery</option>
                      <option value="Payment Online">Payment Online</option>
                    </select>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-solid w-auto" style={{ marginTop: "20px" }} onClick={checkout}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
