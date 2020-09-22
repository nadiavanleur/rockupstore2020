import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "./context/AppContext";
import Button from "./Button";
import { addProduct } from "../helpers/addProduct";

const AddToCart = ({ product }) => {
  const [cart, setCart] = useContext(AppContext);

  const handleClick = () => {
    if (!process.browser) return;

    const newCart = addProduct(product);
    setCart(newCart);
    console.log(cart, localStorage.getItem("cart"));
  };

  return <Button label="Add to cart" onClick={handleClick} />;
};

export default AddToCart;
