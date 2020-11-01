import React, { useState, useEffect } from "react";
import { getFormattedCart } from "../../helpers/getFormattedCart";

export const CartContext = React.createContext([{}, () => {}]);

export const CartProvider = ({ children }) => {
  const [cart, setCartState] = useState(null);

  useEffect(() => {
    if (!process.browser) return;

    let cartData = localStorage.getItem("cart");
    cartData = cartData !== null ? JSON.parse(cartData) : "";
    setCartState(cartData);
  }, []);

  const setCart = (updatedCart) => {
    const formattedCart = getFormattedCart(updatedCart);
    if (!formattedCart) return;
    // Update cart data in React Context.
    setCartState(formattedCart);

    if (!process.browser) return;
    // Update cart in the localStorage.
    localStorage.setItem("cart", JSON.stringify(formattedCart));
  };

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
