import React from "react";
import PropTypes from "prop-types";
import Select from "./inputs/Select";

const VariationSelect = ({
  variations: { nodes: variations },
  attributes: { edges: attributes },
  updateSelectedVariation,
}) => {
  console.dir(variations);
  if (!variations || !variations.length) return;

  //   Filter attributes
  const filteredAttributes =
    attributes &&
    attributes
      .filter(({ node: attribute }) => attribute.variation)
      .map(({ node: attribute }) => attribute);

  // Default selected variables
  let selectedVariables = filteredAttributes.map((attribute) => ({
    name: attribute.name,
    value: attribute.options[0],
  }));

  const getSelectedVariation = () => {
    console.log(selectedVariables);
    const selectedVariation = variations.find((variation) =>
      // @TODO: Match each attribute
      variation.attributes.nodes.find(
        (attribute) =>
          attribute.name === selectedVariables.name &&
          attribute.value === selectedVariables.value
      )
    );
    return selectedVariation;
  };

  // Return selected variationId
  const returnSelectedVariationId = ({ target }) => {
    const changedVariable = selectedVariables.find(
      (variable) => variable.name === target.name
    );
    changedVariable.value = target.value;

    return getSelectedVariation();
  };

  console.log(getSelectedVariation());

  return (
    <div>
      {filteredAttributes.map((attribute) => (
        <div
          className="o-layout o-layout--gutter-base o-layout--align-middle u-margin-bottom-small"
          key={attribute.name}
        >
          <div className="o-layout__cell u-fraction--2of12">
            <label htmlFor={attribute.id}>{attribute.name}</label>
          </div>
          <div className="o-layout__cell u-fraction--10of12">
            <Select
              id={attribute.id}
              name={attribute.name}
              onChange={updateSelectedVariation}
              options={attribute.options}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

VariationSelect.propTypes = {};

export default VariationSelect;
