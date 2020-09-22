export const createNewProduct = (product, productPrice, quantity = 1) => {
  return {
    productId: product.productId,
    image: product.image,
    name: product.name,
    productPrice: productPrice,
    quantity,
    totalPrice: parseFloat((productPrice * quantity).toFixed(2)),
  };
};
