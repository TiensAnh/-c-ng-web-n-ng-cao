import { useDeferredValue, useState } from 'react';

<<<<<<< HEAD
function useTourFilters(tours, initialSearch = '') {
  const [searchText, setSearchText] = useState(initialSearch);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [priceRange, setPriceRange] = useState(20000000);
  const [selectedDuration, setSelectedDuration] = useState('4-7 ngày');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [hasCustomDestinationFilter, setHasCustomDestinationFilter] = useState(false);
  const [hasCustomDurationFilter, setHasCustomDurationFilter] = useState(false);
=======
const MAX_PRICE_RANGE = 20000000;
const DEFAULT_SORT_BY = 'popular';

function useTourFilters(tours, initialSearch = '') {
  const [searchText, setSearchText] = useState(initialSearch);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [priceRange, setPriceRange] = useState(MAX_PRICE_RANGE);
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_BY);
>>>>>>> 8cf1a3989029571942876b8f0683261f93b85e40

  const deferredSearchText = useDeferredValue(searchText);

  const toggleDestination = (destination) => {
<<<<<<< HEAD
    setHasCustomDestinationFilter(true);
=======
>>>>>>> 8cf1a3989029571942876b8f0683261f93b85e40
    setSelectedDestinations((current) =>
      current.includes(destination)
        ? current.filter((item) => item !== destination)
        : [...current, destination],
    );
  };

<<<<<<< HEAD
  const filteredTours = tours
    .filter((tour) => {
      if (!hasCustomDestinationFilter || !selectedDestinations.length) {
        return true;
      }

      return selectedDestinations.includes(tour.destination);
    })
    .filter((tour) => tour.price <= priceRange)
    .filter((tour) => {
      if (!hasCustomDurationFilter || selectedDuration === 'all') {
=======
  const clearDestinations = () => setSelectedDestinations([]);

  const resetFilters = () => {
    setSearchText('');
    setSelectedDestinations([]);
    setPriceRange(MAX_PRICE_RANGE);
    setSelectedDuration('all');
    setSelectedRating('all');
    setSortBy(DEFAULT_SORT_BY);
  };

  const isShowingAll =
    !deferredSearchText.trim()
    && !selectedDestinations.length
    && priceRange === MAX_PRICE_RANGE
    && selectedDuration === 'all'
    && selectedRating === 'all'
    && sortBy === DEFAULT_SORT_BY;

  const filteredTours = tours
    .filter((tour) => !selectedDestinations.length || selectedDestinations.includes(tour.destination))
    .filter((tour) => tour.price <= priceRange)
    .filter((tour) => {
      if (selectedDuration === 'all') {
>>>>>>> 8cf1a3989029571942876b8f0683261f93b85e40
        return true;
      }

      return tour.durationGroup === selectedDuration;
    })
    .filter((tour) => {
      if (selectedRating === 'all') {
        return true;
      }

      if (selectedRating === '5') {
        return tour.rating >= 5;
      }

      return tour.rating >= 4;
    })
    .filter((tour) => {
      if (!deferredSearchText.trim()) {
        return true;
      }

      const searchableText = [
        tour.title,
        tour.description,
        tour.destination,
        tour.transport,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(deferredSearchText.trim().toLowerCase());
    })
    .sort((left, right) => {
      if (sortBy === 'price-asc') {
        return left.price - right.price;
      }

      if (sortBy === 'price-desc') {
        return right.price - left.price;
      }

      if (sortBy === 'rating') {
        return right.rating - left.rating;
      }

      return right.popularity - left.popularity;
    });

  return {
<<<<<<< HEAD
    filteredTours,
    priceRange,
=======
    clearDestinations,
    filteredTours,
    isShowingAll,
    priceRange,
    resetFilters,
>>>>>>> 8cf1a3989029571942876b8f0683261f93b85e40
    searchText,
    selectedDestinations,
    selectedDuration,
    selectedRating,
    sortBy,
    setPriceRange,
    setSearchText,
<<<<<<< HEAD
    setSelectedDuration: (value) => {
      setHasCustomDurationFilter(true);
      setSelectedDuration(value);
    },
=======
    setSelectedDuration,
>>>>>>> 8cf1a3989029571942876b8f0683261f93b85e40
    setSelectedRating,
    setSortBy,
    toggleDestination,
  };
}

export default useTourFilters;
