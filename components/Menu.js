import React from "react";
import Button from "./Button";
import CartIcon from "./cart/CartIcon";

const Menu = ({ menu, extraLayoutClasses }) => {
  if (!menu || !menu.length) return null;

  return (
    <nav className="c-menu">
      <ul className={`o-layout ${extraLayoutClasses || ""}`}>
        {menu.map((menuItem) => {
          if (menuItem.parentId) return;

          let href =
            menuItem?.connectedNode?.node?.uri ||
            menuItem.path ||
            menuItem.uri ||
            "/";

          if (href.split("/product-category/").length > 1)
            href = `/product-category/${
              menuItem.connectedNode?.node?.slug || menuItem.slug
            }`;

          const label = menuItem.label || menuItem.name;

          if (!href || !label) return;

          const subItems =
            menuItem.childItems?.nodes || menuItem.children?.nodes;

          return (
            <li
              className="c-menu__item o-layout__cell o-layout__cell--fill@from-md"
              key={menuItem.id}
            >
              <Button
                tag="a"
                label={label}
                href={href}
                target={menuItem.target}
                extraClasses="c-menu__link c-button--fill"
              >
                {(href === "/cart/" || href === "/checkout/") && <CartIcon />}
              </Button>

              {!!subItems.length && (
                <ul className="c-menu__submenu o-list-clean">
                  {subItems.map((subItem) => {
                    let subHref =
                      subItem?.connectedNode?.node?.uri ||
                      subItem.path ||
                      subItem.uri ||
                      "/";

                    if (subHref.split("/product-category/").length > 1)
                      subHref = `/product-category/${
                        subItem?.connectedNode?.node?.slug || subItem.slug
                      }`;

                    const subLabel = subItem.label || subItem.name;

                    if (!subHref || !subLabel) return;

                    return (
                      <li key={subItem.id} className="c-menu__submenu-item">
                        <Button
                          tag="a"
                          label={subLabel}
                          href={subHref}
                          target={subItem.target}
                          extraClasses="c-button--link c-button--fill-left"
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
