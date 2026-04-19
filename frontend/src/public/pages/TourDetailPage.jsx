import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../shared/components/Button';
import TourExperienceLayout from '../../shared/components/TourExperienceLayout';
import usePageTitle from '../../shared/hooks/usePageTitle';
import { formatCurrencyVnd } from '../../shared/utils/formatters';
import { getTourById } from '../services/siteContentService';

function getTransportIcon(transport = '') {
  const normalizedTransport = transport
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  if (normalizedTransport.includes('may bay')) {
    return 'flight_takeoff';
  }

  if (normalizedTransport.includes('tau')) {
    return 'train';
  }

  if (normalizedTransport.includes('dining')) {
    return 'restaurant';
  }

  return 'groups';
}

export default function TourDetailPage() {
  const navigate = useNavigate();
  const { tourId } = useParams();
  const tour = getTourById(tourId);

  usePageTitle(tour ? `ADN Travel | ${tour.title}` : 'ADN Travel | Tour not found');

  if (!tour) {
    return (
      <section className="tour-spotlight">
        <div className="tour-spotlight__empty">
          <p className="tour-spotlight__eyebrow">Tour detail</p>
          <h1>Khong tim thay tour nay</h1>
          <p>
            Co the tour da duoc an, xoa hoac duong dan chua dung. Ban co the quay lai danh sach tour
            de chon mot hanh trinh khac.
          </p>
          <div className="tour-spotlight__hero-actions" style={{ justifyContent: 'center' }}>
            <Button onClick={() => navigate('/tours')}>Quay lai danh sach tour</Button>
          </div>
        </div>
      </section>
    );
  }

  const meta = [
    { icon: 'location_on', label: tour.destination },
    { icon: 'schedule', label: tour.duration },
    { icon: 'groups', label: tour.groupSize },
    { icon: getTransportIcon(tour.transport), label: tour.transport },
  ];

  const stats = [
    { label: 'Gia tu', value: `${formatCurrencyVnd(tour.price)}d`, helper: 'moi khach' },
    { label: 'Danh gia', value: `${tour.rating}`, helper: `${tour.reviews} reviews` },
    { label: 'Mua dep', value: tour.season, helper: 'thoi diem goi y' },
    { label: 'Khoi hanh', value: tour.departureNote, helper: 'lich gan nhat' },
  ];

  const overviewCards = [
    ...tour.overviewCards,
    {
      icon: 'inventory_2',
      title: 'Bao gom trong goi',
      items: tour.includedItems,
    },
  ];

  const aside = (
    <div className="tour-spotlight__panel tour-spotlight__panel--accent">
      <p className="tour-spotlight__panel-eyebrow">Ready to reserve</p>
      <h2 className="tour-spotlight__panel-title">Giu cho cua ban trong hanh trinh nay</h2>
      <p className="tour-spotlight__panel-copy">
        ADN Travel se goi lai de chot lich khoi hanh, nhu cau phong va cac uu tien rieng trong
        vong 30 phut lam viec.
      </p>

      <div className="tour-spotlight__panel-price">
        <div>
          <span>Gia tham khao</span>
          <strong>{formatCurrencyVnd(tour.price)}d</strong>
        </div>
        <em>{tour.badge || 'Curated trip'}</em>
      </div>

      <dl className="tour-spotlight__panel-meta">
        <div>
          <dt>Khoi hanh</dt>
          <dd>{tour.departureSchedule}</dd>
        </div>
        <div>
          <dt>Diem don</dt>
          <dd>{tour.meetingPoint}</dd>
        </div>
        <div>
          <dt>Nhom toi da</dt>
          <dd>{tour.groupSize}</dd>
        </div>
      </dl>

      <div className="tour-spotlight__panel-divider" />

      <p className="tour-spotlight__panel-eyebrow">Cam ket trai nghiem</p>
      <ul className="tour-spotlight__panel-list">
        {tour.promiseItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="tour-spotlight__panel-actions">
        <Button onClick={() => navigate('/contact')}>Dat lich tu van</Button>
        <Button variant="secondary" onClick={() => navigate('/tours')}>
          Quay lai danh sach
        </Button>
      </div>
    </div>
  );

  return (
    <TourExperienceLayout
      actions={
        <>
          <Button variant="secondary" onClick={() => navigate('/tours')}>
            Tat ca tours
          </Button>
          <Button onClick={() => navigate('/contact')}>Hoi lich trinh nay</Button>
        </>
      }
      aside={aside}
      badge={tour.badge || 'Signature route'}
      description={tour.longDescription}
      eyebrow={tour.eyebrow}
      heroAlt={tour.imageAlt}
      heroImage={tour.image}
      highlights={tour.highlights}
      highlightsTitle="Ly do hanh trinh nay duoc chon nhieu"
      itinerary={tour.itinerary}
      itineraryTitle="Nhip trai nghiem theo tung ngay"
      meta={meta}
      overviewCards={overviewCards}
      overviewDescription="Khong chi la noi den, day la cach ADN Travel dan nhac toan bo hanh trinh de moi diem dung deu co nhiet do rieng."
      overviewTitle="Chan dung cua chuyen di"
      quote={tour.curatorNote}
      quoteAuthor={tour.curatorName}
      stats={stats}
      title={tour.title}
    />
  );
}
