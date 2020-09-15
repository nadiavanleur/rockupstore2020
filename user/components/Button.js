import React from "react";
import Link from "next/link";

const Button = ({ tag, type, label, href, extraClasses, ...attr }) => {
  const Tag = tag || "button";

  const tagToLink = (children) => {
    if (Tag === "a") return <Link href={href}>{children}</Link>;

    return children;
  };

  return tagToLink(
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
