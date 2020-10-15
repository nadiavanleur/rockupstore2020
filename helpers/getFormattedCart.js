import { getFloatValue } from "../helpers/getFloatValue";

/**
 * Returns cart data in the required format.
 * @param {String} data Cart data
 * https://github.com/imranhsayed/woo-next/blob/master/functions.js
 */
export const getFormattedCart = (data) => {
  let formattedCart = null;
  if (data === undefined || !data.cart.contents.nodes.length)
    return formattedCart;

  const currentProducts = data.cart.contents.nodes;
  // Create an empty object.
  formattedCart = {};
  formattedCart.products = [];
  let totalProducts = 0;

  for (let i = 0; i < currentProducts.length; i++) {
    const currentProduct = currentProducts[i].product;
    const product = {};
    const total = getFloatValue(currentProducts[i].total);

    product.productId = currentProduct.productId;
    product.slug = currentProduct.slug;
    product.cartKey = currentProducts[i].key;
    product.name = currentProduct.name;
    product.quantity = currentProducts[i].quantity;
    product.price = total / product.quantity;
    product.totalPrice = currentProducts[i].total;
    product.image = {
      sourceUrl: currentProduct.image.sourceUrl,
      srcSet: currentProduct.image.srcSet,
      title: currentProduct.image.title,
    };

    totalProducts += currentProducts[i].quantity;

    // Push each item into the products array.
    formattedCart.products.push(product);
  }

  formattedCart.totalProducts = totalProducts;
  formattedCart.totalPrice = data.cart.total;

  return formattedCart;
};
