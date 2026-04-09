import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/common/Button';
import '../styles/booking-history.css';

const API_BASE = 'http://localhost:5000/api';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/bookings/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Bạn chắc chắn muốn hủy đơn này?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/bookings/${bookingId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cancel_reason: 'User cancelled' }),
      });

      if (response.ok) {
        alert('Hủy tour thành công!');
        fetchBookings();
      } else {
        const error = await response.json();
        alert(`Lỗi: ${error.message}`);
      }
    } catch (error) {
      alert('Lỗi khi hủy tour');
      console.error(error);
    }
  };

  const filteredBookings =
    filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: 'Chờ xác nhận', class: 'status-pending' },
      confirmed: { label: 'Đã xác nhận', class: 'status-confirmed' },
      cancelled: { label: 'Đã hủy', class: 'status-cancelled' },
      completed: { label: 'Hoàn thành', class: 'status-completed' },
    };
    return statusMap[status] || { label: status, class: '' };
  };

  if (isLoading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <MainLayout>
      <div className="booking-history">
        <div className="booking-history__header">
          <h1>Lịch sử đặt tour</h1>
          <p>Quản lý các đơn đặt tour của bạn</p>
        </div>

        {/* Filter */}
        <div className="booking-history__filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tất cả ({bookings.length})
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Chờ xác nhận
          </button>
          <button
            className={`filter-btn ${filter === 'confirmed' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('confirmed')}
          >
            Đã xác nhận
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Hoàn thành
          </button>
          <button
            className={`filter-btn ${filter === 'cancelled' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('cancelled')}
          >
            Đã hủy
          </button>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="booking-history__empty">
            <p>Không có đơn đặt tour nào</p>
          </div>
        ) : (
          <div className="bookings-list">
            {filteredBookings.map((booking) => {
              const statusInfo = getStatusBadge(booking.status);
              return (
                <div key={booking.id} className="booking-card">
                  <div className="booking-card__header">
                    <div>
                      <h3 className="booking-card__title">{booking.tour_name}</h3>
                      <p className="booking-card__meta">
                        Mã đơn: <strong>#{booking.id}</strong>
                      </p>
                    </div>
                    <span className={`booking-card__status ${statusInfo.class}`}>
                      {statusInfo.label}
                    </span>
                  </div>

                  <div className="booking-card__content">
                    <img src={booking.image} alt={booking.tour_name} className="booking-card__image" />

                    <div className="booking-card__details">
                      <div className="detail-row">
                        <span>Địa điểm:</span>
                        <strong>{booking.location}</strong>
                      </div>
                      <div className="detail-row">
                        <span>Thời lượng:</span>
                        <strong>{booking.duration} ngày</strong>
                      </div>
                      <div className="detail-row">
                        <span>Ngày khởi hành:</span>
                        <strong>{new Date(booking.start_date).toLocaleDateString('vi-VN')}</strong>
                      </div>
                      <div className="detail-row">
                        <span>Số lượng khách:</span>
                        <strong>{booking.num_people} người</strong>
                      </div>
                      <div className="detail-row">
                        <span>Liên hệ:</span>
                        <strong>
                          {booking.contact_name} - {booking.contact_phone}
                        </strong>
                      </div>
                    </div>

                    <div className="booking-card__price">
                      <p className="booking-card__price-label">Tổng tiền</p>
                      <p className="booking-card__price-value">
                        {booking.total_price.toLocaleString('vi-VN')} đ
                      </p>
                    </div>
                  </div>

                  <div className="booking-card__actions">
                    <Button
                      onClick={() => setSelectedBooking(booking)}
                      className="btn-secondary"
                    >
                      Chi tiết
                    </Button>
                    {booking.status === 'pending' && (
                      <Button
                        onClick={() => handleCancel(booking.id)}
                        className="btn-danger"
                      >
                        Hủy đơn
                      </Button>
                    )}
                  </div>

                  <div className="booking-card__note">
                    <p className="booking-card__note-label">Ghi chú:</p>
                    <p>{booking.note || 'Không có ghi chú'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default BookingHistory;
