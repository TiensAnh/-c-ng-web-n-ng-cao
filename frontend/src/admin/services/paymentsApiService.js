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
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || '')
    .join('')
    .toUpperCase();
}

function getStatusTone(status) {
  if (status === 'SUCCESS') {
    return 'success';
  }

  if (status === 'FAILED' || status === 'CANCELLED') {
    return 'failed';
  }

  return 'pending';
}

function mapMethod(method) {
  const normalized = String(method || '').toUpperCase();

  if (normalized === 'MOMO') {
    return { label: 'MoMo Wallet', tone: 'momo' };
  }

  if (normalized === 'BANK_TRANSFER') {
    return { label: 'Bank Transfer', tone: 'bank' };
  }

  if (normalized === 'VNPAY') {
    return { label: 'VNPay', tone: 'bank' };
  }

  if (normalized === 'CASH') {
    return { label: 'Cash', tone: 'cash' };
  }

  return { label: method || 'Unknown', tone: 'bank' };
}

function mapPaymentRow(payment) {
  const method = mapMethod(payment.method);

  return {
    id: `TXN-${payment.id}`,
    bookingId: `#BK-${payment.booking_id}`,
    customer: payment.user_name || 'Unknown user',
    initials: getInitials(payment.user_name || 'U'),
    initialsClassName: 'bg-blue-100 text-blue-700',
    method: method.label,
    methodTone: method.tone,
    date: formatDate(payment.paid_at),
    amount: formatCurrency(payment.amount),
    rawAmount: Number(payment.amount || 0),
    status: payment.status || 'PENDING',
    statusTone: getStatusTone(payment.status),
    tourTitle: payment.tour_title || '',
  };
}

export async function getAdminPaymentsRequest(token) {
  const response = await apiRequest('/payments', {
    method: 'GET',
    token,
    connectionErrorMessage: 'Khong the ket noi toi backend payments.',
    defaultErrorMessage: 'Khong the tai danh sach giao dich luc nay.',
  });

  return {
    ...response,
    payments: (response.payments || []).map(mapPaymentRow),
  };
}
