import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { CartContext } from "../context/CartContext";
import Button from "../Button";
import { addCartItem } from "../../helpers/addCartItem";
import { getFormattedCart } from "../../helpers/getFormattedCart";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Link from "next/link";
import { v4 } from "uuid";
import GET_CART from "../../graphql/queries/get-cart";
import RESTORE_CART_ITEMS from "../../graphql/mutations/restore-cart-items";
import FlashMessage from "../Flashmessage";
import { FlashMessageContext } from "../context/FlashMessageContext";

const RestoreCartItems = ({ keys, onCompleted, children }) => {
  if (!keys || !keys.length) return null;

  const productQueryInput = {
    clientMutationId: v4(),
    keys,
  };
  const [cart, setCart] = useContext(CartContext);
  const [flashMessages, setFlashMessages] = useContext(FlashMessageContext);
  const [showViewCart, setShowViewCart] = useState(null);

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
  });

  // Remove from cart mutation.
  const [
    restoreCartItems,
    {
      data: restoreCartItemsRes,
      loading: restoreCartItemsLoading,
      error: restoreCartItemsError,
    },
  ] = useMutation(RESTORE_CART_ITEMS, {
    variables: {
      input: productQueryInput,
    },
    onCompleted: async () => {
      console.info("completed RESTORE_CART_ITEMS");

      // If error.
      if (restoreCartItemsError) {
        setFlashMessages([
          {
            type: "error",
            message: restoreCartItemsError.graphQLErrors[0].message,
          },
          ...flashMessages,
        ]);
      } else {
        setFlashMessages([
          {
            type: "success",
            message: "Item restored",
          },
          ...flashMessages,
        ]);
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
        setFlashMessages([
          {
            type: "error",
            message: error.graphQLErrors[0].message,
          },
          ...flashMessages,
        ]);
      }
    },
  });

  // @TODO flashmessage
  return (
    <>
      {children({
        restoreCartItems: restoreCartItems,
        disabled: restoreCartItemsLoading,
      })}
    </>
  );
};

export default RestoreCartItems;
