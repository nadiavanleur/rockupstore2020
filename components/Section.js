import React from "react";

const Section = ({
  title,
  TitleTag = "h2",
  extraClasses,
  rightToTitle,
  breadcrumb,
  children,
  id,
}) => {
  return (
    <section className={`c-section ${extraClasses || ""}`} id={id}>
      {(title || rightToTitle) && (
        <div className="o-layout o-layout--gutter-base c-section__header">
          <div className="o-layout__cell o-layout__cell--fit c-section__title-container">
            <div className="o-layout o-layout--align-bottom o-layout--gutter-small">
              {title && (
                <div
                  className={`o-layout__cell o-layout__cell--fit${
                    breadcrumb && " u-margin-bottom-tiny@until-md"
                  }`}
                >
                  <TitleTag className="c-section__title">{title}</TitleTag>
                </div>
              )}
              {breadcrumb && (
                <div className="o-layout__cell o-layout__cell--fit">
                  <h1 className="c-section__breadcrumb">{breadcrumb}</h1>
                </div>
              )}
            </div>
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
