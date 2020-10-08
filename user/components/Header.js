import React, { Component } from "react";
import Menu from "./Menu";
import Button from "./Button";
import Section from "./Section";

class Header extends Component {
  constructor(props) {
    super(props);
    this.menuContainer = React.createRef();
  }
  render() {
    const MENU_OPEN_CLASS = "c-menus--open";
    const { topMenu, categoriesMenu, settings } = this.props;

    return (
      <div className="c-menus" ref={(el) => (this.menuContainer = el)}>
        <Button
          label="..."
          onClick={() => this.menuContainer.classList.toggle(MENU_OPEN_CLASS)}
          extraClasses="c-menus__toggle"
        />
        <div className="c-menus__container">
          <header className="o-retain o-retain--wall u-margin-none@until-md u-margin-bottom-base">
            <Menu menu={topMenu} />
          </header>
          <Section extraClasses="u-margin-bottom-base">
            <div className="o-layout o-layout--gutter-base o-layout--align-right u-margin-bottom-base">
              {settings &&
                (settings.generalSettingsTitle ||
                  settings.generalSettingsDescription) && (
                  <div className="o-layout__cell o-layout__cell--fill@from-md u-margin-bottom-base@until-md">
                    <h1>
                      {settings.generalSettingsTitle || ""}
                      {settings.generalSettingsDescription && (
                        <>
                          <br></br>
                          <small>{settings.generalSettingsDescription}</small>
                        </>
                      )}
                    </h1>
                  </div>
                )}
              <div className="o-layout__cell o-layout__cell--fit@from-md">
                <mark>[@TODO: search]</mark>
              </div>
            </div>
            {categoriesMenu && !!categoriesMenu.length && (
              <Menu
                menu={categoriesMenu}
                extraLayoutClasses="o-layout--gutter-small"
              />
            )}
          </Section>
        </div>
      </div>
    );
  }
}

export default Header;
