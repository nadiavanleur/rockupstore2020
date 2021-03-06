import React from "react";
import Button from "./Button";

const Menu = ({ menu, extraLayoutClasses }) => {
  if (!menu || !menu.length) return null;

  return (
    <nav className="c-menu">
      <ul className={`o-layout ${extraLayoutClasses || ""}`}>
        {menu.map((menuItem) => {
          if (menuItem.parentId) return null;
          return (
            <li
              className="c-menu__item o-layout__cell o-layout__cell--fill@from-md"
              key={menuItem.id}
            >
              <Button
                label={menuItem.label}
                tag="a"
                href={
                  menuItem.connectedNode
                    ? menuItem.connectedNode.node.uri
                    : menuItem.path || "/"
                }
                target={menuItem.target}
                extraClasses="c-menu__link"
              />
              {menuItem.childItems &&
                menuItem.childItems.nodes &&
                !!menuItem.childItems.nodes.length && (
                  <ul className="c-menu__submenu o-list-clean">
                    {menuItem.childItems.nodes.map((subItem) => (
                      <li key={subItem.id} className="c-menu__submenu-item">
                        <Button
                          label={subItem.label}
                          tag="a"
                          href={
                            subItem.connectedNode
                              ? subItem.connectedNode.node.uri
                              : subItem.path || "/"
                          }
                          target={subItem.target}
                          extraClasses="c-button--link"
                        />
                      </li>
                    ))}
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
