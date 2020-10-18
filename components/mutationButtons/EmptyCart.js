import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import Button from "../Button";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { v4 } from "uuid";
import GET_CART from "../../graphql/queries/get-cart";
import EMPTY_CART from "../../graphql/mutations/empty-cart";
import { getFormattedCart } from "../../helpers/getFormattedCart";

const EmptyCart = ({ onCompleted }) => {
  const productQueryInput = {
    clientMutationId: v4(),
  };
  const [cart, setCart] = useContext(CartContext);
  const [showViewCart, setShowViewCart] = useState(null);
  const [requestError, setRequestError] = useState(null);
  let buttonElement;

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      console.info("completed GET_CART");

      const updatedCart = getFormattedCart(data);
      // Update cart in the localStorage.
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      // Update cart data in React Context.
      setCart(updatedCart);
    },
    onError: (error) => console.error(error),
  });

  // Empty cart mutation
  const [
    emptyCart,
    { data: emptyCartRes, loading: emptyCartLoading, error: emptyCartError },
  ] = useMutation(EMPTY_CART, {
    variables: {
      input: productQueryInput,
    },
    onCompleted: async () => {
      console.info("completed EMPTY_CART");

      // If error.
      if (emptyCartError) {
        setRequestError(emptyCartError.graphQLErrors[0].message);
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
    emptyCart(target);
  };

  useEffect(() => {
    buttonElement = document.querySelector(
      '[data-js-bind="empty-cart-button"]'
    );
  }, []);

  const buttonDisabled =
    !cart || !cart.contents || !cart.contents.itemCount || emptyCartLoading;

  return (
    <>
      <Button
        label="Empty cart"
        onClick={handleClick}
        data-done="Cart emptied"
        disabled={buttonDisabled}
        data-js-bind="empty-cart-button"
        extraClasses="c-button--link c-button--fill"
      />
      {requestError && (
        <p className="u-text-error u-margin-top-small">{requestError}</p>
      )}
    </>
  );
};

export default EmptyCart;
