import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { v4 } from "uuid";
import GET_CART from "../../graphql/queries/get-cart";
import RESTORE_CART_ITEMS from "../../graphql/mutations/restore-cart-items";
import { FlashMessageContext } from "../context/FlashMessageContext";

const RestoreCartItems = ({ keys, onCompleted, children }) => {
  if (!keys || !keys.length) return null;

  const productQueryInput = {
    clientMutationId: v4(),
    keys,
  };
  const [cart, setCart] = useContext(CartContext);
  const [flashMessages, addFlashMessage] = useContext(FlashMessageContext);
  const [showViewCart, setShowViewCart] = useState(null);

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      console.info("completed GET_CART");
      setCart(data);
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
        addFlashMessage({
          type: "error",
          message:
            restoreCartItemserror?.graphQLErrors[0]?.message ||
            "Something went wrong",
        });
      } else {
        addFlashMessage({
          type: "success",
          message: "Item restored",
        });
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
        addFlashMessage({
          type: "error",
          message: error?.graphQLErrors[0]?.message || "Something went wrong",
        });
      }
    },
  });

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
