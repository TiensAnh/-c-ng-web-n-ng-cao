import { apiRequest } from '../../shared/services/apiClient';

function formatDate(value) {
  if (!value) {
    return 'Dang cap nhat';
  }

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

function formatDateTime(value) {
  if (!value) {
    return 'Dang cap nhat';
  }

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN').format(Number(value || 0));
}

function getBookingTone(status) {
  if (status === 'CONFIRMED' || status === 'COMPLETED') {
    return 'success';
  }

  if (status === 'CANCELLED') {
    return 'cancelled';
  }

  return 'pending';
}

function mapPayment(payment) {
  if (!payment) {
    return null;
  }

  return {
    ...payment,
    amountText: `${formatCurrency(payment.amount)}d`,
    paidAtText: formatDateTime(payment.paid_at),
  };
}

function mapBooking(booking) {
  return {
    ...booking,
    displayId: `BK-${booking.id}`,
    travelDateText: formatDate(booking.travel_date),
    createdAtText: formatDateTime(booking.created_at),
    totalPriceText: `${formatCurrency(booking.total_price)}d`,
    statusTone: getBookingTone(booking.status),
    payment: mapPayment(booking.payment),
  };
}

export function createBookingRequest(payload, token) {
  return apiRequest('/bookings', {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
    connectionErrorMessage: 'Khong the ket noi toi backend booking.',
    defaultErrorMessage: 'Khong the tao booking luc nay.',
  });
}

export async function getMyBookingsRequest(token) {
  const response = await apiRequest('/bookings/my', {
    method: 'GET',
    token,
    connectionErrorMessage: 'Khong the ket noi toi backend booking.',
    defaultErrorMessage: 'Khong the tai danh sach booking luc nay.',
  });

  return {
    ...response,
    bookings: (response.bookings || []).map(mapBooking),
  };
}

export async function getMyBookingDetailRequest(bookingId, token) {
  const response = await apiRequest(`/bookings/my/${bookingId}`, {
    method: 'GET',
    token,
    connectionErrorMessage: 'Khong the ket noi toi backend booking.',
    defaultErrorMessage: 'Khong the tai chi tiet booking luc nay.',
  });

  return {
    ...response,
    booking: response.booking ? mapBooking(response.booking) : null,
  };
}

export function cancelMyBookingRequest(bookingId, token) {
  return apiRequest(`/bookings/my/${bookingId}/cancel`, {
    method: 'PUT',
    token,
    connectionErrorMessage: 'Khong the ket noi toi backend booking.',
    defaultErrorMessage: 'Khong the huy booking luc nay.',
  });
}

export function createPaymentRequest(payload, token) {
  return apiRequest('/payments', {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
    connectionErrorMessage: 'Khong the ket noi toi backend payment.',
    defaultErrorMessage: 'Khong the thanh toan luc nay.',
  });
}

export function createReviewRequest(payload, token) {
  return apiRequest('/reviews', {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
    connectionErrorMessage: 'Khong the ket noi toi backend review.',
    defaultErrorMessage: 'Khong the gui danh gia luc nay.',
  });
}
