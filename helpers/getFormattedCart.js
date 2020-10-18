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

  console.log(data);
  const { cart } = data;
  formattedCart = cart;

  // Reformat cart items
  const cartItems = [];
  cart.contents.nodes.forEach((dataItem) => {
    let newItem = { ...dataItem };

    if (!dataItem.variation) {
      newItem.keys = [dataItem.key];
      cartItems.push(newItem);
      return;
    }

    const exisitingItem = cartItems.find(
      (item) => item.product.productId === dataItem.product.productId
    );

    newItem.variation.quantity = dataItem.quantity;
    newItem.variation.total = dataItem.total;

    if (!exisitingItem) {
      newItem.variations = [];
      newItem.variations.push(dataItem.variation);
      delete newItem.variation;

      newItem.keys = [];
      newItem.keys.push(dataItem.key);
      delete newItem.key;

      cartItems.push(newItem);
    } else {
      exisitingItem.variations.push(dataItem.variation);
      exisitingItem.keys.push(dataItem.key);
      exisitingItem.quantity += dataItem.quantity;
    }
  });

  console.log(cartItems);

  formattedCart.cartItems = cartItems;

  return formattedCart;
};
