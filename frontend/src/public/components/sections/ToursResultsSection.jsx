import TourCard from '../cards/TourCard';
import { formatTourCount } from '../../../shared/utils/formatters';

function ToursResultsSection({ filteredTours, loadError = '', isLoading = false, sortBy, setSortBy }) {
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

      {isLoading ? (
        <div className="surface-card rounded-[2rem] px-6 py-10 text-center text-sm text-slate-500">
          Đang tải danh sách tour...
        </div>
      ) : loadError ? (
        <div className="surface-card rounded-[2rem] px-6 py-10 text-center text-sm text-rose-500">
          {loadError}
        </div>
      ) : filteredTours.length ? (
        <div className="tours-results__grid">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="surface-card rounded-[2rem] px-6 py-10 text-center text-sm text-slate-500">
          Chưa có tour phù hợp với bộ lọc hiện tại.
        </div>
      )}

      {filteredTours.length ? (
        <div className="pagination">
          <button type="button" className="pagination__item pagination__item--active">
            1
          </button>
        </div>
      ) : null}
    </section>
  );
}

export default ToursResultsSection;
