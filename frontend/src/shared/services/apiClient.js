export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
export const API_ORIGIN = API_BASE_URL.replace(/\/api$/, '');

function getFirstValidationError(errors) {
  if (!errors || typeof errors !== 'object') {
    return null;
  }

  const firstError = Object.values(errors).find(Boolean);
  return typeof firstError === 'string' ? firstError : null;
}

export async function apiRequest(path, options = {}) {
  let response;
  const {
    token,
    headers: customHeaders,
    body,
    connectionErrorMessage = 'Khong the ket noi toi backend.',
    defaultErrorMessage = 'Khong the xu ly yeu cau luc nay.',
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
    throw new Error(connectionErrorMessage);
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
        || defaultErrorMessage,
    );
  }

  return payload;
}
