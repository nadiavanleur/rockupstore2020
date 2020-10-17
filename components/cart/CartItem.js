import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { addCartItem } from "../../helpers/addCartItem";
import { removeCartItem } from "../../helpers/removeCartItem";
import Link from "next/link";
import RemoveFromCart from "../mutationButtons/RemoveFromCart";

const CartItem = ({ cartItem, setCart, setRestoreKeys, collapsed }) => {
  const handleQuantityUpdate = (attributes, newQuantity) => {
    /**
     * @TODO
     * Mutations:
     * - updateItemQuantities
     */
    if (!process.browser) return;

    const newCart = addCartItem({ product: cartItem, attributes, newQuantity });
    setCart(newCart);
  };

  return (
    <tr
      key={cartItem.product.slug}
      className="c-responsive-table__row u-umbrella__container"
    >
      {/* Delete */}
      {!collapsed && (
        <td width="70" className="c-responsive-table__cell--fixed-top-right">
          <div className="u-umbrella__overlay">
            <RemoveFromCart
              keys={cartItem.keys}
              onCompleted={() => setRestoreKeys(cartItem.keys)}
            />
          </div>
        </td>
      )}

      {/* Image */}
      <td width="100" className="c-responsive-table__cell--fit">
        <div className="o-flexembed">
          <img
            width="70"
            height="70"
            src={cartItem.product.image.sourceUrl}
            srcSet={cartItem.product.image.srcSet}
            alt={
              cartItem.product.image.altText ||
              cartItem.product.image.title ||
              ""
            }
            className="o-flexembed__item"
          />
        </div>
      </td>

      {/* Name + url */}
      <td>
        {cartItem.product.name}
        <Link href="/product/[slug]" as={`/product/${cartItem.product.slug}`}>
          <a className="u-umbrella">
            <span className="u-visually-hidden">Go to product page</span>
          </a>
        </Link>
      </td>

      {/* Quantity select */}
      {!collapsed && (
        <td className="c-responsive-table__cell--full-width u-text-right u-umbrella__overlay">
          <table>
            <tbody>
              {cartItem.variations ? (
                <>
                  {cartItem.variations.map((variation) => {
                    const variationString = variation.attributes.nodes
                      .map((variable) => variable.value)
                      .join(", ");

                    return (
                      <tr key={`${cartItem.product.slug}-${variationString}`}>
                        <td>
                          <small>{variationString}</small>
                        </td>
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
                              handleQuantityUpdate({
                                productId: cartItem.product.productId,
                                variationId: variation.variationId,
                                quantity: target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr key={`${cartItem.product.slug}`}>
                  <td></td>
                  <td>
                    <small>{cartItem.product.price}</small>
                  </td>
                  <td className="u-text-right u-text-bottom">
                    <input
                      type="number"
                      min="1"
                      max={cartItem.product.stockQuantity}
                      defaultValue={cartItem.quantity}
                      name={`${cartItem.product.slug}`}
                      onChange={({ target }) =>
                        handleQuantityUpdate({
                          productId: cartItem.product.productId,
                          quantity: target.value,
                        })
                      }
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </td>
      )}

      {/* Total quantity */}
      <td className="u-text-right u-text-bottom" width="100">
        {cartItem.quantity > 1 && (
          <div>
            <small>{cartItem.quantity} items</small>
          </div>
        )}
      </td>

      {/* Total price */}
      <td className="u-text-right u-text-bottom" width="100">
        <div>{cartItem.total}</div>
      </td>
    </tr>
  );
};

CartItem.propTypes = {};

export default CartItem;
