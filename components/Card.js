import React from "react";
import Link from "next/link";

const Card = ({
  image,
  hoverImage,
  title,
  tags,
  cta,
  extraClasses,
  children,
}) => {
  return (
    <div
      className={`c-card ${extraClasses || ""}${cta?.href && " c-card--link"}`}
    >
      {/* Image */}
      {(image || hoverImage) && (
        <div className="c-card__image-container">
          {image?.sourceUrl && (
            <img
              src={image.sourceUrl}
              srcSet={image.srcSet}
              alt={image.altText || image.title || ""}
              className="c-card__image"
            />
          )}
          {hoverImage?.sourceUrl && (
            <img
              src={hoverImage.sourceUrl}
              srcSet={hoverImage.srcSet}
              alt={hoverImage.altText || hoverImage.title || ""}
              className="c-card__hover-image"
            />
          )}
        </div>
      )}
      {/* Content */}
      <div className="c-card__content">
        {/* Title */}
        {title && <h3 className="c-card__title">{title}</h3>}
        {/* Body */}
        <div className="c-card__body">{children}</div>
        {/* CTA */}
        {cta?.href && (
          <Link href={cta.href} as={cta.as}>
            <a className="c-card__cta u-umbrella" onClick={cta.onClick}>
              {cta.label}
            </a>
          </Link>
        )}
      </div>
      {/* Tags */}
      {!!tags?.length && (
        <div className="c-card__tags">
          <ul className="o-layout o-layout--gutter-tiny o-layout--equalheight o-layout--align-right">
            {tags.map((tag) => {
              if (!tag.label) return null;

              return (
                <li
                  className="o-layout__cell o-layout__cell--fit"
                  key={`${tag.label}`}
                >
                  <div className={`c-tag ${tag.extraClasses}`}>{tag.label}</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Card;
