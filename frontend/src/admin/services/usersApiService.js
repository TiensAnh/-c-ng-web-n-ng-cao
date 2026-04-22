import { apiRequest } from '../../shared/services/apiClient';

function formatDate(value) {
  if (!value) {
    return 'Dang cap nhat';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
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

function mapRole(role) {
  if (String(role || '').toUpperCase() === 'STAFF') {
    return {
      label: 'Staff',
      tone: 'admin',
      nextRole: 'USER',
      actionLabel: 'Set User',
    };
  }

  return {
    label: 'User',
    tone: 'user',
    nextRole: 'STAFF',
    actionLabel: 'Set Staff',
  };
}

function mapUserRow(user) {
  const mappedRole = mapRole(user.role);

  return {
    id: user.id,
    name: user.name || 'Unknown user',
    email: user.email || 'N/A',
    avatar: '',
    initials: getInitials(user.name || 'U'),
    role: mappedRole.label,
    roleTone: mappedRole.tone,
    nextRole: mappedRole.nextRole,
    actionLabel: mappedRole.actionLabel,
    status: 'Active',
    statusTone: 'success',
    registeredAt: formatDate(user.created_at),
    totalBookings: Number(user.total_bookings || 0),
  };
}

export async function getAdminUsersRequest(token, search = '') {
  const query = new URLSearchParams();

  if (search.trim()) {
    query.set('search', search.trim());
  }

  const queryString = query.toString();
  const response = await apiRequest(`/users${queryString ? `?${queryString}` : ''}`, {
    method: 'GET',
    token,
    connectionErrorMessage: 'Khong the ket noi toi backend users.',
    defaultErrorMessage: 'Khong the tai danh sach users luc nay.',
  });

  return {
    ...response,
    users: (response.users || []).map(mapUserRow),
  };
}

export function updateAdminUserRoleRequest(userId, role, token) {
  return apiRequest(`/users/${userId}/role`, {
    method: 'PUT',
    token,
    body: JSON.stringify({ role }),
    connectionErrorMessage: 'Khong the ket noi toi backend users.',
    defaultErrorMessage: 'Khong the cap nhat role user luc nay.',
  });
}

export function deleteAdminUserRequest(userId, token) {
  return apiRequest(`/users/${userId}`, {
    method: 'DELETE',
    token,
    connectionErrorMessage: 'Khong the ket noi toi backend users.',
    defaultErrorMessage: 'Khong the xoa user luc nay.',
  });
}
