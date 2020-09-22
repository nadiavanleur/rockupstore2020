import { getFloatValue } from "./getFloatValue";
import { createNewProduct } from "./createNewProduct";

export const addProduct = (product) => {
  const productPrice = getFloatValue(product.price);
  console.log(productPrice);
  const existingCart = localStorage.getItem("cart");

  const newCart = existingCart
    ? JSON.parse(existingCart)
    : {
        products: [],
        totalProducts: 0,
        totalPrice: productPrice,
      };

  newCart.products.push(createNewProduct(product, product.productPrice));
  newCart.totalProducts += 1;
  newCart.totalPrice += productPrice;

  localStorage.setItem("cart", JSON.stringify(newCart));

  return newCart;
};
