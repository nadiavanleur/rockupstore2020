import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../context/AppContext";
import CartItem from "./CartItem";
import Button from "../Button";

const CartItems = ({ collapsed }) => {
  const [cart, setCart] = useContext(AppContext);

  const handleRemoveItem = () => {};

  if (!cart || !cart.totalProducts || !cart.products || !cart.products.length)
    return <p>Cart is empty.</p>;

  return (
    <>
      <table width="100%" className="u-margin-bottom-small">
        <thead className="u-visually-hidden">
          <tr>
            <th hidden>ID</th>
            {!collapsed && <th>Delete</th>}
            <th>Image</th>
            <th>Name</th>
            {!collapsed && <th className="u-text-right">Quantity</th>}
            <th className="u-text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.products &&
            cart.products.map((cartItem) => (
              <CartItem
                cartItem={cartItem}
                setCart={setCart}
                handleRemoveItem={handleRemoveItem}
                key={cartItem.id}
                collapsed={collapsed}
              />
            ))}
        </tbody>
      </table>

      <div className="u-padding-right-small u-text-right">
        <div className="o-layout o-layout--gutter-base o-layout--align-right o-layout--align-middle">
          <div className="o-layout__cell o-layout__cell--fit">Total</div>
          <div className="o-layout__cell o-layout__cell--fit">
            <small>
              {cart.totalProducts} item{cart.totalProducts !== 1 ? "s" : ""}
            </small>
          </div>
          <div className="o-layout__cell o-layout__cell--fit">
            <b>€ {cart.totalPrice}</b>
          </div>
          {!collapsed && (
            <div className="o-layout__cell o-layout__cell--fit">
              <Button label="Checkout" tag="a" href="/checkout" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

CartItems.propTypes = {};

export default CartItems;
