function ToursSidebar({
  clearDestinations,
  destinations,
  durationOptions,
  isShowingAll,
  maxPriceRange,
  priceRange,
  resetFilters,
  ratingOptions,
  searchText,
  selectedDestinations,
  selectedDuration,
  selectedRating,
  setPriceRange,
  setSearchText,
  setSelectedDuration,
  setSelectedRating,
  sidebarPromo,
  toggleDestination,
}) {
  return (
    <aside className="tours-sidebar">
      <div className="tours-sidebar__panel">
        <div className="tours-sidebar__title-row">
          <h2 className="tours-sidebar__title">
            <span className="material-symbols-outlined">filter_list</span>
            Bộ lọc tìm kiếm
          </h2>
        </div>

        <div className="tours-sidebar__group">
          <label className="tours-sidebar__label" htmlFor="tour-search">
            Tìm kiếm nhanh
          </label>
          <input
            id="tour-search"
            className="tours-sidebar__search"
            type="text"
            placeholder="Tên tour, điểm đến..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>

        <div className="tours-sidebar__group">
          <span className="tours-sidebar__label">Điểm đến</span>
          <div className="tours-sidebar__stack">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={!selectedDestinations.length}
                onChange={clearDestinations}
              />
              <span>Tất cả</span>
            </label>
            {destinations.map((destination) => (
              <label key={destination} className="checkbox-row">
                <input
                  type="checkbox"
                  checked={selectedDestinations.includes(destination)}
                  onChange={() => toggleDestination(destination)}
                />
                <span>{destination}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="tours-sidebar__group">
          <span className="tours-sidebar__label">Mức giá (VNĐ)</span>
          <input
            type="range"
            min="0"
            max={maxPriceRange}
            step="500000"
            value={priceRange}
            onChange={(event) => setPriceRange(Number(event.target.value))}
          />
          <div className="tours-sidebar__range">
            <span>0đ</span>
            <span>{priceRange.toLocaleString('vi-VN')}đ</span>
          </div>
        </div>

        <div className="tours-sidebar__group">
          <span className="tours-sidebar__label">Thời gian</span>
          <div className="chip-grid">
            <button
              type="button"
              className={`filter-chip${selectedDuration === 'all' ? ' filter-chip--active' : ''}`}
              onClick={() => setSelectedDuration('all')}
            >
              Tất cả
            </button>
            {durationOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`filter-chip${selectedDuration === option ? ' filter-chip--active' : ''}`}
                onClick={() => setSelectedDuration(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="tours-sidebar__group">
          <span className="tours-sidebar__label">Đánh giá</span>
          <div className="tours-sidebar__stack">
            {ratingOptions.map((option) => (
              <label key={option.value} className="radio-row">
                <input
                  type="radio"
                  name="rating"
                  checked={selectedRating === option.value}
                  onChange={() => setSelectedRating(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
            <label className="radio-row">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === 'all'}
                onChange={() => setSelectedRating('all')}
              />
              <span>Tất cả</span>
            </label>
          </div>
        </div>

        {!isShowingAll ? (
          <button type="button" className="filter-chip filter-chip--active" onClick={resetFilters}>
            Đặt lại bộ lọc
          </button>
        ) : null}
      </div>

      {sidebarPromo ? (
        <article className="tours-sidebar__promo">
          <img src={sidebarPromo.image} alt={sidebarPromo.title} />
          <div className="tours-sidebar__promo-overlay">
            <span className="promo-chip">Ưu đãi độc quyền</span>
            <h3>{sidebarPromo.title}</h3>
            <p>{sidebarPromo.description}</p>
          </div>
        </article>
      ) : null}
    </aside>
  );
}

export default ToursSidebar;
