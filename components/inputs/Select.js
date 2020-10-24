import React from "react";
import PropTypes from "prop-types";

const Select = ({ id, name, onChange, options, defaultSelected, ...attr }) => {
  return (
    <div className="e-select__container">
      <select
        id={id}
        name={name}
        onChange={onChange}
        defaultValue={defaultSelected}
        {...attr}
      >
        {options &&
          !!options.length &&
          options.map((option) => {
            const label = option.label || option.value;
            const value = option.value || option.label;

            return (
              <option value={value} key={value}>
                {label}
              </option>
            );
          })}
      </select>
    </div>
  );
};

Select.propTypes = {};

export default Select;
