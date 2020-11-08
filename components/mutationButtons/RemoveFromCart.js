import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import Button from "../Button";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { v4 } from "uuid";
import GET_CART from "../../graphql/queries/get-cart";
import REMOVE_FROM_CART from "../../graphql/mutations/remove-from-cart";
import { FlashMessageContext } from "../context/FlashMessageContext";
import RestoreCartItems from "../mutationButtons/RestoreCartItems";

const RemoveFromCart = ({ keys, children }) => {
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
    removeFromCart,
    {
      data: removeFromCartRes,
      loading: removeFromCartLoading,
      error: removeFromCartError,
    },
  ] = useMutation(REMOVE_FROM_CART, {
    variables: {
      input: productQueryInput,
    },
    onCompleted: () => {
      console.info("completed REMOVE_FROM_CART");

      // If error.
      if (removeFromCartError) {
        addFlashMessage({
          type: "error",
          message:
            removeFromCarterror?.graphQLErrors[0]?.message ||
            "Something went wrong",
        });
      } else {
        addFlashMessage({
          type: "success",
          message: `Item${keys.length > 1 ? "s" : ""} removed from cart`,
          children: (
            <RestoreCartItems keys={keys}>
              {({ restoreCartItems, disabled }) => (
                <Button
                  label="Restore"
                  onClick={restoreCartItems}
                  disabled={disabled}
                  extraClasses="c-flashmessage__button c-button--link"
                />
              )}
            </RestoreCartItems>
          ),
        });
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
        removeFromCart,
        disabled: removeFromCartLoading,
      })}
    </>
  );
};

export default RemoveFromCart;
