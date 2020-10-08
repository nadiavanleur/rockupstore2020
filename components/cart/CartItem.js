import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { addCartItem } from "../../helpers/addCartItem";
import { removeCartItem } from "../../helpers/removeCartItem";
import Link from "next/link";

const CartItem = ({ cartItem, setCart, handleRemoveItem, collapsed }) => {
  const handleQuantityUpdate = (variables, newQuantity) => {
    if (!process.browser) return;

    const newCart = addCartItem({ product: cartItem, variables, newQuantity });
    setCart(newCart);
  };

  const deleteCartItem = (variables) => {
    if (!process.browser) return;

    const newCart = removeCartItem({ product: cartItem, variables });
    setCart(newCart);
  };

  return (
    <tr key={cartItem.slug} className="u-umbrella__container">
      <td hidden>{cartItem.slug}</td>
      {!collapsed && (
        <td>
          <button onClick={deleteCartItem} className="u-umbrella__overlay">
            Delete
          </button>
        </td>
      )}
      <td>
        <img
          width="70"
          src={cartItem.image.sourceUrl}
          srcSet={cartItem.image.srcSet}
          alt={cartItem.image.altText || cartItem.image.title || ""}
        />
      </td>
      <td>
        <Link href="product/[slug]" as={`/product/${cartItem.slug}`}>
          <a className="u-umbrella">
            {cartItem.name} | {cartItem.slug}
          </a>
        </Link>
      </td>
      {!collapsed && (
        <td className="u-text-right u-umbrella__overlay">
          {cartItem.variants.length && (
            <table>
              <tbody>
                {cartItem.variants.map((variant) => {
                  const variantString = variant.variables
                    .map((variable) => variable.value)
                    .join(", ");

                  return (
                    <tr key={`${cartItem.slug}-${variantString}`}>
                      <td>{variantString}</td>
                      <td className="u-text-right u-text-bottom">
                        <input
                          type="number"
                          min="1"
                          defaultValue={variant.quantity}
                          name={`${cartItem.slug}-${variantString}`}
                          onChange={({ target }) =>
                            handleQuantityUpdate(
                              variant.variables,
                              target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </td>
      )}
      <td className="u-text-right u-text-bottom">
        {cartItem.quantity > 1 && (
          <div>
            <small>
              {cartItem.quantity} x &euro; {cartItem.price.toFixed(2)}
            </small>
          </div>
        )}
        <div>&euro; {cartItem.totalPrice.toFixed(2)}</div>
      </td>
    </tr>
  );
};

CartItem.propTypes = {};

export default CartItem;
