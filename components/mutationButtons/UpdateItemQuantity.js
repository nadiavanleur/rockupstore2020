import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { v4 } from "uuid";
import GET_CART from "../../graphql/queries/get-cart";
import UPDATE_ITEM_QUANTITY from "../../graphql/mutations/update-item-quantity";
import { FlashMessageContext } from "../context/FlashMessageContext";

const UpdateItemQuantity = ({ key, quantity, children }) => {
  const productQueryInput = {
    clientMutationId: v4(),
    items: [
      {
        key,
        quantity,
      },
    ],
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

  // Update quantity mutation.
  const [
    updateItemQuantity,
    {
      data: updateItemQuantityRes,
      loading: updateItemQuantityLoading,
      error: updateItemQuantityError,
    },
  ] = useMutation(UPDATE_ITEM_QUANTITY, {
    variables: {
      input: productQueryInput,
    },
    onCompleted: () => {
      console.info("completed UPDATE_ITEM_QUANTITY");

      // If error.
      if (updateItemQuantityError) {
        addFlashMessage({
          type: "error",
          message:
            updateItemQuantityerror?.graphQLErrors[0]?.message ||
            "Something went wrong",
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
        updateItemQuantity,
        disabled: updateItemQuantityLoading,
      })}
    </>
  );
};

export default UpdateItemQuantity;
