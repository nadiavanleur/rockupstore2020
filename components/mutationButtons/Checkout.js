import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { FlashMessageContext } from "../context/FlashMessageContext";
import { BillingContext } from "../context/BillingContext";
import { useQuery, useMutation } from "react-apollo";
import GET_CART from "../../graphql/queries/get-cart";
import CHECKOUT from "../../graphql/mutations/checkout";
import validateAndSanitizeCheckoutForm from "../../helpers/validateAndSanitizeCheckoutForm";
import createCheckoutData from "../../helpers/createCheckoutData";
import { gtagBeginCheckout, gtagFinalizeCheckout } from "../../helpers/gtag";

const Checkout = ({ children }) => {
  const [cart, setCart] = useContext(CartContext);
  const [billingInfo, setBillingInfo] = useContext(BillingContext);
  const [flashMessages, addFlashMessage] = useContext(FlashMessageContext);
  const [orderData, setOrderData] = useState(null);
  let checkoutStarted = false;

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      console.info("completed GET_CART");
      setCart(data);
    },
  });

  // Checkout or CreateOrder Mutation.
  const [
    checkout,
    { data: checkoutResponse, loading: checkoutLoading, error: checkoutError },
  ] = useMutation(CHECKOUT, {
    variables: {
      input: orderData,
    },
    onCompleted: (data) => {
      console.info("completed CHECKOUT", data);

      setBillingInfo({
        ...billingInfo,
        order: data?.checkout?.order,
      });

      if (data?.checkout?.redirect) {
        addFlashMessage({
          type: "success",
          message: (
            <>
              You are being redirected to{" "}
              <a href={data.checkout.redirect}>
                {!!data.checkout.redirect.split(".com/")?.[1] &&
                  `${data.checkout.redirect.split(".com/")?.[0]}.com`}
                {!!data.checkout.redirect.split(".nl/")?.[1] &&
                  `${data.checkout.redirect.split(".nl/")?.[0]}.nl`}
              </a>{" "}
              to complete your order. Order no: {data?.checkout?.order?.orderId}
              . Status: {data?.checkout?.order?.status}.
            </>
          ),
        });

        gtagFinalizeCheckout({
          cart,
          listName: "Checkout page",
          orderData: data.checkout?.order,
        });

        // Empty cart
        setCart(null);

        window.location.href = data.checkout.redirect;
      } else if (data?.checkout?.result === "fail") {
        console.error("Checkout failed");
        addFlashMessage({
          type: "error",
          message: "Something went wrong, please try again",
        });
        gtagFinalizeCheckout({
          cart,
          listName: "Checkout page",
          error:
            'Something went wrong, please try again. (data?.checkout?.result === "fail")',
        });
      } else {
        addFlashMessage({
          type: "success",
          message: "Order placed successfully",
        });
        gtagFinalizeCheckout({
          cart,
          listName: "Checkout page",
          orderData: data.checkout?.order,
        });

        // Empty cart
        setCart(null);
      }

      refetch();
    },
    onError: (error) => {
      console.error(error);

      if (error) {
        addFlashMessage({
          type: "error",
          message: error?.graphQLErrors?.[0].message || error,
        });
      }

      gtagFinalizeCheckout({
        cart,
        listName: "Checkout page",
        error: error?.graphQLErrors?.[0].message || error || "Unknown error",
      });
    },
  });

  /*
   * Handle form submit.
   *
   * @param {Object} event Event Object.
   * @return {void}
   */
  const onSubmit = (event) => {
    event.preventDefault();

    if (!checkoutStarted) {
      checkoutStarted = true;
      gtagBeginCheckout({
        cart,
        listName: "Checkout page | Checkout form submit",
      });
    }

    const result = validateAndSanitizeCheckoutForm(billingInfo);
    if (!result.isValid) {
      setBillingInfo({ ...billingInfo, errors: result.errors });
      return;
    }
    const checkOutData = createCheckoutData(billingInfo);
    setOrderData(checkOutData);
  };

  /*
   * Handle onchange input.
   *
   * @param {Object} event Event Object.
   * @return {void}
   */
  const onChange = (event) => {
    if (!checkoutStarted) {
      checkoutStarted = true;
      gtagBeginCheckout({
        cart,
        listName: "Checkout page | Checkout form change",
      });
    }

    if (event.target.name === "createAccount") {
      const newState = {
        ...billingInfo,
        [event.target.name]: !billingInfo.createAccount,
      };
      setBillingInfo(newState);
    } else {
      const newState = {
        ...billingInfo,
        [event.target.name]: event.target.value,
      };
      setBillingInfo(newState);
    }
  };

  // Call the checkout mutation when the value for orderData changes/updates.
  useEffect(() => {
    if (orderData !== null) {
      checkout();
    }
  }, [orderData]);

  return (
    <>
      {children({
        input: billingInfo,
        onSubmit,
        onChange,
        checkoutLoading,
      })}
    </>
  );
};

Checkout.propTypes = {};

export default Checkout;
