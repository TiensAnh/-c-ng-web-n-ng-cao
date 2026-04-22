import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../shared/components/Button';
import TourExperienceLayout from '../../shared/components/TourExperienceLayout';
import usePageTitle from '../../shared/hooks/usePageTitle';
import { formatCurrencyVnd } from '../../shared/utils/formatters';
import {
  getPublicTourByIdRequest,
  mapApiTourToDetail,
} from '../services/toursApiService';

function getTransportIcon(transport = '') {
  const normalizedTransport = transport
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  if (normalizedTransport.includes('may bay')) {
    return 'flight_takeoff';
  }

  if (normalizedTransport.includes('du thuyen') || normalizedTransport.includes('tau')) {
    return 'directions_boat';
  }

  if (normalizedTransport.includes('tau hoa')) {
    return 'train';
  }

  if (normalizedTransport.includes('xe')) {
    return 'airport_shuttle';
  }

  return 'groups';
}

export default function TourDetailPage() {
  const navigate = useNavigate();
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadTour = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const response = await getPublicTourByIdRequest(tourId);

        if (!isMounted) {
          return;
        }

        if (!response.tour || response.tour.status !== 'Active') {
          setTour(null);
          setLoadError('Tour này hiện không khả dụng trên trang công khai.');
          return;
        }

        setTour(mapApiTourToDetail(response.tour));
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setTour(null);
        setLoadError(error.message || 'Không thể tải chi tiết tour lúc này.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTour();

    return () => {
      isMounted = false;
    };
  }, [tourId]);

  usePageTitle(
    isLoading
      ? 'ADN Travel | Đang tải tour'
      : tour
        ? `ADN Travel | ${tour.title}`
        : 'ADN Travel | Không tìm thấy tour',
  );

  if (isLoading) {
    return (
      <section className="tour-spotlight">
        <div className="tour-spotlight__empty">
          <p className="tour-spotlight__eyebrow">Chi tiết tour</p>
          <h1>Đang tải dữ liệu tour</h1>
          <p>ADN Travel đang lấy thông tin hành trình mới nhất từ hệ thống.</p>
        </div>
      </section>
    );
  }

  if (!tour) {
    return (
      <section className="tour-spotlight">
        <div className="tour-spotlight__empty">
          <p className="tour-spotlight__eyebrow">Chi tiết tour</p>
          <h1>Không tìm thấy tour này</h1>
          <p>
            {loadError || 'Có thể tour đã được ẩn, xoá hoặc đường dẫn chưa đúng. Bạn có thể quay lại danh sách tour để chọn một hành trình khác.'}
          </p>
          <div className="tour-spotlight__hero-actions" style={{ justifyContent: 'center' }}>
            <Button onClick={() => navigate('/tours')}>Quay lại danh sách tour</Button>
          </div>
        </div>
      </section>
    );
  }

  const meta = [
    tour.destination ? { icon: 'location_on', label: tour.destination } : null,
    tour.duration ? { icon: 'schedule', label: tour.duration } : null,
    tour.groupSize ? { icon: 'groups', label: tour.groupSize } : null,
    tour.transport ? { icon: getTransportIcon(tour.transport), label: tour.transport } : null,
  ].filter(Boolean);

  const stats = [
    { label: 'Giá từ', value: `${formatCurrencyVnd(tour.price)}đ`, helper: 'mỗi khách' },
    tour.rating ? { label: 'Đánh giá', value: `${tour.rating}`, helper: `${tour.reviews} đánh giá` } : null,
    tour.season ? { label: 'Mùa đẹp', value: tour.season, helper: 'thời điểm gợi ý' } : null,
    tour.departureNote ? { label: 'Khởi hành', value: tour.departureNote, helper: 'lịch gần nhất' } : null,
  ].filter(Boolean);

  const overviewCards = tour.includedItems.length
    ? [
        ...tour.overviewCards,
        {
          icon: 'inventory_2',
          title: 'Bao gồm trong gói',
          items: tour.includedItems,
        },
      ]
    : tour.overviewCards;

  const aside = (
    <div className="tour-spotlight__panel tour-spotlight__panel--accent">
      <p className="tour-spotlight__panel-eyebrow">Sẵn sàng đặt chỗ</p>
      <h2 className="tour-spotlight__panel-title">Giữ chỗ của bạn trong hành trình này</h2>
      <p className="tour-spotlight__panel-copy">
        ADN Travel sẽ gọi lại để chốt lịch khởi hành, nhu cầu phòng và các ưu tiên riêng của bạn ngay sau khi nhận yêu cầu.
      </p>

      <div className="tour-spotlight__panel-price">
        <div>
          <span>Giá tham khảo</span>
          <strong>{formatCurrencyVnd(tour.price)}đ</strong>
        </div>
        {tour.badge ? <em>{tour.badge}</em> : null}
      </div>

      <dl className="tour-spotlight__panel-meta">
        {tour.departureSchedule ? (
          <div>
            <dt>Khởi hành</dt>
            <dd>{tour.departureSchedule}</dd>
          </div>
        ) : null}
        {tour.meetingPoint ? (
          <div>
            <dt>Điểm đón</dt>
            <dd>{tour.meetingPoint}</dd>
          </div>
        ) : null}
        {tour.groupSize ? (
          <div>
            <dt>Nhóm tối đa</dt>
            <dd>{tour.groupSize}</dd>
          </div>
        ) : null}
      </dl>

      {tour.promiseItems.length ? <div className="tour-spotlight__panel-divider" /> : null}

      {tour.promiseItems.length ? (
        <>
          <p className="tour-spotlight__panel-eyebrow">Cam kết trải nghiệm</p>
          <ul className="tour-spotlight__panel-list">
            {tour.promiseItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}

      <div className="tour-spotlight__panel-actions">
        <Button onClick={() => navigate('/contact')}>Đặt lịch tư vấn</Button>
        <Button variant="secondary" onClick={() => navigate('/tours')}>
          Quay lại danh sách
        </Button>
      </div>
    </div>
  );

  return (
    <TourExperienceLayout
      actions={(
        <>
          <Button variant="secondary" onClick={() => navigate('/tours')}>
            Tất cả tour
          </Button>
          <Button onClick={() => navigate('/contact')}>Hỏi lịch trình này</Button>
        </>
      )}
      aside={aside}
      badge={tour.badge || null}
      description={tour.longDescription}
      eyebrow={tour.eyebrow}
      heroAlt={tour.imageAlt}
      heroImage={tour.image}
      highlights={tour.highlights}
      highlightsTitle="Lý do hành trình này được chọn nhiều"
      itinerary={tour.itinerary}
      itineraryTitle="Nhịp trải nghiệm theo từng ngày"
      meta={meta}
      overviewCards={overviewCards}
      overviewDescription="Toàn bộ nội dung trang này đang được lấy theo dữ liệu tour trong hệ thống quản trị."
      overviewTitle="Chân dung của chuyến đi"
      quote={tour.curatorNote}
      quoteAuthor={tour.curatorName}
      stats={stats}
      title={tour.title}
    />
  );
}
