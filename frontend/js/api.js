// HTTP Client
const BASE = 'http://localhost:5000/api';

function getToken() { return localStorage.getItem('token'); }

export async function request(endpoint, options = {}) {
  const token = getToken();
  const res = await fetch(BASE + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Lỗi hệ thống');
  return data;
}

export const api = {
  get:    (url)          => request(url),
  post:   (url, body)    => request(url, { method: 'POST',   body: JSON.stringify(body) }),
  put:    (url, body)    => request(url, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: (url)          => request(url, { method: 'DELETE' }),
  postForm: (url, form)  => fetch(BASE + url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + getToken() },
    body: form,
  }).then(r => r.json()),
};
