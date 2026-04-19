import { useNavigate } from 'react-router-dom';
import Button from '../../../shared/components/Button';
import { formatCurrencyVnd } from '../../../shared/utils/formatters';

function getTransportIcon(transport = '') {
  const normalizedTransport = transport
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  if (normalizedTransport.includes('may bay')) {
    return 'flight';
  }

  if (normalizedTransport.includes('tau')) {
    return 'train';
  }

  if (normalizedTransport.includes('dining')) {
    return 'restaurant';
  }

  return 'group';
}

function TourCard({ tour }) {
  const navigate = useNavigate();
  const transportIcon = getTransportIcon(tour.transport);

  const handleOpenTour = () => {
    navigate(`/tours/${tour.id}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpenTour();
    }
  };

  return (
    <article
      className="tour-card tour-card--interactive"
      role="button"
      tabIndex={0}
      onClick={handleOpenTour}
      onKeyDown={handleKeyDown}
    >
      <div className="tour-card__media">
        <img className="tour-card__image" src={tour.image} alt={tour.imageAlt} />
        <div className="tour-card__rating">
          <span className="material-symbols-outlined">star</span>
          {tour.rating} ({tour.reviews})
        </div>
        <button
          className="tour-card__bookmark"
          type="button"
          aria-label="Bookmark tour"
          onClick={(event) => event.stopPropagation()}
        >
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
            <span className="tour-card__price-label">Gia tu</span>
            <strong className="tour-card__price">{formatCurrencyVnd(tour.price)}d</strong>
          </div>
          <Button
            onClick={(event) => {
              event.stopPropagation();
              handleOpenTour();
            }}
          >
            Xem chi tiet
          </Button>
        </div>
      </div>
    </article>
  );
}

export default TourCard;
