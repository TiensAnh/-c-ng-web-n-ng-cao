import { apiRequest } from './apiClient';

export function loginRequest(payload) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    connectionErrorMessage: 'Khong the ket noi toi backend auth.',
  });
}

export function registerRequest(payload) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
    connectionErrorMessage: 'Khong the ket noi toi backend auth.',
  });
}

export function getCurrentUserRequest(token) {
  return apiRequest('/auth/me', {
    method: 'GET',
    token,
    connectionErrorMessage: 'Khong the ket noi toi backend auth.',
  });
}
