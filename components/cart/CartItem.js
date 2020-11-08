import React from "react";
import { addCartItem } from "../../helpers/addCartItem";
import Link from "next/link";
import RemoveFromCart from "../mutationButtons/RemoveFromCart";
import UpdateItemQuantity from "../mutationButtons/UpdateItemQuantity";
import { v4 } from "uuid";

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
      key={cartItem.product.sku}
      className="c-responsive-table__row u-umbrella__container"
    >
      {/* Delete */}
      {!collapsed && (
        <td width="70" className="c-responsive-table__cell--fixed-top-right">
          <div className="u-umbrella__overlay">
            <RemoveFromCart keys={cartItem.keys}>
              {({ removeFromCart, disabled }) => (
                <button onClick={removeFromCart} disabled={disabled}>
                  Delete
                </button>
              )}
            </RemoveFromCart>
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
        <Link href="/product/[id]" as={`/product/${cartItem.product.sku}`}>
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
                      <tr key={variation.id}>
                        <td>
                          <small>{variationString}</small>
                        </td>
                        <td>
                          <small>{variation.price}</small>
                        </td>
                        <td className="u-text-right u-text-bottom">
                          <UpdateItemQuantity key={cartItem.keys[0]}>
                            {({ updateItemQuantity, disabled }) => {
                              let timer;

                              return (
                                <input
                                  type="number"
                                  min="1"
                                  max={variation.stockQuantity}
                                  defaultValue={variation.quantity}
                                  name={`${cartItem.product.sku}-${variationString}`}
                                  onChange={({ target }) => {
                                    clearTimeout(timer);

                                    timer = setTimeout(() => {
                                      updateItemQuantity({
                                        variables: {
                                          input: {
                                            clientMutationId: v4(),
                                            items: [
                                              {
                                                key: variation.key,
                                                quantity: target.value,
                                              },
                                            ],
                                          },
                                        },
                                      });
                                    }, 300);
                                  }}
                                />
                              );
                            }}
                          </UpdateItemQuantity>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr key={`${cartItem.product.sku}`}>
                  <td></td>
                  <td>
                    <small>{cartItem.product.price}</small>
                  </td>
                  <td className="u-text-right u-text-bottom">
                    <UpdateItemQuantity key={cartItem.keys[0]}>
                      {({ updateItemQuantity, disabled }) => {
                        let timer;

                        return (
                          <input
                            type="number"
                            min="1"
                            max={cartItem.product.stockQuantity}
                            defaultValue={cartItem.quantity}
                            name={`${cartItem.product.sku}`}
                            disabled={disabled}
                            onChange={({ target }) => {
                              clearTimeout(timer);

                              timer = setTimeout(() => {
                                updateItemQuantity({
                                  variables: {
                                    input: {
                                      clientMutationId: v4(),
                                      items: [
                                        {
                                          key: cartItem.keys[0],
                                          quantity: target.value,
                                        },
                                      ],
                                    },
                                  },
                                });
                              }, 300);
                            }}
                          />
                        );
                      }}
                    </UpdateItemQuantity>
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
