import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

function HeroSearchForm() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState('2 người lớn, 1 phòng');

  const handleSubmit = (event) => {
    event.preventDefault();
    const search = destination ? `?destination=${encodeURIComponent(destination)}` : '';
    navigate(`/tours${search}`);
  };

  return (
    <form className="hero-search" onSubmit={handleSubmit}>
      <div className="hero-search__field hero-search__field--grow">
        <span className="material-symbols-outlined">location_on</span>
        <div>
          <label htmlFor="hero-destination">Điểm đến</label>
          <input
            id="hero-destination"
            type="text"
            placeholder="Thành phố, sân bay..."
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>
      </div>

      <div className="hero-search__field">
        <span className="material-symbols-outlined">calendar_today</span>
        <div>
          <label>Thời gian</label>
          <strong>12 Th10 - 15 Th10</strong>
        </div>
      </div>

      <div className="hero-search__field">
        <span className="material-symbols-outlined">person</span>
        <div>
          <label htmlFor="hero-guests">Hành khách</label>
          <select
            id="hero-guests"
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
          >
            <option>1 người lớn, 1 phòng</option>
            <option>2 người lớn, 1 phòng</option>
            <option>2 người lớn, 2 phòng</option>
            <option>4 người lớn, 2 phòng</option>
          </select>
        </div>
      </div>

      <Button className="hero-search__button" type="submit">
        <span className="material-symbols-outlined">search</span>
        Tìm kiếm
      </Button>
    </form>
  );
}

export default HeroSearchForm;
