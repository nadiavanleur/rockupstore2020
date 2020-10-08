import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../context/AppContext";
import Button from "../Button";
import { addCartItem } from "../../helpers/addCartItem";

const AddToCart = ({ product, variables }) => {
  const [cart, setCart] = useContext(AppContext);

  const handleClick = ({ target }) => {
    if (!process.browser) return;

    const newCart = addCartItem({ product, variables });
    setCart(newCart);

    // Kick off done animation
    const DONE_CLASS = "c-button--done";
    target.classList.remove(DONE_CLASS);
    setTimeout(() => target.classList.add(DONE_CLASS), 100);
  };

  return (
    <Button
      label="Add to cart"
      onClick={handleClick}
      data-done="Added to cart"
    />
  );
};

export default AddToCart;
