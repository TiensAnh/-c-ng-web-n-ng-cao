const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

function getFirstValidationError(errors) {
  if (!errors || typeof errors !== 'object') {
    return null;
  }

  const firstError = Object.values(errors).find(Boolean);
  return typeof firstError === 'string' ? firstError : null;
}

async function request(path, options = {}) {
  let response;
  const { token, headers: customHeaders, ...fetchOptions } = options;
  const headers = {
    'Content-Type': 'application/json',
    ...(customHeaders || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers,
      ...fetchOptions,
    });
  } catch (error) {
    throw new Error('Khong the ket noi toi backend auth.');
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
        || 'Khong the xu ly yeu cau luc nay.',
    );
  }

  return payload;
}

export function loginRequest(payload) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function registerRequest(payload) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getCurrentUserRequest(token) {
  return request('/auth/me', {
    method: 'GET',
    token,
  });
}
