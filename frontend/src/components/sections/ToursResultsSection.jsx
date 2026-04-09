import TourCard from '../cards/TourCard';
import { formatTourCount } from '../../utils/formatters';

function ToursResultsSection({ filteredTours, sortBy, setSortBy }) {
  return (
    <section className="tours-results">
      <div className="tours-results__header">
        <div>
          <h1 className="tours-results__title">Tìm thấy {formatTourCount(filteredTours.length)} Tour</h1>
          <p className="tours-results__description">
            Những hành trình được thiết kế riêng cho tâm hồn lữ khách.
          </p>
        </div>

        <label className="tours-results__sort">
          <span>Sắp xếp:</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="popular">Phổ biến nhất</option>
            <option value="price-asc">Giá: Thấp đến cao</option>
            <option value="price-desc">Giá: Cao đến thấp</option>
            <option value="rating">Đánh giá cao nhất</option>
          </select>
        </label>
      </div>

      <div className="tours-results__grid">
        {filteredTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>

      <div className="pagination">
        <button type="button">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button type="button" className="pagination__item pagination__item--active">
          1
        </button>
        <button type="button" className="pagination__item">
          2
        </button>
        <button type="button" className="pagination__item">
          3
        </button>
        <span className="pagination__dots">...</span>
        <button type="button" className="pagination__item">
          12
        </button>
        <button type="button">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </section>
  );
}

export default ToursResultsSection;
