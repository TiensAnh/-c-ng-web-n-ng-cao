import { API_ORIGIN, apiRequest } from '../../shared/services/apiClient';

export function resolveTourImageUrl(imageUrl) {
  if (!imageUrl) {
    return '';
  }

  if (/^(https?:)?\/\//i.test(imageUrl) || imageUrl.startsWith('data:') || imageUrl.startsWith('blob:')) {
    return imageUrl;
  }

  return `${API_ORIGIN}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
}

export function getToursRequest(params = {}) {
  const query = new URLSearchParams();
  if (params.page) query.set('page', params.page);
  if (params.search) query.set('search', params.search);
  if (params.status) query.set('status', params.status);
  const queryString = query.toString();

  return apiRequest(`/tours${queryString ? `?${queryString}` : ''}`, {
    method: 'GET',
    connectionErrorMessage: 'Khong the ket noi toi backend tour.',
    defaultErrorMessage: 'Khong the xu ly yeu cau tour luc nay.',
  });
}

export function getTourByIdRequest(tourId) {
  return apiRequest(`/tours/${tourId}`, {
    method: 'GET',
    connectionErrorMessage: 'Khong the ket noi toi backend tour.',
    defaultErrorMessage: 'Khong the tai chi tiet tour luc nay.',
  });
}

export function createTourRequest(payload, token, imageFile = null) {
  if (imageFile) {
    const formData = new FormData();
    formData.append('payload', JSON.stringify(payload));
    formData.append('image', imageFile);

    return apiRequest('/tours', {
      method: 'POST',
      token,
      body: formData,
      connectionErrorMessage: 'Khong the ket noi toi backend tour.',
      defaultErrorMessage: 'Khong the xu ly yeu cau tour luc nay.',
    });
  }

  return apiRequest('/tours', {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
    connectionErrorMessage: 'Khong the ket noi toi backend tour.',
    defaultErrorMessage: 'Khong the xu ly yeu cau tour luc nay.',
  });
}

export function updateTourRequest(tourId, payload, token, imageFile = null) {
  if (imageFile) {
    const formData = new FormData();
    formData.append('payload', JSON.stringify(payload));
    formData.append('image', imageFile);

    return apiRequest(`/tours/${tourId}`, {
      method: 'PUT',
      token,
      body: formData,
      connectionErrorMessage: 'Khong the ket noi toi backend tour.',
      defaultErrorMessage: 'Khong the cap nhat tour luc nay.',
    });
  }

  return apiRequest(`/tours/${tourId}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(payload),
    connectionErrorMessage: 'Khong the ket noi toi backend tour.',
    defaultErrorMessage: 'Khong the cap nhat tour luc nay.',
  });
}

export function deleteTourRequest(tourId, token) {
  return apiRequest(`/tours/${tourId}`, {
    method: 'DELETE',
    token,
    connectionErrorMessage: 'Khong the ket noi toi backend tour.',
    defaultErrorMessage: 'Khong the xoa tour luc nay.',
  });
}
