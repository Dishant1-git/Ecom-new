import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Deliveryaddress = () => {
  const [idd, setidd] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [date, setDate] = useState('');
  const [expectday, setExpectDay] = useState('');

  const location = useLocation();
  const { name, mobile, address, totalPrice, cash, email } = location.state || {};

  useEffect(() => {
    const generateRandomId = (prefix) => {
      const randomPart = Math.floor(100000 + Math.random() * 900000); 
      return `${prefix}-${randomPart}`;
    };

    const mycomponent = () => {
      const currentdate = new Date();
      const year = currentdate.getFullYear();
      const month = currentdate.getMonth() + 1;
      const day = currentdate.getDate();
      const expectedday = day + 4;

      const formattedDate = `${day}/${month}/${year}`;
      const expectedDate = `${expectedday}/${month}/${year}`;

      setDate(formattedDate);
      setExpectDay(expectedDate);

      const generatedOrderId = generateRandomId("ORD");
      const generatedTransactionId = generateRandomId("TXN");

      setidd(generatedOrderId);
      setTransactionId(generatedTransactionId);
    };

    mycomponent();
  }, []);

  return (
    <div>
      <section className="section-b-space light-layout">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="success-text">
                <div className="checkmark">
                  {[...Array(6)].map((_, i) => (
                    <svg className="star" key={i} height="19" width="19" viewBox="0 0 19 19">
                      <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z"></path>
                    </svg>
                  ))}
                  <svg className="checkmark__check" height="36" width="48" viewBox="0 0 48 36">
                    <path d="M47.248 3.9L43.906.667a2.428 2.428 0 0 0-3.344 0l-23.63 23.09-9.554-9.338a2.432 2.432 0 0 0-3.345 0L.692 17.654a2.236 2.236 0 0 0 .002 3.233l14.567 14.175c.926.894 2.42.894 3.342.01L47.248 7.128c.922-.89.922-2.34 0-3.23"></path>
                  </svg>
                  <svg className="checkmark__background" height="115" width="120" viewBox="0 0 120 115">
                    <path d="M107.332 72.938c-1.798 5.557 4.564 15.334 1.21 19.96-3.387 4.674-14.646 1.605-19.298 5.003-4.61 3.368-5.163 15.074-10.695 16.878-5.344 1.743-12.628-7.35-18.545-7.35-5.922 0-13.206 9.088-18.543 7.345-5.538-1.804-6.09-13.515-10.696-16.877-4.657-3.398-15.91-.334-19.297-5.002-3.356-4.627 3.006-14.404 1.208-19.962C10.93 67.576 0 63.442 0 57.5c0-5.943 10.93-10.076 12.668-15.438 1.798-5.557-4.564-15.334-1.21-19.96 3.387-4.674 14.646-1.605 19.298-5.003C35.366 13.73 35.92 2.025 41.45.22c5.344-1.743 12.628 7.35 18.545 7.35 5.922 0 13.206-9.088 18.543-7.345 5.538 1.804 6.09 13.515 10.696 16.877 4.657 3.398 15.91.334 19.297 5.002 3.356 4.627-3.006 14.404-1.208 19.962C109.07 47.424 120 51.562 120 57.5c0 5.943-10.93 10.076-12.668 15.438z"></path>
                  </svg>
                </div>
                <h2>Thank You</h2>
                <p>Payment is successfully processed and your order is on the way</p>
                <p className="font-weight-bold">Transaction ID: {transactionId}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="order-success-sec" style={{ margin: "400px", marginTop: "50px", width: "600px" }}>
        <div className="row">
          <div className="col-sm-6">
            <h4>Summary</h4>
            <ul className="order-detail">
              <li>Order ID:</li>
              <span style={{ color: "#777777" }}>{idd}</span>
              <li>Order Date: {date}</li>
              <li>Order Total: {totalPrice}</li>
              <li>Name: {name}</li>
            </ul>
          </div>
          <div className="col-sm-6">
            <h4>Address</h4>
            <ul className="order-detail">
              <li>Address: {address}</li>
              <li>Mobile No: {mobile}</li>
              <li>Email: {email}</li>
              <li>{cash}</li>
            </ul>
          </div>
          <div className="col-sm-12 payment-mode">
            <h4>Payment Method</h4>
            <p>Pay on Delivery (Cash). Cash on delivery (COD) available.</p>
          </div>
          <div className="col-md-12">
            <div className="delivery-sec">
              <h3 style={{ color: "#777777" }}>
                Expected Date of Delivery: <span>{expectday}</span>
              </h3>
              <a href="order-tracking.html">Track Order</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deliveryaddress;
