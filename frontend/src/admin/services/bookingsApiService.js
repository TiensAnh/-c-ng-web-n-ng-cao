import { apiRequest } from '../../shared/services/apiClient';

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function formatDate(value) {
  if (!value) {
    return 'Dang cap nhat';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

function getStatusTone(status) {
  if (status === 'CONFIRMED' || status === 'COMPLETED') {
    return 'success';
  }

  if (status === 'CANCELLED') {
    return 'blocked';
  }

  return 'pending';
}

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function mapBookingRow(booking) {
  return {
    id: booking.id,
    displayId: `#BK-${booking.id}`,
    customer: booking.user_name || 'Unknown user',
    email: booking.user_email || 'N/A',
    initials: getInitials(booking.user_name || 'U'),
    initialsClassName: 'bg-primary-fixed text-on-primary-fixed-variant',
    tour: booking.tour_title || 'Unknown tour',
    subtitle: booking.location || '',
    travelDate: formatDate(booking.travel_date),
    total: formatCurrency(booking.total_price),
    rawTotal: Number(booking.total_price || 0),
    status: booking.status || 'PENDING',
    statusTone: getStatusTone(booking.status),
    numberOfPeople: Number(booking.number_of_people || 0),
  };
}

export async function getAdminBookingsRequest(token, filters = {}) {
  const query = new URLSearchParams();

  if (filters.status) {
    query.set('status', filters.status);
  }

  if (filters.tourId) {
    query.set('tour_id', filters.tourId);
  }

  if (filters.search) {
    query.set('search', filters.search);
  }

  if (filters.page) {
    query.set('page', String(filters.page));
  }

  if (filters.limit) {
    query.set('limit', String(filters.limit));
  }

  const queryString = query.toString();
  const response = await apiRequest(`/bookings${queryString ? `?${queryString}` : ''}`, {
    method: 'GET',
    token,
    connectionErrorMessage: 'Khong the ket noi toi backend bookings.',
    defaultErrorMessage: 'Khong the tai danh sach bookings luc nay.',
  });

  return {
    ...response,
    bookings: (response.bookings || []).map(mapBookingRow),
    pagination: {
      page: Number(response.page || filters.page || 1),
      limit: Number(response.limit || filters.limit || 10),
      totalItems: Number(response.total || 0),
      totalPages: Number(response.total_pages || 1),
    },
  };
}

export function updateAdminBookingStatusRequest(bookingId, status, token) {
  return apiRequest(`/bookings/${bookingId}/status`, {
    method: 'PUT',
    token,
    body: JSON.stringify({ status }),
    connectionErrorMessage: 'Khong the ket noi toi backend bookings.',
    defaultErrorMessage: 'Khong the cap nhat trang thai booking luc nay.',
  });
}
