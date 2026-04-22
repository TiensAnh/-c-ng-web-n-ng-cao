import { apiRequest } from '../../shared/services/apiClient';

export function loginAdminRequest(payload) {
  return apiRequest('/admin-auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    connectionErrorMessage: 'Khong the ket noi toi backend admin.',
    defaultErrorMessage: 'Khong the xu ly yeu cau admin luc nay.',
  });
}

export function registerAdminRequest(payload) {
  return apiRequest('/admin-auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
    connectionErrorMessage: 'Khong the ket noi toi backend admin.',
    defaultErrorMessage: 'Khong the xu ly yeu cau admin luc nay.',
  });
}

export function getCurrentAdminRequest(token) {
  return apiRequest('/admin-auth/me', {
    method: 'GET',
    token,
    connectionErrorMessage: 'Khong the ket noi toi backend admin.',
    defaultErrorMessage: 'Khong the xu ly yeu cau admin luc nay.',
  });
}
