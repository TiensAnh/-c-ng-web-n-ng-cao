import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../shared/components/Button';
import TourExperienceLayout from '../../shared/components/TourExperienceLayout';
import usePageTitle from '../../shared/hooks/usePageTitle';
import { useAuth } from '../../shared/context/AuthContext';
import { formatCurrencyVnd } from '../../shared/utils/formatters';
import {
  createBookingRequest,
  createPaymentRequest,
} from '../services/bookingApiService';
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

const INITIAL_BOOKING_FORM = {
  travelDate: '',
  numberOfPeople: '1',
  paymentTiming: 'LATER',
  paymentMethod: 'MOMO',
};

export default function TourDetailPage() {
  const navigate = useNavigate();
  const { tourId } = useParams();
  const { isAuthenticated, token } = useAuth();
  const [tour, setTour] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [bookingForm, setBookingForm] = useState(INITIAL_BOOKING_FORM);
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          setLoadError('Tour nay hien khong kha dung tren trang cong khai.');
          return;
        }

        setTour(mapApiTourToDetail(response.tour));
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setTour(null);
        setLoadError(error.message || 'Khong the tai chi tiet tour luc nay.');
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
      ? 'ADN Travel | Dang tai tour'
      : tour
        ? `ADN Travel | ${tour.title}`
        : 'ADN Travel | Khong tim thay tour',
  );

  const totalEstimate = useMemo(() => {
    const people = Math.max(Number(bookingForm.numberOfPeople || 1), 1);
    return Number(tour?.price || 0) * people;
  }, [bookingForm.numberOfPeople, tour?.price]);

  const handleBookingFieldChange = (field) => (event) => {
    setBookingForm((currentForm) => ({
      ...currentForm,
      [field]: event.target.value,
    }));
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    setBookingError('');
    setBookingMessage('');

    if (!isAuthenticated || !token) {
      setBookingError('Ban can dang nhap truoc khi dat tour.');
      return;
    }

    if (!bookingForm.travelDate) {
      setBookingError('Vui long chon ngay khoi hanh.');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingResponse = await createBookingRequest({
        tour_id: tour.id,
        travel_date: bookingForm.travelDate,
        number_of_people: Number(bookingForm.numberOfPeople),
      }, token);

      const bookingId = bookingResponse.booking?.id;

      if (!bookingId) {
        throw new Error('Booking da tao nhung khong nhan duoc ma booking.');
      }

      if (bookingForm.paymentTiming === 'NOW') {
        const paymentResponse = await createPaymentRequest({
          booking_id: bookingId,
          method: bookingForm.paymentMethod,
        }, token);

        setBookingMessage(
          `${bookingResponse.message || 'Dat tour thanh cong.'} ${paymentResponse.message || 'Thanh toan thanh cong.'}`,
        );
      } else {
        setBookingMessage(
          `${bookingResponse.message || 'Dat tour thanh cong.'} Ban co the thanh toan sau trong muc Booking cua toi.`,
        );
      }

      setBookingForm(INITIAL_BOOKING_FORM);
    } catch (submitError) {
      setBookingError(submitError.message || 'Khong the hoan tat dat tour luc nay.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="tour-spotlight">
        <div className="tour-spotlight__empty">
          <p className="tour-spotlight__eyebrow">Chi tiet tour</p>
          <h1>Dang tai du lieu tour</h1>
          <p>ADN Travel dang lay thong tin hanh trinh moi nhat tu he thong.</p>
        </div>
      </section>
    );
  }

  if (!tour) {
    return (
      <section className="tour-spotlight">
        <div className="tour-spotlight__empty">
          <p className="tour-spotlight__eyebrow">Chi tiet tour</p>
          <h1>Khong tim thay tour nay</h1>
          <p>
            {loadError || 'Co the tour da duoc an, xoa hoac duong dan chua dung. Ban co the quay lai danh sach tour de chon mot hanh trinh khac.'}
          </p>
          <div className="tour-spotlight__hero-actions" style={{ justifyContent: 'center' }}>
            <Button onClick={() => navigate('/tours')}>Quay lai danh sach tour</Button>
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
    { label: 'Gia tu', value: `${formatCurrencyVnd(tour.price)}d`, helper: 'moi khach' },
    tour.rating ? { label: 'Danh gia', value: `${tour.rating}`, helper: `${tour.reviews} danh gia` } : null,
    tour.season ? { label: 'Mua dep', value: tour.season, helper: 'thoi diem goi y' } : null,
    tour.departureNote ? { label: 'Khoi hanh', value: tour.departureNote, helper: 'lich gan nhat' } : null,
  ].filter(Boolean);

  const overviewCards = tour.includedItems.length
    ? [
        ...tour.overviewCards,
        {
          icon: 'inventory_2',
          title: 'Bao gom trong goi',
          items: tour.includedItems,
        },
      ]
    : tour.overviewCards;

  const aside = (
    <div className="tour-spotlight__panel tour-spotlight__panel--accent">
      <p className="tour-spotlight__panel-eyebrow">San sang dat cho</p>
      <h2 className="tour-spotlight__panel-title">Dat tour linh hoat</h2>
      <p className="tour-spotlight__panel-copy">
        Chon ngay di, so luong khach va quyet dinh thanh toan ngay hoac de sau. Booking se duoc tao truoc, sau do ban co the quay lai thanh toan bat ky luc nao.
      </p>

      <div className="tour-spotlight__panel-price">
        <div>
          <span>Gia tam tinh</span>
          <strong>{formatCurrencyVnd(totalEstimate)}d</strong>
        </div>
        {tour.badge ? <em>{tour.badge}</em> : null}
      </div>

      <form className="tour-booking-form" onSubmit={handleBookingSubmit}>
        <label className="tour-booking-form__field">
          <span>Ngay khoi hanh</span>
          <input type="date" value={bookingForm.travelDate} onChange={handleBookingFieldChange('travelDate')} required />
        </label>

        <label className="tour-booking-form__field">
          <span>So luong khach</span>
          <input
            type="number"
            min="1"
            max={tour.maxPeople || 20}
            value={bookingForm.numberOfPeople}
            onChange={handleBookingFieldChange('numberOfPeople')}
            required
          />
        </label>

        <label className="tour-booking-form__field">
          <span>Lua chon thanh toan</span>
          <select value={bookingForm.paymentTiming} onChange={handleBookingFieldChange('paymentTiming')}>
            <option value="LATER">Dat truoc, thanh toan sau</option>
            <option value="NOW">Dat va thanh toan ngay</option>
          </select>
        </label>

        <label className="tour-booking-form__field">
          <span>Thanh toan</span>
          <select
            value={bookingForm.paymentMethod}
            onChange={handleBookingFieldChange('paymentMethod')}
            disabled={bookingForm.paymentTiming !== 'NOW'}
          >
            <option value="MOMO">MoMo</option>
            <option value="BANK_TRANSFER">Chuyen khoan</option>
            <option value="VNPAY">VNPay</option>
            <option value="CASH">Tien mat</option>
          </select>
        </label>

        {!isAuthenticated ? (
          <div className="tour-booking-form__hint">
            Ban can dang nhap truoc khi dat tour. Sau khi dang nhap, quay lai trang nay de tiep tuc.
          </div>
        ) : null}

        {bookingError ? <div className="tour-booking-form__message tour-booking-form__message--error">{bookingError}</div> : null}
        {bookingMessage ? <div className="tour-booking-form__message tour-booking-form__message--success">{bookingMessage}</div> : null}

        <div className="tour-spotlight__panel-actions">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Dang xu ly...' : bookingForm.paymentTiming === 'NOW' ? 'Dat va thanh toan' : 'Dat tour truoc'}
          </Button>
          <Button variant="secondary" onClick={() => navigate('/my-bookings')}>
            Xem booking cua toi
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <TourExperienceLayout
      actions={(
        <>
          <Button variant="secondary" onClick={() => navigate('/tours')}>
            Tat ca tour
          </Button>
          <Button onClick={() => navigate('/my-bookings')}>Booking cua toi</Button>
        </>
      )}
      aside={aside}
      badge={tour.badge || null}
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
      overviewDescription="Toan bo noi dung trang nay dang duoc lay theo du lieu tour trong he thong quan tri."
      overviewTitle="Chan dung cua chuyen di"
      quote={tour.curatorNote}
      quoteAuthor={tour.curatorName}
      stats={stats}
      title={tour.title}
    />
  );
}
