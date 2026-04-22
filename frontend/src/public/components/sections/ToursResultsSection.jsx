import TourCard from '../cards/TourCard';
import { formatTourCount } from '../../../shared/utils/formatters';

function ToursResultsSection({
  currentPage = 1,
  filteredTours,
  loadError = '',
  isLoading = false,
  onPageChange,
  sortBy,
  setSortBy,
  totalPages = 1,
  totalTours = 0,
}) {
  return (
    <section className="tours-results">
      <div className="tours-results__header">
        <div>
          <h1 className="tours-results__title">Tim thay {formatTourCount(totalTours)} Tour</h1>
          <p className="tours-results__description">
            Nhung hanh trinh duoc thiet ke rieng cho tam hon lu khach.
          </p>
        </div>

        <label className="tours-results__sort">
          <span>Sap xep:</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="popular">Pho bien nhat</option>
            <option value="price-asc">Gia: Thap den cao</option>
            <option value="price-desc">Gia: Cao den thap</option>
            <option value="rating">Danh gia cao nhat</option>
          </select>
        </label>
      </div>

      {isLoading ? (
        <div className="surface-card rounded-[2rem] px-6 py-10 text-center text-sm text-slate-500">
          Dang tai danh sach tour...
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
          Chua co tour phu hop voi bo loc hien tai.
        </div>
      )}

      {totalTours > 0 && totalPages > 1 ? (
        <div className="pagination">
          <button
            type="button"
            className="pagination__item"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={`pagination__item ${page === currentPage ? 'pagination__item--active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className="pagination__item"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      ) : null}
    </section>
  );
}

export default ToursResultsSection;
