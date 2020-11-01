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
          <header className="u-margin-bottom-base">
            <Menu menu={topMenu} />
          </header>
          <div className="o-retain o-retain--wall u-margin-bottom-base">
            <Section
              title={
                <>
                  {settings?.logo ? (
                    <div className="u-fraction--6of12@from-md">
                      <span className="u-visually-hidden">
                        {settings?.generalSettingsTitle || ""}
                      </span>
                      <img
                        src={settings.logo.sourceUrl}
                        srcSet={settings.logo.srcSet}
                        alt={settings.logo.altText || settings.logo.title || ""}
                        style={{ background: "none" }}
                      />
                    </div>
                  ) : (
                    settings?.generalSettingsTitle || ""
                  )}
                </>
              }
              TitleTag="h1"
            >
              {!!categoriesMenu?.length && (
                <Menu
                  menu={categoriesMenu}
                  extraLayoutClasses="o-layout--gutter-small"
                />
              )}
            </Section>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
