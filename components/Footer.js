import React from "react";
import Menu from "./Menu";

const Footer = ({ footerMenu }) => {
  return (
    <footer className="c-footer">
      <div className="o-retain o-retain--wall">
        <Menu menu={footerMenu} />
      </div>
    </footer>
  );
};

export default Footer;
