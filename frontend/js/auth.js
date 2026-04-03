// Auth helpers
import { api } from './api.js';

export function saveAuth(data) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user',  JSON.stringify(data.user));
}
export function getUser()   { return JSON.parse(localStorage.getItem('user') || 'null'); }
export function isLoggedIn(){ return !!localStorage.getItem('token'); }
export function isAdmin()   { return getUser()?.role === 'admin'; }
export function logout()    { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = '/frontend/pages/auth/login.html'; }
