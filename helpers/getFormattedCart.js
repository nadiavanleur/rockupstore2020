/**
 * Returns cart data in the required format.
 * @param {String} data Cart data
 * https://github.com/imranhsayed/woo-next/blob/master/functions.js
 */
export const getFormattedCart = (data) => {
  let formattedCart = null;
  if (!data?.cart?.contents?.nodes?.length) return formattedCart;

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
    newItem.variation.key = dataItem.key;
    newItem.variation.product = dataItem.product;

    if (exisitingItem) {
      exisitingItem.variations.push(newItem.variation);
      exisitingItem.keys.push(dataItem.key);
      exisitingItem.quantity += dataItem.quantity;
    } else {
      const newVariation = dataItem.variation;

      newItem.keys = [];
      newItem.keys.push(dataItem.key);
      delete newItem.key;

      newItem.variations = [];
      newItem.variations.push(newVariation);
      delete newItem.variation;

      cartItems.push(newItem);
    }
  });

  formattedCart.cartItems = cartItems;

  return formattedCart;
};
