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
import ADD_TO_CART from "../../graphql/mutations/add-to-cart";
import { FlashMessageContext } from "../context/FlashMessageContext";

const AddToCart = ({ product, variation, children }) => {
  const productQueryInput = {
    clientMutationId: v4(),
    productId: product.productId,
    variationId: variation ? variation.variationId : undefined,
  };
  const [cart, setCart] = useContext(CartContext);
  const [flashMessages, addFlashMessage] = useContext(FlashMessageContext);
  const [showViewCart, setShowViewCart] = useState(null);
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
        addFlashMessage({
          type: "error",
          message: addToCartError.graphQLErrors[0].message,
        });
      } else {
        addFlashMessage({
          type: "success",
          message: `Item added to cart`,
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
          message: error.graphQLErrors[0].message,
        });
      }
    },
  });

  useEffect(() => {
    buttonElement = document.querySelector(
      '[data-js-bind="add-to-cart-button"]'
    );
  }, []);

  return (
    <>
      {children({
        addToCart,
        addToCartLoading,
      })}
    </>
  );
};

export default AddToCart;
