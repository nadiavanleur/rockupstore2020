import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../context/AppContext";
import CartItem from "./CartItem";
import Button from "../Button";
import EmptyCart from "./EmptyCart";

const CartItems = ({ collapsed }) => {
  const [cart, setCart] = useContext(AppContext);

  console.log(cart);

  const handleRemoveItem = () => {};

  if (
    !cart ||
    !cart.contents ||
    !cart.contents.itemCount ||
    !cart.contents.nodes.length
  )
    return <p>Cart is empty.</p>;

  // @TODO move function to getFormattedCart
  // Move variations to cartItems
  const cartItems = [];
  cart.contents.nodes.forEach((newItem) => {
    if (!newItem.variation) {
      cartItems.push(newItem);
      return;
    }

    const exisitingItem = cartItems.find(
      (item) => item.product.productId === newItem.product.productId
    );

    newItem.variation.quantity = newItem.quantity;
    newItem.variation.total = newItem.total;

    if (exisitingItem) {
      exisitingItem.variations.push(newItem.variation);
      exisitingItem.quantity += newItem.quantity;
    } else {
      newItem.variations = [];
      newItem.variations.push(newItem.variation);
      delete newItem.variation;
      cartItems.push(newItem);
    }
  });

  return (
    <>
      <table width="100%" className="u-margin-bottom-small">
        <thead className="u-visually-hidden">
          <tr>
            <th hidden>ID</th>
            {!collapsed && <th>Delete</th>}
            <th>Image</th>
            {!collapsed && <th>ID</th>}
            <th>Name</th>
            {!collapsed && <th className="u-text-right">Quantity</th>}
            <th className="u-text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartItem) => (
            <CartItem
              cartItem={cartItem}
              setCart={setCart}
              handleRemoveItem={handleRemoveItem}
              collapsed={collapsed}
              key={cartItem.id}
            />
          ))}
        </tbody>
      </table>

      <div className="o-layout o-layout--align-right o-layout--gutter-base">
        <div className="o-layout__cell u-fraction--4of12@from-md">
          <table>
            <thead className="u-visually-hidden">
              <tr>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <small>subtotal</small>
                </th>
                <td className="u-text-right">{cart.subtotal}</td>
              </tr>
              <tr>
                <th>
                  <small>shipping</small>
                </th>
                <td className="u-text-right">{cart.shippingTotal}</td>
              </tr>
              <tr>
                <th>
                  <small>total</small>
                </th>
                <td className="u-text-right">
                  <small>
                    {cart.contents.itemCount} item
                    {cart.contents.itemCount !== 1 ? "s" : ""}
                  </small>{" "}
                  {cart.total}
                </td>
              </tr>
            </tbody>
          </table>
          {!collapsed && (
            <>
              <div className="u-margin-top-base">
                <Button label="Checkout" tag="a" href="/checkout" />
              </div>
              <div className="u-margin-top-small">
                <EmptyCart />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

CartItems.propTypes = {};

export default CartItems;
