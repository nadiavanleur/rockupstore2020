import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartIcon = () => {
  const [cart, setCart] = useContext(CartContext);

  let totalProducts = 0;

  if (cart) totalProducts = cart.contents && cart.contents.itemCount;

  return <span className="c-count-icon">{totalProducts}</span>;
};

export default CartIcon;
