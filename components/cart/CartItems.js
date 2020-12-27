import React, { Fragment, useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import Button from "../Button";
import RemoveFromCart from "../mutationButtons/RemoveFromCart";

const CartItems = ({ collapsed }) => {
  const [cart, setCart] = useContext(CartContext);
  const cartEmpty =
    !cart?.contents?.itemCount ||
    !cart?.contents?.nodes?.length ||
    !cart?.cartItems;

  if (cartEmpty) return <p>Cart is empty.</p>;

  const { cartItems } = cart;

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
              collapsed={collapsed}
              key={`${cartItem.id}${cartItem.product.slug}`}
            />
          ))}
        </tbody>
      </table>

      {/* Totals */}
      {!cartEmpty && (
        <div className="o-layout o-layout--align-right o-layout--gutter-base u-margin-top-base">
          <div
            className={`o-layout__cell${
              !collapsed ? " u-fraction--6of12@from-lg" : ""
            }`}
          >
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
                  <th>Subtotal</th>
                  <td />
                  <td className="u-text-right">{cart.subtotal}</td>
                </tr>
                <tr>
                  <th>Shipping</th>
                  <td />
                  <td className="u-text-right">
                    {cart?.shippingTotal == "€0,00"
                      ? "Free"
                      : cart.shippingTotal}
                  </td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td className="u-text-right u-text-small" width="100">
                    {cart.contents.itemCount} item
                    {cart.contents.itemCount !== 1 ? "s" : ""}
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
                  <RemoveFromCart
                    keys={allItemKeys}
                    cartItems={cartItems}
                    listName="Cart | Remove all"
                  >
                    {({ removeFromCart, disabled }) => (
                      <Button
                        label="Empty cart"
                        onClick={removeFromCart}
                        disabled={disabled}
                        extraClasses="c-button--link c-button--fill"
                      />
                    )}
                  </RemoveFromCart>
                </div>
                <div className="o-layout__cell o-layout__cell--fit@from-md">
                  <Button
                    label="Checkout"
                    tag="a"
                    href="/checkout#checkout"
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
