import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import DataTable from '../components/DataTable';
import HeroSection from '../components/HeroSection';
import Icon from '../components/Icon';
import IconButton from '../components/IconButton';
import SectionCard from '../components/SectionCard';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  deleteAdminUserRequest,
  getAdminUsersRequest,
  updateAdminUserRoleRequest,
} from '../services/usersApiService';
import { usersPage } from '../services/adminService';
import { normalizeText } from '../utils/formatters';

function formatCount(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

export default function UsersPage() {
  const { topbarSearch } = useOutletContext();
  const { adminToken } = useAdminAuth();
  const [userRows, setUserRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [busyUserId, setBusyUserId] = useState(null);

  useDocumentTitle('User Management | ADN Travel Admin');

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const response = await getAdminUsersRequest(adminToken, topbarSearch);

        if (!isMounted) {
          return;
        }

        setUserRows(response.users || []);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setUserRows([]);
        setLoadError(error.message || 'Khong the tai users luc nay.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (adminToken) {
      loadUsers();
    }

    return () => {
      isMounted = false;
    };
  }, [adminToken, topbarSearch]);

  const visibleUsers = useMemo(() => {
    if (!topbarSearch.trim()) {
      return userRows;
    }

    return userRows.filter((user) =>
      normalizeText(`${user.name} ${user.email} ${user.role}`).includes(normalizeText(topbarSearch)),
    );
  }, [topbarSearch, userRows]);

  const totalUsers = userRows.length;
  const staffUsers = userRows.filter((user) => user.role === 'Staff').length;
  const activeUsers = userRows.length;
  const totalBookings = userRows.reduce((sum, user) => sum + user.totalBookings, 0);

  const handleToggleRole = async (user) => {
    setBusyUserId(user.id);
    setLoadError('');

    try {
      await updateAdminUserRoleRequest(user.id, user.nextRole, adminToken);
      setUserRows((currentRows) => currentRows.map((currentUser) => {
        if (currentUser.id !== user.id) {
          return currentUser;
        }

        return {
          ...currentUser,
          role: user.nextRole === 'STAFF' ? 'Staff' : 'User',
          roleTone: user.nextRole === 'STAFF' ? 'admin' : 'user',
          nextRole: user.nextRole === 'STAFF' ? 'USER' : 'STAFF',
          actionLabel: user.nextRole === 'STAFF' ? 'Set User' : 'Set Staff',
        };
      }));
    } catch (error) {
      setLoadError(error.message || 'Khong the cap nhat role user.');
    } finally {
      setBusyUserId(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    setBusyUserId(userId);
    setLoadError('');

    try {
      await deleteAdminUserRequest(userId, adminToken);
      setUserRows((currentRows) => currentRows.filter((user) => user.id !== userId));
    } catch (error) {
      setLoadError(error.message || 'Khong the xoa user.');
    } finally {
      setBusyUserId(null);
    }
  };

  return (
    <div className="admin-page-shell">
      <HeroSection
        title="User Directory"
        description="Manage roles and review active customer accounts with live backend data."
        actions={(
          <Button variant="secondary" icon="file_download" disabled>
            Export List
          </Button>
        )}
      />

      {loadError ? (
        <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm text-rose-600">
          {loadError}
        </div>
      ) : null}

      <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <StatCard className="border-l-4 border-primary" label="Total Users" value={isLoading ? '...' : formatCount(totalUsers)}>
          <div className="mt-2 flex items-center gap-1 text-xs font-medium text-green-600">
            <Icon name="trending_up" className="text-sm" />
            Live count in admin view
          </div>
        </StatCard>

        <article className="surface-card p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Active Accounts</p>
          <h3 className="mt-1 font-headline text-2xl font-extrabold text-on-surface">{isLoading ? '...' : formatCount(activeUsers)}</h3>
          <div className="mt-3 flex -space-x-2">
            {usersPage.stats[1].avatars.map((avatar, index) => (
              <img
                key={`active-${index + 1}`}
                src={avatar}
                alt={`Active user ${index + 1}`}
                className="h-6 w-6 rounded-full border-2 border-white object-cover"
              />
            ))}
            <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[10px] font-bold text-slate-500">
              +{Math.max(activeUsers, 0)}
            </span>
          </div>
        </article>

        <StatCard className="border-l-4 border-tertiary" label="Staff Accounts" value={isLoading ? '...' : formatCount(staffUsers)}>
          <p className="mt-2 text-xs font-medium text-amber-600">Users with elevated role</p>
        </StatCard>

        <StatCard className="border-l-4 border-error" label="Total Bookings" value={isLoading ? '...' : formatCount(totalBookings)}>
          <p className="mt-2 text-xs font-medium text-slate-400">Aggregated from user history</p>
        </StatCard>
      </section>

      <SectionCard
        title="User Database"
        contentClassName="p-0"
        headerClassName="border-b border-white bg-surface-container-low"
        actions={(
          <div className="flex gap-2">
            <IconButton icon="filter_list" />
            <IconButton icon="more_vert" />
          </div>
        )}
        footer={(
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4">
            <span className="text-xs font-medium text-slate-500">
              Showing <span className="text-on-surface">{visibleUsers.length}</span> of{' '}
              <span className="text-on-surface">{totalUsers}</span> users
            </span>
            <div className="flex items-center gap-1">
              <IconButton icon="chevron_left" variant="subtle" className="border border-transparent p-1.5 text-slate-400 hover:border-slate-200" disabled />
              <Button variant="solid" className="rounded px-2.5 py-1 text-xs shadow-none">
                1
              </Button>
              <IconButton icon="chevron_right" variant="subtle" className="border border-transparent p-1.5 text-slate-400 hover:border-slate-200" disabled />
            </div>
          </div>
        )}
      >
        <DataTable
          rows={visibleUsers.length ? visibleUsers : [{ id: 'empty', empty: true }]}
          columns={[
            { key: 'details', label: 'User Details', className: 'text-xs font-bold uppercase tracking-wider text-slate-500' },
            { key: 'role', label: 'Role', className: 'text-xs font-bold uppercase tracking-wider text-slate-500' },
            { key: 'status', label: 'Status', className: 'text-xs font-bold uppercase tracking-wider text-slate-500' },
            { key: 'date', label: 'Reg. Date', className: 'text-xs font-bold uppercase tracking-wider text-slate-500' },
            { key: 'actions', label: 'Actions', className: 'text-right text-xs font-bold uppercase tracking-wider text-slate-500' },
          ]}
          headClassName="bg-slate-50"
          bodyClassName="divide-y divide-slate-100"
          renderRow={(user) => {
            if (user.empty) {
              return (
                <tr key={user.id}>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500">
                    {isLoading ? 'Dang tai users...' : 'Khong co user nao phu hop.'}
                  </td>
                </tr>
              );
            }

            return (
              <tr key={user.id} className="group transition-colors hover:bg-surface-container-low">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      initials={user.initials}
                      className="h-10 w-10 rounded-full object-cover shadow-sm"
                      fallbackClassName="shadow-sm"
                    />
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge label={user.role} tone={user.roleTone} className="tracking-tight" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    {user.status}
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-medium text-slate-500">{user.registeredAt}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="secondary"
                      className="opacity-0 transition-all group-hover:opacity-100 text-xs font-bold"
                      disabled={busyUserId === user.id}
                      onClick={() => handleToggleRole(user)}
                    >
                      {user.actionLabel}
                    </Button>
                    <Button
                      variant="danger"
                      className="opacity-0 transition-all group-hover:opacity-100 text-xs font-bold"
                      disabled={busyUserId === user.id}
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          }}
        />
      </SectionCard>

      <section className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <article className="relative overflow-hidden rounded-2xl bg-surface-container-low p-8">
          <div className="relative z-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Icon name="shield_person" className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-on-surface">Platform Access Control</h3>
            <p className="mt-2 max-w-sm text-sm text-on-surface-variant">
              Current backend supports listing users, changing role between User and Staff, and deleting inactive-safe accounts.
            </p>
            <Button variant="ghost" className="mt-6 px-0 text-sm font-bold">
              Review Roles
            </Button>
          </div>
          <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        </article>
        <article className="rounded-2xl border border-dashed border-slate-300 bg-surface-container-low p-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary/10">
            <Icon name="history" className="text-tertiary" />
          </div>
          <h3 className="text-xl font-bold text-on-surface">Audit Notes</h3>
          <p className="mt-2 max-w-sm text-sm text-on-surface-variant">
            If you want true block/unblock, invite-user, or audit-log flows, backend schema needs dedicated status and admin action tables.
          </p>
          <Button variant="ghost" className="mt-6 px-0 text-sm font-bold text-tertiary hover:text-tertiary">
            Plan Next Backend Step
          </Button>
        </article>
      </section>
    </div>
  );
}
