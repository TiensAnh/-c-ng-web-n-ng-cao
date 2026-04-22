import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ToursSidebar from '../components/sections/ToursSidebar';
import ToursResultsSection from '../components/sections/ToursResultsSection';
import usePageTitle from '../../shared/hooks/usePageTitle';
import useTourFilters from '../hooks/useTourFilters';
import {
  getPublicToursRequest,
  mapApiTourToCard,
  toursSidebarContent,
} from '../services/toursApiService';

const DURATION_ORDER = ['1-3 ngày', '4-7 ngày', 'Trên 1 tuần'];

function sortDurationOptions(options) {
  return [...options].sort((left, right) => (
    DURATION_ORDER.indexOf(left) - DURATION_ORDER.indexOf(right)
  ));
}

function ToursPage() {
  usePageTitle('ADN Travel | Tours');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialDestination = searchParams.get('destination') || '';
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadTours = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const response = await getPublicToursRequest();

        if (!isMounted) {
          return;
        }

        const nextTours = (response.tours || [])
          .filter((tour) => tour.status === 'Active')
          .map(mapApiTourToCard);

        setTours(nextTours);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setTours([]);
        setLoadError(error.message || 'Không thể tải danh sách tour lúc này.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTours();

    return () => {
      isMounted = false;
    };
  }, []);

  const {
    clearDestinations,
    filteredTours,
    isShowingAll,
    maxPriceRange,
    priceRange,
    resetFilters,
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
  } = useTourFilters(tours, initialDestination);

  const destinations = [...new Set(tours.map((tour) => tour.destination))];
  const durationOptions = sortDurationOptions(
    [...new Set(tours.map((tour) => tour.durationGroup).filter(Boolean))],
  );

  return (
    <section className="tours-page section-block">
      <div className="content-container tours-page__layout">
        <ToursSidebar
          clearDestinations={clearDestinations}
          destinations={destinations}
          durationOptions={durationOptions}
          isShowingAll={isShowingAll}
          maxPriceRange={maxPriceRange}
          priceRange={priceRange}
          resetFilters={resetFilters}
          ratingOptions={toursSidebarContent.ratingOptions}
          searchText={searchText}
          selectedDestinations={selectedDestinations}
          selectedDuration={selectedDuration}
          selectedRating={selectedRating}
          setPriceRange={setPriceRange}
          setSearchText={setSearchText}
          setSelectedDuration={setSelectedDuration}
          setSelectedRating={setSelectedRating}
          sidebarPromo={toursSidebarContent.sidebarPromo}
          toggleDestination={toggleDestination}
        />

        <ToursResultsSection
          filteredTours={filteredTours}
          isLoading={isLoading}
          loadError={loadError}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
    </section>
  );
}

export default ToursPage;
