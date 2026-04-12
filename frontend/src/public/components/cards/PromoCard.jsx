import Button from '../../../shared/components/Button';

function PromoCard({ badge, buttonLabel, description, image, imageAlt, title }) {
  return (
    <article className="promo-card">
      <img className="promo-card__image" src={image} alt={imageAlt} />
      <div className="promo-card__overlay" />
      <div className="promo-card__content">
        <span className="promo-card__badge">{badge}</span>
        <h3 className="promo-card__title">{title}</h3>
        <p className="promo-card__description">{description}</p>
        <Button variant="light">{buttonLabel}</Button>
      </div>
    </article>
  );
}

export default PromoCard;
