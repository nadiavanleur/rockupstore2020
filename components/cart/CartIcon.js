import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const CartIcon = () => {
  const [cart, setCart] = useContext(AppContext);
  const totalProducts =
    cart && Object.keys(cart).length ? cart.totalProducts : 0;

  return <span className="c-count-icon">{totalProducts}</span>;
};

export default CartIcon;
