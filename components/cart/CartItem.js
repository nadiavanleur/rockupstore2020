import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { addCartItem } from "../../helpers/addCartItem";
import { removeCartItem } from "../../helpers/removeCartItem";
import Link from "next/link";

const CartItem = ({ cartItem, setCart, collapsed }) => {
  const handleQuantityUpdate = (attributes, newQuantity) => {
    if (!process.browser) return;

    const newCart = addCartItem({ product: cartItem, attributes, newQuantity });
    setCart(newCart);
  };

  const deleteCartItem = (attributes) => {
    // @TODO
    if (!process.browser) return;

    const newCart = removeCartItem({ product: cartItem, attributes });
    setCart(newCart);
  };

  console.log(cartItem);

  return (
    <tr key={cartItem.product.slug} className="u-umbrella__container">
      <td hidden>{cartItem.product.slug}</td>
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
          src={cartItem.product.image.sourceUrl}
          srcSet={cartItem.product.image.srcSet}
          alt={
            cartItem.product.image.altText || cartItem.product.image.title || ""
          }
        />
      </td>
      {!collapsed && (
        <td>
          <small>
            <Link
              href="product/[slug]"
              as={`/product/${cartItem.product.slug}`}
            >
              <a className="u-umbrella">{cartItem.product.slug}</a>
            </Link>
          </small>
        </td>
      )}
      <td>{cartItem.product.name}</td>
      {!collapsed && (
        <td className="u-text-right u-umbrella__overlay">
          {cartItem.variations.length && (
            <table>
              <tbody>
                {cartItem.variations.map((variation) => {
                  const variationString = variation.attributes.nodes
                    .map((variable) => variable.value)
                    .join(", ");

                  return (
                    <tr key={`${cartItem.product.slug}-${variationString}`}>
                      <td>{variationString}</td>
                      <td>
                        <small>{variation.price}</small>
                      </td>
                      <td className="u-text-right u-text-bottom">
                        <input
                          type="number"
                          min="1"
                          max={variation.stockQuantity}
                          defaultValue={variation.quantity}
                          name={`${cartItem.product.slug}-${variationString}`}
                          onChange={({ target }) =>
                            handleQuantityUpdate(
                              variation.variationId,
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
            <small>{cartItem.quantity} items</small>
          </div>
        )}
        <div>{cartItem.total}</div>
      </td>
    </tr>
  );
};

CartItem.propTypes = {};

export default CartItem;
