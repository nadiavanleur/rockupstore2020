import React from "react";
import PropTypes from "prop-types";

const Select = ({ id, name, onChange, options }) => {
  return (
    <div className="e-select__container">
      <select id={id} name={name} onChange={onChange}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {};

export default Select;
