import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import Button from "../Button";
import { useQuery, useMutation } from "@apollo/react-hooks";
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
      setCart(data);
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
          message:
            addToCarterror?.graphQLErrors[0]?.message || "Something went wrong",
        });
      } else {
        addFlashMessage({
          type: "success",
          message: `Item added to cart`,
          children: (
            <Button
              label="Go to cart"
              tag="a"
              href="/cart"
              extraClasses="c-flashmessage__button c-button--link"
            />
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
