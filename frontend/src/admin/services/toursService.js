const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');
const API_ORIGIN = API_BASE_URL.replace(/\/api$/, '');

function getFirstValidationError(errors) {
  if (!errors || typeof errors !== 'object') {
    return null;
  }

  const firstError = Object.values(errors).find(Boolean);
  return typeof firstError === 'string' ? firstError : null;
}

async function request(path, options = {}) {
  let response;
  const {
    token,
    headers: customHeaders,
    body,
    ...fetchOptions
  } = options;
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const headers = {
    ...(customHeaders || {}),
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers,
      body,
      ...fetchOptions,
    });
  } catch (error) {
    throw new Error('Khong the ket noi toi backend tour.');
  }

  const rawText = await response.text();
  let payload = {};

  try {
    payload = rawText ? JSON.parse(rawText) : {};
  } catch (error) {
    payload = {};
  }

  if (!response.ok) {
    throw new Error(
      getFirstValidationError(payload.errors)
        || payload.message
        || 'Khong the xu ly yeu cau tour luc nay.',
    );
  }

  return payload;
}

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
  return request(`/tours${queryString ? `?${queryString}` : ''}`, {
    method: 'GET',
  });
}

export function createTourRequest(payload, token, imageFile = null) {
  if (imageFile) {
    const formData = new FormData();
    formData.append('payload', JSON.stringify(payload));
    formData.append('image', imageFile);

    return request('/tours', {
      method: 'POST',
      token,
      body: formData,
    });
  }

  return request('/tours', {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}
