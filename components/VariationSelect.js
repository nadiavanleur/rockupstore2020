import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Select from "./inputs/Select";

const VariationSelect = ({
  variations: variationsProp,
  attributes: attributesProp,
  updateSelectedVariation,
  defaultSelectedVariation,
}) => {
  if (
    !variationsProp ||
    !variationsProp.nodes.length ||
    !attributesProp ||
    !attributesProp.nodes.length
  )
    return null;

  const variations = variationsProp.nodes;
  const attributes = attributesProp.nodes;

  //   Filter attributes
  const filteredAttributes = attributes?.filter?.(
    (attribute) => attribute.variation
  );

  const getMatchingVariation = (selectedAttributes) =>
    variations.find((variation) =>
      variation.attributes.nodes.every(
        (attribute) => selectedAttributes[attribute.name] === attribute.value
      )
    );

  const handleSelectionChange = () => {
    const attributeSelectors = [
      ...document.querySelectorAll('[data-js-bind="attribute-select"]'),
    ];

    const selectedAttributes = {};
    attributeSelectors.forEach(
      (selector) => (selectedAttributes[selector.name] = selector.value)
    );

    const matchingVariation = getMatchingVariation(selectedAttributes);
    updateSelectedVariation(matchingVariation);
  };

  return (
    <div>
      {filteredAttributes.map((attribute) => {
        const attributeName = (attribute.name || "").toLowerCase();
        const selectedAttribute = defaultSelectedVariation.attributes.nodes.find(
          (node) => node.name === attributeName
        );
        const defaultSelected = selectedAttribute?.value;

        return (
          <div
            className="o-layout o-layout--gutter-base o-layout--align-middle u-margin-bottom-small"
            key={attributeName}
          >
            <div className="o-layout__cell u-fraction--2of12">
              <label htmlFor={attribute.id}>{attributeName}</label>
            </div>
            <div className="o-layout__cell u-fraction--10of12">
              <Select
                data-js-bind="attribute-select"
                id={attribute.id}
                name={attributeName}
                onChange={handleSelectionChange}
                options={attribute.options.map((option) => ({
                  value: option,
                  label: option,
                }))}
                defaultSelected={defaultSelected}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

VariationSelect.propTypes = {};

export default VariationSelect;
