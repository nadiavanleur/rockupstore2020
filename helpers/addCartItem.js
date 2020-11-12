import { getFloatValue } from "./getFloatValue";
import { createNewCartItem } from "./createNewCartItem";
import { updateCartItem } from "./updateCartItem";

/**
 * addCartItem
 *
 * @param {*} product { price, slug, slug, image, name }
 * @param {*} variables example: [{ name: 'size', value: 's' }]
 */
export const addCartItem = ({
  product,
  variables,
  quantity = 1,
  newQuantity,
}) => {
  const productPrice =
    typeof product.price === "string"
      ? getFloatValue(product.price)
      : product.price;
  const productQuantity = parseInt(quantity);
  const productNewQuantity = newQuantity ? parseInt(newQuantity) : null;
  const existingCart = localStorage.getItem("cart");

  // Get existing cart or create new cart
  const cart = existingCart
    ? JSON.parse(existingCart)
    : {
        products: [],
        totalProducts: 0,
        totalPrice: 0,
      };

  // If product exists add to quantity otherwise add new product
  const existingCartItem = cart.products.find(
    (cartItem) => cartItem.slug === product.slug
  );

  if (existingCartItem) {
    updateCartItem({
      existingCartItem,
      variables,
      ...(productNewQuantity
        ? { newQuantity: productNewQuantity }
        : { quantity: productQuantity }),
    });
  } else {
    cart.products.push(
      createNewCartItem({
        product,
        price: productPrice,
        variables,
        quantity: productQuantity,
      })
    );
  }
  cart.totalProducts = cart.products.reduce(
    (a, product) => a + product.quantity,
    0
  );
  cart.totalPrice = cart.products.reduce(
    (a, product) => a + product.totalPrice,
    0
  );

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};
