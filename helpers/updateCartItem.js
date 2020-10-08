import { findMatchingCartVariant } from "./findMatchingCartVariant";

export const updateCartItem = ({
  existingCartItem,
  variables,
  quantity = 1,
  newQuantity,
}) => {
  if (variables) {
    const existingVariant = findMatchingCartVariant(
      existingCartItem.variants,
      variables
    );

    if (existingVariant) {
      existingVariant.quantity =
        newQuantity || existingVariant.quantity + quantity;
    } else {
      existingCartItem.variants.push({
        variables,
        quantity: newQuantity || quantity,
      });
    }

    existingCartItem.quantity = existingCartItem.variants.reduce(
      (a, variant) => a + variant.quantity,
      0
    );
  } else {
    existingCartItem.quantity =
      newQuantity || existingCartItem.quantity + quantity;
  }

  existingCartItem.totalPrice = parseFloat(
    (existingCartItem.price * existingCartItem.quantity).toFixed(2)
  );
};
