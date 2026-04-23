import { useEffect, useState } from 'react';
import Button from '../../shared/components/Button';
import usePageTitle from '../../shared/hooks/usePageTitle';
import { useAuth } from '../../shared/context/AuthContext';
import {
  BANK_TRANSFER_CONFIG,
  buildBookingTransferReference,
  buildTransferQrUrl,
} from '../../shared/utils/paymentConfig';
import {
  cancelMyBookingRequest,
  createPaymentRequest,
  createReviewRequest,
  getMyBookingDetailRequest,
  getMyBookingsRequest,
} from '../services/bookingApiService';

function renderStatusLabel(status) {
  if (status === 'CONFIRMED') {
    return 'Da xac nhan';
  }

  if (status === 'COMPLETED') {
    return 'Da hoan thanh';
  }

  if (status === 'CANCELLED') {
    return 'Da huy';
  }

  return 'Dang cho xu ly';
}

function renderPaymentStatusLabel(status) {
  if (status === 'SUCCESS') {
    return 'Da xac nhan';
  }

  if (status === 'FAILED') {
    return 'That bai';
  }

  if (status === 'CANCELLED') {
    return 'Da huy';
  }

  return 'Dang cho xac nhan';
}

export default function MyBookingsPage() {
  const { isAuthenticated, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('MOMO');
  const [isPaying, setIsPaying] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: '5', comment: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  usePageTitle('ADN Travel | Booking cua toi');

  useEffect(() => {
    let isMounted = true;

    const loadBookings = async () => {
      if (!token) {
        setBookings([]);
        setSelectedBooking(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        const response = await getMyBookingsRequest(token);

        if (!isMounted) {
          return;
        }

        setBookings(response.bookings || []);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setBookings([]);
        setError(loadError.message || 'Khong the tai booking cua ban luc nay.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadBookings();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleViewDetail = async (bookingId) => {
    if (!token) {
      return;
    }

    setIsDetailLoading(true);
    setActionMessage('');
    setError('');

    try {
      const response = await getMyBookingDetailRequest(bookingId, token);
      setSelectedBooking(response.booking);
    } catch (loadError) {
      setError(loadError.message || 'Khong the tai chi tiet booking.');
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!token) {
      return;
    }

    setActionMessage('');
    setError('');

    try {
      const response = await cancelMyBookingRequest(bookingId, token);
      setBookings((currentBookings) => currentBookings.map((booking) => (
        booking.id === bookingId
          ? { ...booking, status: 'CANCELLED', statusTone: 'cancelled' }
          : booking
      )));
      setSelectedBooking((currentBooking) => (
        currentBooking?.id === bookingId
          ? { ...currentBooking, status: 'CANCELLED', statusTone: 'cancelled' }
          : currentBooking
      ));
      setActionMessage(response.message || 'Da huy booking thanh cong.');
    } catch (cancelError) {
      setError(cancelError.message || 'Khong the huy booking.');
    }
  };

  const handlePayBooking = async (bookingId) => {
    if (!token) {
      return;
    }

    setIsPaying(true);
    setActionMessage('');
    setError('');

    try {
      const response = await createPaymentRequest({
        booking_id: bookingId,
        method: paymentMethod,
      }, token);

      setBookings((currentBookings) => currentBookings.map((booking) => (
        booking.id === bookingId
          ? {
              ...booking,
              status: 'PENDING',
              statusTone: 'pending',
              payment: response.payment,
            }
          : booking
      )));

      setSelectedBooking((currentBooking) => (
        currentBooking?.id === bookingId
          ? {
              ...currentBooking,
              status: 'PENDING',
              statusTone: 'pending',
              payment: {
                ...response.payment,
                amountText: currentBooking.totalPriceText,
                paidAtText: response.payment.paid_at
                  ? new Intl.DateTimeFormat('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  }).format(new Date(response.payment.paid_at))
                  : 'Dang cap nhat',
              },
            }
          : currentBooking
      ));

      setActionMessage(response.message || 'Da tao yeu cau thanh toan.');
    } catch (paymentError) {
      setError(paymentError.message || 'Khong the thanh toan booking luc nay.');
    } finally {
      setIsPaying(false);
    }
  };

  const handleReviewSubmit = async (bookingId) => {
    if (!token) {
      return;
    }

    setIsSubmittingReview(true);
    setActionMessage('');
    setError('');

    try {
      const response = await createReviewRequest({
        booking_id: bookingId,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment,
      }, token);

      setBookings((currentBookings) => currentBookings.map((booking) => (
        booking.id === bookingId
          ? { ...booking, has_review: true, can_review: false, review_id: response.review?.id || booking.review_id }
          : booking
      )));
      setSelectedBooking((currentBooking) => (
        currentBooking?.id === bookingId
          ? { ...currentBooking, has_review: true, can_review: false, review_id: response.review?.id || currentBooking.review_id }
          : currentBooking
      ));
      setReviewForm({ rating: '5', comment: '' });
      setActionMessage('Gui danh gia thanh cong.');
    } catch (reviewError) {
      setError(reviewError.message || 'Khong the gui danh gia luc nay.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="account-page section-block">
        <div className="content-container account-page__empty">
          <p className="account-page__eyebrow">Tai khoan ADN Travel</p>
          <h1>Ban can dang nhap de xem booking</h1>
          <p>Hay dang nhap o thanh dieu huong de xem lich su dat tour va thanh toan cua ban.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="account-page section-block">
      <div className="content-container account-page__layout">
        <div className="account-page__list-panel">
          <div className="account-page__section-head">
            <p className="account-page__eyebrow">Lich su dat tour</p>
            <h1>Booking cua toi</h1>
            <p>Theo doi cac booking, xem trang thai thanh toan va huy nhung yeu cau dang cho xu ly.</p>
          </div>

          {error ? <div className="account-page__message account-page__message--error">{error}</div> : null}
          {actionMessage ? <div className="account-page__message account-page__message--success">{actionMessage}</div> : null}

          {isLoading ? (
            <div className="account-page__empty-card">Dang tai danh sach booking...</div>
          ) : bookings.length ? (
            <div className="account-page__booking-list">
              {bookings.map((booking) => (
                <article
                  key={booking.id}
                  className={`account-page__booking-card ${selectedBooking?.id === booking.id ? 'account-page__booking-card--active' : ''}`}
                >
                  <div className="account-page__booking-meta">
                    <div>
                      <p className="account-page__booking-id">{booking.displayId}</p>
                      <h2>{booking.tour_title}</h2>
                    </div>
                    <span className={`account-page__status account-page__status--${booking.statusTone}`}>
                      {renderStatusLabel(booking.status)}
                    </span>
                  </div>

                  <div className="account-page__booking-grid">
                    <div>
                      <span>Ngay di</span>
                      <strong>{booking.travelDateText}</strong>
                    </div>
                    <div>
                      <span>So khach</span>
                      <strong>{booking.number_of_people}</strong>
                    </div>
                    <div>
                      <span>Tong tien</span>
                      <strong>{booking.totalPriceText}</strong>
                    </div>
                  </div>

                  <div className="account-page__booking-actions">
                    <Button variant="secondary" onClick={() => handleViewDetail(booking.id)}>
                      Xem chi tiet
                    </Button>
                    <Button
                      disabled={isPaying || booking.status !== 'PENDING' || booking.payment?.status === 'PENDING'}
                      onClick={() => handlePayBooking(booking.id)}
                    >
                      {booking.payment?.status === 'PENDING'
                        ? 'Cho xac nhan'
                        : isPaying && selectedBooking?.id === booking.id
                          ? 'Dang thanh toan...'
                          : 'Thanh toan'}
                    </Button>
                    <Button
                      variant="ghost"
                      disabled={booking.status !== 'PENDING'}
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Huy booking
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="account-page__empty-card">
              Ban chua co booking nao. Hay chon mot tour de bat dau hanh trinh.
            </div>
          )}
        </div>

        <aside className="account-page__detail-panel">
          <p className="account-page__eyebrow">Chi tiet booking</p>
          {isDetailLoading ? (
            <div className="account-page__detail-empty">Dang tai chi tiet booking...</div>
          ) : selectedBooking ? (
            <div className="account-page__detail-card">
              <h2>{selectedBooking.tour_title}</h2>
              <p>{selectedBooking.location}</p>

              <dl className="account-page__detail-grid">
                <div>
                  <dt>Ma booking</dt>
                  <dd>{selectedBooking.displayId}</dd>
                </div>
                <div>
                  <dt>Ngay dat</dt>
                  <dd>{selectedBooking.createdAtText}</dd>
                </div>
                <div>
                  <dt>Ngay di</dt>
                  <dd>{selectedBooking.travelDateText}</dd>
                </div>
                <div>
                  <dt>Trang thai</dt>
                  <dd>{renderStatusLabel(selectedBooking.status)}</dd>
                </div>
                <div>
                  <dt>So nguoi</dt>
                  <dd>{selectedBooking.number_of_people}</dd>
                </div>
                <div>
                  <dt>Tong tien</dt>
                  <dd>{selectedBooking.totalPriceText}</dd>
                </div>
              </dl>

              {selectedBooking.payment ? (
                <div className="account-page__payment-box">
                  <p className="account-page__payment-title">Thong tin thanh toan</p>
                  <div className="account-page__payment-row">
                    <span>Trang thai</span>
                    <strong>{renderPaymentStatusLabel(selectedBooking.payment.status)}</strong>
                  </div>
                  <div className="account-page__payment-row">
                    <span>Phuong thuc</span>
                    <strong>{selectedBooking.payment.method}</strong>
                  </div>
                  <div className="account-page__payment-row">
                    <span>So tien</span>
                    <strong>{selectedBooking.payment.amountText}</strong>
                  </div>
                  <div className="account-page__payment-row">
                    <span>Thoi gian</span>
                    <strong>{selectedBooking.payment.paidAtText}</strong>
                  </div>

                  {selectedBooking.payment.method === 'BANK_TRANSFER' && selectedBooking.payment.status === 'PENDING' ? (
                    <>
                      <div className="account-page__payment-row">
                        <span>Ngân hàng</span>
                        <strong>{BANK_TRANSFER_CONFIG.bankName}</strong>
                      </div>
                      <div className="account-page__payment-row">
                        <span>So tai khoan</span>
                        <strong>{BANK_TRANSFER_CONFIG.accountNumber}</strong>
                      </div>
                      <div className="account-page__payment-row">
                        <span>Chu tai khoan</span>
                        <strong>{BANK_TRANSFER_CONFIG.accountName}</strong>
                      </div>
                      <div className="account-page__payment-row">
                        <span>So tien</span>
                        <strong>{selectedBooking.totalPriceText}</strong>
                      </div>
                      <div className="account-page__payment-row">
                        <span>Noi dung CK</span>
                        <strong>{buildBookingTransferReference(selectedBooking.id)}</strong>
                      </div>
                      <div style={{ marginTop: '16px' }}>
                        <img
                          src={buildTransferQrUrl({
                            bookingId: selectedBooking.id,
                            amount: selectedBooking.total_price,
                          })}
                          alt="QR chuyen khoan"
                          style={{ width: '220px', maxWidth: '100%', borderRadius: '16px', background: '#fff', padding: '8px' }}
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              ) : (
                <>
                  <div className="account-page__detail-empty">
                    Booking nay chua co thanh toan duoc ghi nhan.
                  </div>
                  {selectedBooking.status === 'PENDING' ? (
                    <div className="account-page__payment-box">
                      <p className="account-page__payment-title">Thanh toan sau</p>
                      <div className="account-page__payment-row">
                        <span>Phuong thuc</span>
                        <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                          <option value="MOMO">MoMo</option>
                          <option value="BANK_TRANSFER">Chuyen khoan</option>
                          <option value="VNPAY">VNPay</option>
                          <option value="CASH">Tien mat</option>
                        </select>
                      </div>
                      <Button disabled={isPaying} onClick={() => handlePayBooking(selectedBooking.id)}>
                        {isPaying ? 'Dang thanh toan...' : 'Thanh toan booking nay'}
                      </Button>
                    </div>
                  ) : null}
                </>
              )}

              {selectedBooking.can_review ? (
                <div className="account-page__payment-box">
                  <p className="account-page__payment-title">Danh gia chuyen di</p>
                  <div className="tour-spotlight__field">
                    <label htmlFor="review-rating">So sao</label>
                    <select
                      id="review-rating"
                      value={reviewForm.rating}
                      onChange={(event) => setReviewForm((current) => ({ ...current, rating: event.target.value }))}
                    >
                      <option value="5">5 sao</option>
                      <option value="4">4 sao</option>
                      <option value="3">3 sao</option>
                      <option value="2">2 sao</option>
                      <option value="1">1 sao</option>
                    </select>
                  </div>
                  <div className="tour-spotlight__field">
                    <label htmlFor="review-comment">Nhan xet</label>
                    <textarea
                      id="review-comment"
                      value={reviewForm.comment}
                      onChange={(event) => setReviewForm((current) => ({ ...current, comment: event.target.value }))}
                      placeholder="Chia se trai nghiem cua ban ve chuyen di nay..."
                    />
                  </div>
                  <Button disabled={isSubmittingReview} onClick={() => handleReviewSubmit(selectedBooking.id)}>
                    {isSubmittingReview ? 'Dang gui danh gia...' : 'Gui danh gia'}
                  </Button>
                </div>
              ) : null}

              {selectedBooking.has_review ? (
                <div className="account-page__detail-empty">
                  Booking nay da co danh gia. Cam on ban da chia se trai nghiem.
                </div>
              ) : null}
            </div>
          ) : (
            <div className="account-page__detail-empty">
              Chon mot booking ben trai de xem chi tiet.
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
