import React from "react";

const Section = ({ title, extraClasses, extraContainerClasses, children }) => {
  return (
    <section className={`o-retain o-retain--wall ${extraContainerClasses}`}>
      <div className={`c-section ${extraClasses}`}>
        {title && <h2 className="c-section__title">{title}</h2>}
        {children}
      </div>
    </section>
  );
};

export default Section;
