import React from "react";

const Button = ({ tag, type, label, href, extraClasses, ...attr }) => {
  const Tag = tag || "button";

  return (
    <Tag
      type={type || Tag !== "button" ? type : "button"}
      href={href}
      {...attr}
      className={`c-button ${extraClasses || ""}`}
    >
      {label}
    </Tag>
  );
};

export default Button;
