import React from "react";

const Section = ({
  title,
  TitleTag = "h2",
  extraClasses,
  rightToTitle,
  children,
}) => {
  return (
    <section className={`c-section ${extraClasses || ""}`}>
      {(title || rightToTitle) && (
        <div className="o-layout o-layout--gutter-base">
          <div className="o-layout__cell o-layout__cell--fit">
            {title && <TitleTag className="c-section__title">{title}</TitleTag>}
          </div>
          {rightToTitle && (
            <>
              <div className="o-layout__cell o-layout__cell--fill"></div>
              <div className="o-layout__cell o-layout__cell--fit">
                {rightToTitle}
              </div>
            </>
          )}
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;
