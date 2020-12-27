const formatProduct = ({ product, index, listName, quantity, variant }) => ({
  id: product.productId,
  name: product.name,
  list_name: listName,
  brand: product.designers?.nodes?.map((designer) => designer.name).join(", "),
  category: product.extraProductInfo.googlecategory,
  list_position: index && index + 1,
  price: product.price,
  quantity: quantity,
  variant:
    variant &&
    variant?.attributes?.nodes?.map((variable) => variable.value)?.join(", "),
});

const formatCartItems = ({ cartItems, listName }) => {
  const formattedProducts = [];

  cartItems.forEach((item) => {
    const productData = {
      product: item.product,
      listName: listName,
    };

    if (item.variations?.length) {
      item.variations.forEach((variation) =>
        formattedProducts.push(
          formatProduct({
            ...productData,
            quantity: variation.quantity,
            variant: variation,
          })
        )
      );
    } else {
      formattedProducts.push(
        formatProduct({ ...productData, quantity: item.quantity })
      );
    }
  });

  return formattedProducts;
};

export const gtagImpressions = ({ products, listName }) => {
  if (typeof gtag === "undefined" || !products?.length) return;

  const formattedProducts = products.map((product, index) =>
    formatProduct({ product, index, listName })
  );

  gtag("event", "view_item_list", {
    items: formattedProducts,
  });
};

export const gtagProductClick = ({ product, index, listName }) => {
  if (typeof gtag === "undefined" || !product) return;

  const formattedProduct = formatProduct({ product, index, listName });

  gtag("event", "select_content", {
    content_type: "product",
    items: [formattedProduct],
  });
};

export const gtagProductDetail = ({ product }) => {
  if (typeof gtag === "undefined" || !product) return;

  const formattedProduct = formatProduct({ product });

  gtag("event", "view_item", {
    items: [formattedProduct],
  });
};

export const gtagAddToCart = ({ product, quantity = 1, variant }) => {
  if (typeof gtag === "undefined" || !product) return;

  const formattedProduct = formatProduct({
    product,
    quantity,
    variant,
  });

  gtag("event", "add_to_cart", {
    items: [formattedProduct],
  });
};

export const gtagRemoveFromCart = ({ cartItems, listName }) => {
  if (typeof gtag === "undefined" || !cartItems?.length) return;

  const formattedProducts = formatCartItems({ cartItems, listName });

  gtag("event", "remove_from_cart", {
    items: formattedProducts,
  });
};

export const gtagBeginCheckout = ({ cartItems, listName }) => {
  if (typeof gtag === "undefined" || !cartItems?.length) return;

  const formattedProducts = formatCartItems({ cartItems, listName });

  gtag("event", "begin_checkout", {
    items: formattedProducts,
    coupon: "",
  });
};

export const gtagFinalizeCheckout = ({ cart, listName, error, orderData }) => {
  if (typeof gtag === "undefined" || !cart) return;

  const formattedProducts = formatCartItems({
    cartItems: cart.cartItems,
    listName,
  });

  gtag("event", "checkout_progress", {
    items: formattedProducts,
    checkout_option: "Checkout suceeded",
    value: error ? 0 : 1,
    checkout_step: 2,
    coupon: "",
  });

  if (error || !orderData) {
    gtag("event", "exception", {
      description: error || "orderData not available",
      fatal: !!error,
    });
  } else {
    gtag("event", "purchase", {
      transaction_id: orderData.orderId,
      affiliation: "Subflow",
      value: orderData.total,
      currency: "EUR",
      tax: 0,
      shipping: 0,
      items: formatProduct,
    });
  }
};
