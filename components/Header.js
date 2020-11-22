import React, { Component } from "react";
import Menu from "./Menu";
import Button from "./Button";
import Section from "./Section";
import Link from "next/link";
import Breadcrumb from "./Breadcrumb";
import LogoSchema from "./schema/LogoSchema";

class Header extends Component {
  constructor(props) {
    super(props);
    this.menuContainer = React.createRef();
  }
  render() {
    const MENU_OPEN_CLASS = "c-menus--open";
    const {
      topMenu,
      // categoriesMenu,
      hideCategoryMenu,
      categories,
      settings,
      title,
      parent,
    } = this.props;

    const sectionTitle = (
      <Link href="/">
        <a>
          {settings?.logo ? (
            <>
              <span className="u-visually-hidden">{settings?.title || ""}</span>
              <img
                src={settings?.logo?.sourceUrl}
                srcSet={settings?.logo?.srcSet}
                alt={settings?.logo?.altText || settings?.logo?.title || ""}
                style={{ background: "none" }}
              />
              <LogoSchema logo={settings?.logo?.sourceUrl} />
            </>
          ) : (
            settings?.title || ""
          )}
        </a>
      </Link>
    );

    const breadcrumb = <Breadcrumb title={title} parent={parent} />;

    return (
      <>
        <div className="c-menus" ref={(el) => (this.menuContainer = el)}>
          <Button
            label="Menu"
            onClick={() => this.menuContainer.classList.toggle(MENU_OPEN_CLASS)}
            extraClasses="c-menus__toggle"
          />
          <div className="c-menus__container">
            <header className="u-margin-bottom-base">
              {/* Top menu */}
              <Menu menu={topMenu} />
            </header>
            <div className="o-retain o-retain--wall u-margin-bottom-base">
              <Section
                title={
                  <>
                    {sectionTitle}
                    {settings?.subtitle && <small>{settings?.subtitle}</small>}
                  </>
                }
                subtitle={settings?.subtitle}
                TitleTag="h1"
                breadcrumb={breadcrumb}
                extraClasses="c-section--header"
              >
                {/* Categories menu */}
                {/* {!hideCategoryMenu && !!categoriesMenu?.length && (
                  <Menu
                    menu={categoriesMenu}
                    extraLayoutClasses="o-layout--gutter-small"
                  />
                )} */}
                {!hideCategoryMenu && !!categories?.length && (
                  <Menu
                    menu={categories}
                    extraLayoutClasses="o-layout--gutter-small"
                  />
                )}
              </Section>
            </div>
          </div>
        </div>

        {/* Mobile title section */}
        <div className="o-retain o-retain--wall u-margin-bottom-base u-hidden@from-md">
          <Section title={sectionTitle} TitleTag="h2" breadcrumb={breadcrumb} />
        </div>
      </>
    );
  }
}

export default Header;
