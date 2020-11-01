import React, { useContext } from "react";
import Button from "../Button";
import FormError from "../FormError";
import countryList from "../../helpers/countryList";
import Select from "../inputs/Select";

const BillingForm = ({
  input,
  onSubmit,
  onChange,
  checkoutLoading,
  paymentMethods,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
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
      <div className="form-group">
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
      {/* Company Name */}
      <div className="form-group">
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
      {/* Country */}
      <div className="form-group">
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
      {/* Street Address */}
      <div className="form-group">
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
      <div className="form-group">
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
      <div className="form-group">
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
      {/* Post Code */}
      <div className="form-group">
        <label htmlFor="post-code">
          Postcode
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          onChange={onChange}
          value={input.postcode}
          type="text"
          name="postcode"
          className="form-control woo-next-checkout-input"
          id="post-code"
        />
        <FormError errors={input.errors} fieldName={"postcode"} />
      </div>
      {/*Phone & Email*/}
      <div className="form-group">
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
      <div className="form-group">
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

      {/* Payment method */}
      <div className="form-group u-margin-bottom-base">
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
          <p className="u-margin-top-small u-margin-bottom-base">
            {
              paymentMethods?.find?.(
                (paymentMethod) => paymentMethod.id === input.paymentMethod
              )?.description
            }
          </p>
        )}
        <FormError errors={input.errors} fieldName={"paymentMethod"} />
      </div>
      <Button label="Checkout" type="submit" disabled={checkoutLoading} />
    </form>
  );
};

BillingForm.propTypes = {};

export default BillingForm;
