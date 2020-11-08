import { getFloatValue } from "./getFloatValue";
import { createNewCartItem } from "./createNewCartItem";
import { updateCartItem } from "./updateCartItem";

/**
 * removeCartItem
 *
 * @param {*} product { price, sku, slug, image, name }
 */
export const removeCartItem = ({ product }) => {
  const existingCart = localStorage.getItem("cart");

  // Get existing cart or create new cart
  const cart = existingCart
    ? JSON.parse(existingCart)
    : {
        products: [],
        totalProducts: 0,
        totalPrice: 0,
      };

  const existingProduct = cart.products.find(
    (cartItem) => cartItem.sku === product.sku
  );

  if (!existingProduct) return;

  cart.products = cart.products.filter(
    (cartItem) => cartItem.sku !== product.sku
  );

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
