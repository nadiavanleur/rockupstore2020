import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import Button from "../Button";
import EmptyCart from "../mutationButtons/EmptyCart";
import RestoreCartItems from "../mutationButtons/RestoreCartItems";

const CartItems = ({ collapsed }) => {
  const [cart, setCart] = useContext(CartContext);
  // const [restoreKeys, setRestoreKeys] = useState(null);

  const cartEmpty =
    !cart ||
    !cart.contents ||
    !cart.contents.itemCount ||
    !cart.contents.nodes.length;

  // if (!restoreKeys && cartEmpty) return <p>Cart is empty.</p>;
  if (cartEmpty) return <p>Cart is empty.</p>;

  // @TODO move function to getFormattedCart
  // Move variations to cartItems
  const cartItems = [];
  cart.contents.nodes.forEach((newItem) => {
    if (!newItem.variation) {
      newItem.keys = [newItem.key];
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
      exisitingItem.keys.push(newItem.key);
      exisitingItem.quantity += newItem.quantity;
    } else {
      newItem.variations = [];
      newItem.variations.push(newItem.variation);
      delete newItem.variation;

      newItem.keys = [];
      newItem.keys.push(newItem.key);
      delete newItem.key;

      cartItems.push(newItem);
    }
  });

  const allItemKeys = cartItems.reduce(
    (a, cartItem) => [...a, ...cartItem.keys],
    []
  );

  return (
    <div>
      {/* Items */}
      <table width="100%" className="c-responsive-table u-margin-bottom-small">
        <thead className="u-visually-hidden">
          <tr>
            {!collapsed && <th>Delete</th>}
            <th>Image</th>
            <th>Name</th>
            <th>Quantity select</th>
            <th>Total quantity</th>
            <th>Total price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartItem) => (
            <CartItem
              cartItem={cartItem}
              setCart={setCart}
              // setRestoreKeys={setRestoreKeys}
              collapsed={collapsed}
              key={cartItem.id}
            />
          ))}
        </tbody>
      </table>

      {/* Totals */}
      {!cartEmpty && (
        <div className="o-layout o-layout--align-right o-layout--gutter-base u-margin-top-base">
          <div className="o-layout__cell u-fraction--6of12@from-lg">
            <table>
              <thead className="u-visually-hidden">
                <tr>
                  <th>Total</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <small>subtotal</small>
                  </th>
                  <td />
                  <td className="u-text-right">{cart.subtotal}</td>
                </tr>
                <tr>
                  <th>
                    <small>shipping</small>
                  </th>
                  <td />
                  <td className="u-text-right">{cart.shippingTotal}</td>
                </tr>
                <tr>
                  <th>
                    <small>total</small>
                  </th>
                  <td className="u-text-right" width="100">
                    <small>
                      {cart.contents.itemCount} item
                      {cart.contents.itemCount !== 1 ? "s" : ""}
                    </small>
                  </td>
                  <td className="u-text-right" width="100">
                    {cart.total}
                  </td>
                </tr>
              </tbody>
            </table>
            {!collapsed && (
              <div className="o-layout o-layout--gutter-small o-layout--align-middle o-layout--align-right u-margin-top-base">
                <div className="o-layout__cell o-layout__cell--fit@from-md">
                  {/* <EmptyCart onCompleted={() => setRestoreKeys(allItemKeys)} /> */}
                </div>
                <div className="o-layout__cell o-layout__cell--fit@from-md">
                  <Button
                    label="Checkout"
                    tag="a"
                    href="/checkout"
                    extraClasses="c-button--fill"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

CartItems.propTypes = {};

export default CartItems;
