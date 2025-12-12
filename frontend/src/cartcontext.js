
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children, userid, Loggedin }) => {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart data from backend when userid or Loggedin changes
  useEffect(() => {
    if (!Loggedin) {
      setCartData([]);
      setTotalPrice(0);
      return;
    }

    const fetchCartData = async () => {
      try {
        const response = await fetch(`https://ecom-2-dmmb.onrender.com/api/cartdata/${userid}`);
        const result = await response.json();

        if (result.statuscode === 1) {
          const itemsWithQuantity = result.data.map(item => ({
            ...item,
            qnt: item.productquantity || 1
          }));
          setCartData(itemsWithQuantity);
        } else {
          setCartData([]);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartData([]);
      }
    };

    fetchCartData();
  }, [userid, Loggedin]);

  // Calculate total price when cartData changes
  useEffect(() => {
    const total = cartData.reduce((sum, item) => {
      return sum + parseFloat(item.productprice) * parseInt(item.qnt);
    }, 0);
    setTotalPrice(total.toFixed(2));
  }, [cartData]);

  return (
    <CartContext.Provider value={{ cartData, setCartData, totalPrice, setTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
