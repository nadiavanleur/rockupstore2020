import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { addCartItem } from "../../helpers/addCartItem";
import { removeCartItem } from "../../helpers/removeCartItem";
import Link from "next/link";

const CartItem = ({ cartItem, setCart, collapsed }) => {
  const handleQuantityUpdate = (attributes, newQuantity) => {
    // @TODO
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
    <tr
      key={cartItem.product.slug}
      className="c-responsive-table__row u-umbrella__container"
    >
      {!collapsed && (
        <td
          width="70"
          className="c-responsive-table__cell--right c-responsive-table__cell--last"
        >
          <button onClick={deleteCartItem} className="u-umbrella__overlay">
            Delete
          </button>
        </td>
      )}
      <td width="100">
        <img
          width="70"
          height="70"
          src={cartItem.product.image.sourceUrl}
          srcSet={cartItem.product.image.srcSet}
          alt={
            cartItem.product.image.altText || cartItem.product.image.title || ""
          }
        />
      </td>
      <td width="70" className="c-responsive-table__cell--right">
        <small>
          <Link href="product/[slug]" as={`/product/${cartItem.product.slug}`}>
            <a className="u-umbrella">{cartItem.product.slug}</a>
          </Link>
        </small>
      </td>
      <td>{cartItem.product.name}</td>
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
      <td className="u-text-right u-text-bottom" width="100">
        {cartItem.quantity > 1 && (
          <div>
            <small>{cartItem.quantity} items</small>
          </div>
        )}
      </td>
      <td className="u-text-right u-text-bottom" width="100">
        <div>{cartItem.total}</div>
      </td>
    </tr>
  );
};

CartItem.propTypes = {};

export default CartItem;
