export const createNewCartItem = ({
  product,
  price,
  variables,
  quantity = 1,
}) => {
  return {
    slug: product.slug,
    image: product.image,
    name: product.name,
    price: price,
    quantity,
    totalPrice: parseFloat((price * quantity).toFixed(2)),
    ...(variables
      ? {
          variants: [
            {
              variables: variables,
              quantity: quantity,
            },
          ],
        }
      : {}),
  };
};
