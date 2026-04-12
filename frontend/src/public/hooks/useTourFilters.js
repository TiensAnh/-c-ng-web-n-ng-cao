import { useDeferredValue, useState } from 'react';

const MAX_PRICE_RANGE = 20000000;
const DEFAULT_SORT_BY = 'popular';

function useTourFilters(tours, initialSearch = '') {
  const [searchText, setSearchText] = useState(initialSearch);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [priceRange, setPriceRange] = useState(MAX_PRICE_RANGE);
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_BY);

  const deferredSearchText = useDeferredValue(searchText);

  const toggleDestination = (destination) => {
    setSelectedDestinations((current) =>
      current.includes(destination)
        ? current.filter((item) => item !== destination)
        : [...current, destination],
    );
  };

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
    clearDestinations,
    filteredTours,
    isShowingAll,
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
  };
}

export default useTourFilters;
