import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../context/AppContext";
import Button from "../Button";
import { addCartItem } from "../../helpers/addCartItem";
import { getFormattedCart } from "../../helpers/getFormattedCart";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Link from "next/link";
import { v4 } from "uuid";
import GET_CART from "../../graphql/queries/get-cart";
import ADD_TO_CART from "../../graphql/mutations/add-to-cart";

const AddToCart = ({ product, variables }) => {
  const productQueryInput = {
    clientMutationId: v4(),
    productId: product.productId,
  };
  const [cart, setCart] = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(false);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Add to Cart Mutation.
  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQueryInput,
    },
    onCompleted: () => {
      console.warn("completed ADD_TO_CART");

      // If error.
      if (addToCartError) {
        setRequestError(addToCartError.graphQLErrors[0].message);
      }

      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      refetch();

      // 2. Show View Cart Button
      setShowViewCart(true);
    },
    onError: (error) => {
      console.log(error);
      if (error) {
        setRequestError(error.graphQLErrors[0].message);
      }
    },
  });

  const oldAddToCart = () => {
    if (!process.browser) return;

    const newCart = addCartItem({ product, variables });
    setCart(newCart);
  };

  const handleClick = ({ target }) => {
    // oldAddToCart();
    setRequestError(null);
    addToCart();

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
