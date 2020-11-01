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
    <div className={`c-card ${extraClasses}`}>
      {image && hoverImage && (
        <div className="c-card__image-container">
          {image?.sourceUrl && (
            <img
              src={image.sourceUrl}
              alt={image.altText || image.title || ""}
              className="c-card__image"
            />
          )}
          {hoverImage?.sourceUrl && (
            <img
              src={hoverImage.sourceUrl}
              alt={hoverImage.altText || hoverImage.title || ""}
              className="c-card__hover-image"
            />
          )}
        </div>
      )}
      <div className="c-card__content">
        {title && <h3 className="c-card__title">{title}</h3>}
        <div className="c-card__body">{children}</div>
        {cta && cta?.url && cta?.label && (
          <Link href={cta.url}>
            <a className="c-card__cta u-umbrella">{cta.label}</a>
          </Link>
        )}
      </div>
      {!!tags?.length && (
        <ul className="o-list-clean c-card__tags">
          {tags.map((tag) => (
            <li
              className={tag.extraClasses}
              key={`${tag.label}`}
              className="c-tag"
            >
              {tag.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Card;
