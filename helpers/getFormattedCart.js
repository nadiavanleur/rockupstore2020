/**
 * Returns cart data in the required format.
 * @param {String} data Cart data
 * https://github.com/imranhsayed/woo-next/blob/master/functions.js
 */
export const getFormattedCart = (data) => {
  let formattedCart = null;
  console.dir(data);
  if (data === undefined || !data.cart.contents.nodes.length)
    return formattedCart;

  const givenProducts = data.cart.contents.nodes;
  console.dir(givenProducts);
  // Create an empty object.
  formattedCart = {};
  formattedCart.products = [];
  let totalProductsCount = 0;

  for (let i = 0; i < givenProducts.length; i++) {
    const givenProduct = givenProducts[i].product;
    const product = {};
    const total = getFloatVal(givenProducts[i].total);

    product.productId = givenProduct.productId;
    product.cartKey = givenProducts[i].key;
    product.name = givenProduct.name;
    product.qty = givenProducts[i].quantity;
    product.price = total / product.qty;
    product.totalPrice = givenProducts[i].total;
    product.image = {
      sourceUrl: givenProduct.image.sourceUrl,
      srcSet: givenProduct.image.srcSet,
      title: givenProduct.image.title,
    };

    totalProductsCount += givenProducts[i].quantity;

    // Push each item into the products array.
    formattedCart.products.push(product);
  }

  formattedCart.totalProductsCount = totalProductsCount;
  formattedCart.totalProductsPrice = data.cart.total;

  return formattedCart;
};
