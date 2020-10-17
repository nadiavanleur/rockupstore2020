import React, { useState, useContext, useEffect } from "react";
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

const AddToCart = ({ product, variation }) => {
  const productQueryInput = {
    clientMutationId: v4(),
    productId: product.productId,
    variationId: variation ? variation.variationId : undefined,
  };
  const [cart, setCart] = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(null);
  const [requestError, setRequestError] = useState(null);
  let buttonElement;

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      console.info("completed GET_CART");

      const updatedCart = data.cart;
      // Update cart in the localStorage.
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
      console.info("completed ADD_TO_CART");

      // If error.
      if (addToCartError) {
        setRequestError(addToCartError.graphQLErrors[0].message);
      } else {
        // Kick off done animation
        const DONE_CLASS = "c-button--done";
        if (buttonElement) {
          buttonElement.classList.remove(DONE_CLASS);
          setTimeout(() => buttonElement.classList.add(DONE_CLASS), 100);
        }
      }

      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      refetch();

      // 2. Show View Cart Button
      setShowViewCart(true);
    },
    onError: (error) => {
      console.error(error);
      if (error) {
        setRequestError(error.graphQLErrors[0].message);
      }
    },
  });

  const handleClick = ({ target }) => {
    setRequestError(null);
    addToCart(target);
  };

  useEffect(() => {
    buttonElement = document.querySelector(
      '[data-js-bind="add-to-cart-button"]'
    );
  });

  const hasVariations =
    !!product.variations && !!product.variations.nodes.length;

  const itemNotAvailable = hasVariations
    ? !variation || !variation.variationId || !variation.purchasable
    : !product.purchasable;

  return (
    <>
      <Button
        label="Add to cart"
        onClick={handleClick}
        data-done="Added to cart"
        disabled={itemNotAvailable || addToCartLoading}
        data-js-bind="add-to-cart-button"
        extraClasses="c-button--fill"
      />
      {requestError && (
        <p className="u-text-error u-margin-top-small">{requestError}</p>
      )}
      {itemNotAvailable && (
        <p className="u-margin-top-small">Item not available</p>
      )}
    </>
  );
};

export default AddToCart;
