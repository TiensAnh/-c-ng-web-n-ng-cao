import { useLocation } from 'react-router-dom';
import ToursSidebar from '../components/sections/ToursSidebar';
import ToursResultsSection from '../components/sections/ToursResultsSection';
import usePageTitle from '../hooks/usePageTitle';
import useTourFilters from '../hooks/useTourFilters';
import { toursContent } from '../services/siteContentService';

function ToursPage() {
  usePageTitle('ADN Travel | Tours');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialDestination = searchParams.get('destination') || '';

  const {
    filteredTours,
    priceRange,
    searchText,
    selectedDestinations,
    selectedDuration,
    selectedRating,
    sortBy,
    setPriceRange,
    setSearchText,
    setSelectedDuration,
    setSelectedRating,
    setSortBy,
    toggleDestination,
  } = useTourFilters(toursContent.tours, initialDestination);

  return (
    <section className="tours-page section-block">
      <div className="content-container tours-page__layout">
        <ToursSidebar
          priceRange={priceRange}
          searchText={searchText}
          selectedDestinations={selectedDestinations}
          selectedDuration={selectedDuration}
          selectedRating={selectedRating}
          setPriceRange={setPriceRange}
          setSearchText={setSearchText}
          setSelectedDuration={setSelectedDuration}
          setSelectedRating={setSelectedRating}
          toggleDestination={toggleDestination}
        />

        <ToursResultsSection
          filteredTours={filteredTours}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
    </section>
  );
}

export default ToursPage;
