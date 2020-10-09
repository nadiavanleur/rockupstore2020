import React from "react";
import PropTypes from "prop-types";

const BillingForm = (props) => {
  return (
    <form>
      <div className="o-layout o-layout--gutter-base">
        <div className="o-layout__cell u-fraction--6of12@from-md">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" />
        </div>
        <div className="o-layout__cell u-fraction--6of12@from-md">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" />
        </div>
        <div className="o-layout__cell">
          <label htmlFor="company-name">Company Name</label>
          <input type="text" id="company-name" />
        </div>
        <div className="o-layout__cell">
          <mark>Country</mark>
        </div>
        <div className="o-layout__cell">
          <label htmlFor="street-address">Street Address</label>
          <input type="text" id="street-address" />
        </div>
        <div className="o-layout__cell">
          <label htmlFor="apartment">
            Apartment, suit, unit, etc... (optional)
          </label>
          <input type="text" id="apartment" />
        </div>
        <div className="o-layout__cell">
          <label htmlFor="city">Town / City</label>
          <input type="text" id="city" />
        </div>
        <div className="o-layout__cell">
          <label htmlFor="state">State / County</label>
          <input type="text" id="state" />
        </div>
        <div className="o-layout__cell">
          <label htmlFor="postcode">Postcode</label>
          <input type="text" id="postcode" />
        </div>
        <div className="o-layout__cell">
          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" />
        </div>
        <div className="o-layout__cell">
          <label htmlFor="email">E-mail</label>
          <input type="text" id="email" />
        </div>
      </div>
    </form>
  );
};

BillingForm.propTypes = {};

export default BillingForm;
