import React, { useState, useEffect } from "react";

export const CartContext = React.createContext([{}, () => {}]);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (process.browser) {
      let cartData = localStorage.getItem("cart");
      cartData = cartData !== null ? JSON.parse(cartData) : "";
      setCart(cartData);
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
