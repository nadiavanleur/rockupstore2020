import React, { useContext } from "react";
import Button from "../Button";
import FormError from "../FormError";
import countryList from "../../helpers/countryList";
import Select from "../inputs/Select";
import Link from "next/link";

const BillingForm = ({
  input,
  onSubmit,
  onChange,
  checkoutLoading,
  paymentMethods,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="o-layout o-layout--gutter-base o-layout--equalheight">
        <div className="o-layout__cell u-fraction--6of12@from-lg">
          <fieldset>
            <legend>Personal info</legend>

            <div className="o-layout o-layout--gutter-base">
              <div className="o-layout__cell u-fraction--6of12">
                {/* First name */}
                <div className="c-form__row">
                  <label htmlFor="first-name">
                    First Name
                    <abbr className="required" title="required">
                      *
                    </abbr>
                  </label>
                  <input
                    onChange={onChange}
                    value={input.firstName}
                    type="text"
                    name="firstName"
                    className="form-control woo-next-checkout-input"
                    id="first-name"
                  />
                  <FormError errors={input.errors} fieldName={"firstName"} />
                </div>
              </div>
              <div className="o-layout__cell u-fraction--6of12">
                {/* Last name */}
                <div className="c-form__row">
                  <label htmlFor="last-name">
                    Last Name
                    <abbr className="required" title="required">
                      *
                    </abbr>
                  </label>
                  <input
                    onChange={onChange}
                    value={input.lastName}
                    type="text"
                    name="lastName"
                    className="form-control woo-next-checkout-input"
                    id="last-name"
                  />
                  <FormError errors={input.errors} fieldName={"lastName"} />
                </div>
              </div>
            </div>

            {/* Company Name */}
            <div className="c-form__row">
              <label htmlFor="first-name">Company Name</label>
              <input
                onChange={onChange}
                value={input.company}
                type="text"
                name="company"
                className="form-control woo-next-checkout-input"
                id="first-name"
              />
              <FormError errors={input.errors} fieldName={"company"} />
            </div>

            {/* Phone */}
            <div className="c-form__row">
              <label htmlFor="phone">
                Phone
                <abbr className="required" title="required">
                  *
                </abbr>
              </label>
              <input
                onChange={onChange}
                value={input.phone}
                type="text"
                name="phone"
                className="form-control woo-next-checkout-input"
                id="phone"
              />
              <FormError errors={input.errors} fieldName={"phone"} />
            </div>

            {/* Email */}
            <div className="c-form__row">
              <label htmlFor="email">
                Email
                <abbr className="required" title="required">
                  *
                </abbr>
              </label>
              <input
                onChange={onChange}
                value={input.email}
                type="email"
                name="email"
                className="form-control woo-next-checkout-input"
                id="email"
              />
              <FormError errors={input.errors} fieldName={"email"} />
            </div>
          </fieldset>
        </div>

        <div className="o-layout__cell u-fraction--6of12@from-lg">
          <fieldset>
            <legend>Shipping address</legend>

            {/* Street Address */}
            <div className="c-form__row">
              <label htmlFor="street-address">
                Street Address
                <abbr className="required" title="required">
                  *
                </abbr>
              </label>
              <input
                type="text"
                onChange={onChange}
                value={input.address1}
                name="address1"
                placeholder="House number and street name"
                className="form-control woo-next-checkout-input"
                id="street-address"
              />
              <FormError errors={input.errors} fieldName={"address1"} />
              <br />
              <input
                type="text"
                onChange={onChange}
                value={input.address2}
                name="address2"
                placeholder="Apartment, suite, unit etc.(optional)"
                className="form-control woo-next-checkout-input"
                id="first-name"
              />
            </div>

            {/* Town/City */}
            <div className="c-form__row">
              <label htmlFor="city">
                Town/City
                <abbr className="required" title="required">
                  *
                </abbr>
              </label>
              <input
                onChange={onChange}
                value={input.city}
                type="text"
                name="city"
                className="form-control woo-next-checkout-input"
                id="city"
              />
              <FormError errors={input.errors} fieldName={"city"} />
            </div>

            {/* County */}
            <div className="c-form__row">
              <label htmlFor="state">
                State/County
                <abbr className="required" title="required">
                  *
                </abbr>
              </label>
              <input
                onChange={onChange}
                value={input.state}
                type="text"
                name="state"
                className="form-control woo-next-checkout-input"
                id="state"
              />
              <FormError errors={input.errors} fieldName={"state"} />
            </div>

            {/* Country */}
            <div className="c-form__row">
              <label htmlFor="country-select">
                Country
                <abbr className="required" title="required">
                  *
                </abbr>
              </label>
              <Select
                onChange={onChange}
                defaultSelected={input.country}
                name="country"
                extraClasses="woo-next-checkout-input"
                id="country-select"
                options={countryList?.map((country) => ({
                  value: country.countryCode,
                  label: country.countryName,
                }))}
              />
              <FormError errors={input.errors} fieldName={"country"} />
            </div>
          </fieldset>
        </div>
      </div>

      <fieldset>
        <legend className="u-visually-hidden">Payment</legend>

        {/* Payment method */}
        <div className="c-form__row u-margin-none">
          <label htmlFor="country-select">
            Payment method
            <abbr className="required" title="required">
              *
            </abbr>
          </label>
          <Select
            onChange={onChange}
            defaultSelected={input.paymentMethod}
            name="paymentMethod"
            extraClasses="woo-next-checkout-input"
            id="payment-method-select"
            options={paymentMethods?.map((paymentMethod) => ({
              label: paymentMethod.title,
              value: paymentMethod.id,
            }))}
          />
          {input.paymentMethod && (
            <p className="u-margin-top-small u-margin-bottom-none">
              {
                paymentMethods?.find?.(
                  (paymentMethod) => paymentMethod.id === input.paymentMethod
                )?.description
              }
            </p>
          )}
          <FormError errors={input.errors} fieldName={"paymentMethod"} />
        </div>
      </fieldset>

      <div className="o-layout o-layout--gutter-small o-layout--align-right o-layout--align-middle">
        <div className="o-layout__cell o-layout__cell--fit">
          <small>
            By clicking "checkout" you agree to the{" "}
            <Link href="/page/[slug]" as="/page/terms-and-conditions">
              <a target="_blank">terms and conditions</a>
            </Link>{" "}
            and have read the{" "}
            <Link href="/page/[slug]" as="/page/return-policy">
              <a target="_blank">return policy</a>
            </Link>
            .
          </small>
        </div>
        <div className="o-layout__cell o-layout__cell--fit">
          <Button label="Checkout" type="submit" disabled={checkoutLoading} />
        </div>
      </div>
    </form>
  );
};

BillingForm.propTypes = {};

export default BillingForm;
