import React from "react";
import Link from "next/link";

const Button = ({
  tag,
  type,
  label,
  href,
  extraClasses,
  children,
  ...attr
}) => {
  const Tag = tag || "button";

  const tagToLink = (children) => {
    if (Tag === "a") return <Link href={href}>{children}</Link>;

    return children;
  };

  return tagToLink(
    <Tag
      type={type || Tag !== "button" ? type : "button"}
      href={href}
      className={`c-button ${extraClasses || ""}`}
      {...attr}
    >
      {label} {children}
    </Tag>
  );
};

export default Button;
