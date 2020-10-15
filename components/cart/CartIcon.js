import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const CartIcon = () => {
  const [cart, setCart] = useContext(AppContext);

  let totalProducts = 0;

  if (cart) totalProducts = cart.contents && cart.contents.itemCount;

  return <span className="c-count-icon">{totalProducts}</span>;
};

export default CartIcon;
