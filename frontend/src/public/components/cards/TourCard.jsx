import Button from '../../../shared/components/Button';
import { formatCurrencyVnd } from '../../../shared/utils/formatters';

function TourCard({ tour }) {
  const transportIcon = tour.transport.includes('máy bay')
    ? 'flight'
    : tour.transport.includes('Tàu')
      ? 'train'
      : tour.transport.includes('Dining')
        ? 'restaurant'
        : 'group';

  return (
    <article className="tour-card">
      <div className="tour-card__media">
        <img className="tour-card__image" src={tour.image} alt={tour.imageAlt} />
        <div className="tour-card__rating">
          <span className="material-symbols-outlined">star</span>
          {tour.rating} ({tour.reviews})
        </div>
        <button className="tour-card__bookmark" type="button" aria-label="Bookmark tour">
          <span className="material-symbols-outlined">bookmark</span>
        </button>
      </div>

      <div className="tour-card__content">
        <div className="tour-card__heading">
          <h3 className="tour-card__title">{tour.title}</h3>
          {tour.badge ? <span className="tour-card__badge">{tour.badge}</span> : null}
        </div>

        <p className="tour-card__description">{tour.description}</p>

        <div className="tour-card__meta">
          <span>
            <span className="material-symbols-outlined">schedule</span>
            {tour.duration}
          </span>
          <span>
            <span className="material-symbols-outlined">{transportIcon}</span>
            {tour.transport}
          </span>
        </div>

        <div className="tour-card__footer">
          <div>
            <span className="tour-card__price-label">Giá từ</span>
            <strong className="tour-card__price">{formatCurrencyVnd(tour.price)}đ</strong>
          </div>
          <Button>Đặt ngay</Button>
        </div>
      </div>
    </article>
  );
}

export default TourCard;
