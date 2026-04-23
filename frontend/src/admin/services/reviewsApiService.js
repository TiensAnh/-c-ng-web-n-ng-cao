import { apiRequest } from '../../shared/services/apiClient';

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

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function mapReview(review) {
  return {
    id: review.id,
    bookingId: review.bookingId,
    name: review.userName || 'Unknown user',
    email: review.userEmail || 'N/A',
    initials: getInitials(review.userName || 'U'),
    date: formatDateTime(review.createdAt),
    rating: Number(review.rating || 0),
    tour: review.tourTitle || 'Unknown tour',
    content: review.comment || '',
    reported: Number(review.rating || 0) <= 2,
    status: review.status || 'VISIBLE',
  };
}

export async function getAdminReviewsRequest(token, filters = {}) {
  const query = new URLSearchParams();

  if (filters.status && filters.status !== 'ALL') {
    query.set('status', filters.status);
  }

  if (filters.search) {
    query.set('search', filters.search);
  }

  const queryString = query.toString();
  const response = await apiRequest(`/reviews${queryString ? `?${queryString}` : ''}`, {
    method: 'GET',
    token,
    connectionErrorMessage: 'Khong the ket noi toi backend review.',
    defaultErrorMessage: 'Khong the tai danh sach review luc nay.',
  });

  return {
    ...response,
    reviews: (response.reviews || []).map(mapReview),
  };
}

export function updateAdminReviewStatusRequest(reviewId, status, token) {
  return apiRequest(`/reviews/${reviewId}/status`, {
    method: 'PUT',
    token,
    body: JSON.stringify({ status }),
    connectionErrorMessage: 'Khong the ket noi toi backend review.',
    defaultErrorMessage: 'Khong the cap nhat trang thai review luc nay.',
  });
}
