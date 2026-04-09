import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import BookingForm from '../components/forms/BookingForm';
import { AiFillStar } from 'react-icons/ai';
import '../styles/tour-detail.css';

const API_BASE = 'http://localhost:5000/api';

function TourDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchTourDetail();
  }, [id]);

  const fetchTourDetail = async () => {
    try {
      // Giả sử API tour chi tiết tồn tại
      const response = await fetch(`${API_BASE}/tours/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTour(data);
      }
    } catch (error) {
      console.error('Error fetching tour:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async (bookingData) => {
    try {
      setBookingLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Vui lòng đăng nhập để đặt tour');
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Đặt tour thành công! Mã đơn: ${result.booking_id}`);
        navigate('/bookings/history');
      } else {
        const error = await response.json();
        alert(`Lỗi: ${error.message}`);
      }
    } catch (error) {
      alert('Lỗi khi đặt tour');
      console.error(error);
    } finally {
      setBookingLoading(false);
    }
  };

  if (isLoading) return <MainLayout><div className="loading">Đang tải...</div></MainLayout>;
  if (!tour) return <MainLayout><div className="loading">Tour không tồn tại</div></MainLayout>;

  return (
    <MainLayout>
      <div className="tour-detail-page">
        {/* Banner Image */}
        <div className="tour-detail__banner">
          <img src={tour.image} alt={tour.name} />
          <div className="tour-detail__banner-overlay">
            <h1>{tour.name}</h1>
          </div>
        </div>

        <div className="tour-detail__container">
          {/* Main Content */}
          <div className="tour-detail__main">
            {/* Info Section */}
            <section className="tour-detail__section">
              <div className="section-header">
                <h2>Thông tin tour</h2>
              </div>

              <div className="tour-detail__info-grid">
                <div className="info-item">
                  <span className="info-label">📍 Địa điểm</span>
                  <p className="info-value">{tour.location}</p>
                </div>
                <div className="info-item">
                  <span className="info-label">⏱️ Thời lượng</span>
                  <p className="info-value">{tour.duration} ngày</p>
                </div>
                <div className="info-item">
                  <span className="info-label">📅 Ngày khởi hành</span>
                  <p className="info-value">{new Date(tour.start_date).toLocaleDateString('vi-VN')}</p>
                </div>
                <div className="info-item">
                  <span className="info-label">👥 Số chỗ</span>
                  <p className="info-value">{tour.max_people} người</p>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="tour-detail__section">
              <div className="section-header">
                <h2>Chi tiết chuyến đi</h2>
              </div>
              <div className="tour-detail__description">
                <p>{tour.description}</p>
              </div>
            </section>

            {/* Rating */}
            <section className="tour-detail__section">
              <div className="section-header">
                <h2>Đánh giá từ khách hàng</h2>
              </div>
              <div className="tour-detail__rating">
                <div className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <AiFillStar key={i} className="star" />
                  ))}
                </div>
                <p className="rating-text">4.5/5 (128 đánh giá)</p>
              </div>
            </section>

            {/* Highlights */}
            <section className="tour-detail__section">
              <div className="section-header">
                <h2>Điểm nổi bật</h2>
              </div>
              <ul className="tour-detail__highlights">
                <li>✓ Hướng dẫn viên chuyên nghiệp và thân thiện</li>
                <li>✓ Ăn sáng và tối miễn phí</li>
                <li>✓ Khách sạn 4 sao</li>
                <li>✓ Bảo hiểm du lịch</li>
                <li>✓ Xe tư nhân đưa đón</li>
              </ul>
            </section>
          </div>

          {/* Sidebar - Booking Form */}
          <aside className="tour-detail__sidebar">
            <div className="price-card">
              <p className="price-card__label">Giá từ</p>
              <p className="price-card__price">{tour.price.toLocaleString('vi-VN')} đ</p>
              <p className="price-card__person">/người</p>
            </div>

            <BookingForm
              tour={tour}
              onSubmit={handleBooking}
              isLoading={bookingLoading}
            />

            <div className="booking-contact">
              <h4>Cần hỗ trợ?</h4>
              <p>Liên hệ với chúng tôi:</p>
              <p>☎️ 1900 0000</p>
              <p>📧 booking@adntravel.com</p>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}

export default TourDetailPage;
