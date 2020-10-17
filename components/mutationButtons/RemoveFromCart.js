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
import REMOVE_FROM_CART from "../../graphql/mutations/remove-from-cart";

/**
 * @TODO
 * Mutations:
 * - removeItemsFromCart
 * - restoreCartItems
 */

const RemoveFromCart = ({ keys, onCompleted }) => {
  const productQueryInput = {
    clientMutationId: v4(),
    keys,
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
      console.log(updatedCart, cart);
    },
  });

  // Remove from cart mutation.
  const [
    RemoveFromCart,
    {
      data: RemoveFromCartRes,
      loading: RemoveFromCartLoading,
      error: RemoveFromCartError,
    },
  ] = useMutation(REMOVE_FROM_CART, {
    variables: {
      input: productQueryInput,
    },
    onCompleted: async () => {
      console.info("completed REMOVE_FROM_CART");

      // If error.
      if (RemoveFromCartError) {
        setRequestError(RemoveFromCartError.graphQLErrors[0].message);
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
      await refetch();

      // 2. Show View Cart Button
      setShowViewCart(true);

      // Fire onCompleted function from parent
      if (onCompleted) onCompleted();
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
    RemoveFromCart(target);
  };

  useEffect(() => {
    buttonElement = document.querySelector(
      '[data-js-bind="remove-from-cart-button"]'
    );
  });

  return (
    <>
      <button
        onClick={handleClick}
        data-done="Removed from cart"
        data-js-bind="remove-from-cart-button"
        disabled={RemoveFromCartLoading}
      >
        Delete
      </button>
      {requestError && (
        <p className="u-text-error u-margin-top-small">{requestError}</p>
      )}
    </>
  );
};

export default RemoveFromCart;
