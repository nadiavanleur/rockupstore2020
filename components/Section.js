import React from "react";

const Section = ({
  title,
  TitleTag = "h2",
  extraClasses,
  extraContainerClasses,
  rightToTitle,
  children,
}) => {
  return (
    <section
      className={`o-retain o-retain--wall o-retain--no-padding ${
        extraContainerClasses || ""
      }`}
    >
      <div className={`c-section ${extraClasses || ""}`}>
        {(title || rightToTitle) && (
          <div className="o-layout o-layout--gutter-base">
            <div className="o-layout__cell o-layout__cell--fit">
              {title && (
                <TitleTag className="c-section__title">{title}</TitleTag>
              )}
            </div>
            <div className="o-layout__cell o-layout__cell--fill"></div>
            <div className="o-layout__cell o-layout__cell--fit">
              {rightToTitle}
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
