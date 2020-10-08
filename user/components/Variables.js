import React from "react";

const Variables = ({ attributes }) => {
  if (!attributes || !attributes.length) return null;

  return (
    <ul className="o-list-clean">
      {attributes.map(({ name, options, variation }) => {
        if (!variation || !options || !options.length || options.length < 2)
          return;
        return (
          <li className="u-margin-none">
            <div className="o-layout o-layout--gutter-tiny">
              <div className="o-layout__cell o-layout__cell--fit">{name}</div>
              <div className="o-layout__cell o-layout__cell--fill">
                <ul className="o-layout o-layout--gutter-tiny">
                  {options.map((option) => (
                    <li className="o-layout__cell o-layout__cell--fit">
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Variables;
