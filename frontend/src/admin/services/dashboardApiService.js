import { apiRequest } from '../../shared/services/apiClient';

function formatMonthLabel(value) {
  if (!value || !/^\d{4}-\d{2}$/.test(value)) {
    return 'N/A';
  }

  const [year, month] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(year, month - 1, 1));
}

function formatCompactNumber(value) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    notation: 'compact',
  }).format(Number(value || 0));
}

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function getStatusTone(status) {
  if (status === 'CONFIRMED' || status === 'COMPLETED') {
    return 'success';
  }

  if (status === 'CANCELLED') {
    return 'blocked';
  }

  return 'pending';
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

function mapRevenueBars(monthlyRevenue = []) {
  if (!monthlyRevenue.length) {
    return [
      { label: 'N/A', height: 36, active: true, revenue: 0 },
    ];
  }

  const revenues = monthlyRevenue.map((item) => Number(item.revenue || 0));
  const maxRevenue = Math.max(...revenues, 1);

  return monthlyRevenue.map((item, index) => ({
    label: formatMonthLabel(item.month),
    height: Math.max(36, Math.round((Number(item.revenue || 0) / maxRevenue) * 220)),
    active: index === monthlyRevenue.length - 1,
    secondary: index === monthlyRevenue.length - 2,
    revenue: Number(item.revenue || 0),
  }));
}

function mapRecentBookings(bookings = []) {
  return bookings.map((booking) => ({
    id: booking.id,
    displayId: `#BK-${booking.id}`,
    customer: booking.user_name || 'Unknown user',
    tour: booking.tour_title || 'Unknown tour',
    date: new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(new Date(booking.created_at)),
    amount: formatCurrency(booking.total_price),
    status: booking.status || 'PENDING',
    statusTone: getStatusTone(booking.status),
    initials: getInitials(booking.user_name || 'U'),
    initialsClassName: 'bg-blue-100 text-primary',
  }));
}

export async function getDashboardRequest(token) {
  const response = await apiRequest('/stats/dashboard', {
    method: 'GET',
    token,
    connectionErrorMessage: 'Khong the ket noi toi backend dashboard.',
    defaultErrorMessage: 'Khong the tai du lieu dashboard luc nay.',
  });

  return {
    summaryCards: [
      {
        id: 'total-tours',
        icon: 'explore',
        label: 'Total Tours',
        value: formatCompactNumber(response.stats?.tours?.total),
        iconPanelClassName: 'bg-primary/10 text-primary',
      },
      {
        id: 'active-bookings',
        icon: 'calendar_month',
        label: 'Active Bookings',
        value: formatCompactNumber(
          Number(response.stats?.bookings?.pending || 0) + Number(response.stats?.bookings?.confirmed || 0),
        ),
        iconPanelClassName: 'bg-secondary-container/30 text-primary',
      },
      {
        id: 'new-users',
        icon: 'group',
        label: 'Users',
        value: formatCompactNumber(response.stats?.users?.total),
        iconPanelClassName: 'bg-tertiary-fixed/30 text-tertiary',
      },
      {
        id: 'revenue',
        icon: 'payments',
        label: 'Revenue',
        value: formatCurrency(response.stats?.revenue?.total),
        iconPanelClassName: 'bg-emerald-100 text-emerald-700',
      },
    ],
    chartTabs: [{ key: 'monthly', label: 'Monthly' }],
    chartData: {
      monthly: mapRevenueBars(response.monthlyRevenue || []),
    },
    hasRevenueData: (response.monthlyRevenue || []).some((item) => Number(item.revenue || 0) > 0),
    recentBookings: mapRecentBookings(response.recentBookings || []),
  };
}
