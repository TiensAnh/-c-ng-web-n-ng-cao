import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import DataTable from '../components/DataTable';
import HeroSection from '../components/HeroSection';
import Icon from '../components/Icon';
import IconButton from '../components/IconButton';
import SearchInput from '../components/SearchInput';
import SectionCard from '../components/SectionCard';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  getAdminBookingsRequest,
  updateAdminBookingStatusRequest,
} from '../services/bookingsApiService';

function formatCount(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

export default function BookingsPage() {
  const PAGE_SIZE = 10;
  const location = useLocation();
  const { adminToken } = useAdminAuth();
  const [bookingRows, setBookingRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGE_SIZE,
    totalItems: 0,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isUpdatingId, setIsUpdatingId] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const bookingIdFromQuery = new URLSearchParams(location.search).get('bookingId');

  useDocumentTitle('Bookings Management');

  useEffect(() => {
    if (!bookingIdFromQuery) {
      return;
    }

    setSearchQuery(`#BK-${bookingIdFromQuery}`);
    setCurrentPage(1);
  }, [bookingIdFromQuery]);

  useEffect(() => {
    let isMounted = true;
    const normalizedSearch = searchQuery.trim();

    const loadBookings = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const response = await getAdminBookingsRequest(adminToken, {
          status: selectedStatus === 'ALL' ? undefined : selectedStatus,
          search: normalizedSearch || undefined,
          page: currentPage,
          limit: PAGE_SIZE,
        });

        if (!isMounted) {
          return;
        }

        setBookingRows(response.bookings || []);
        setPagination(response.pagination || {
          page: 1,
          limit: PAGE_SIZE,
          totalItems: 0,
          totalPages: 1,
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setBookingRows([]);
        setPagination({
          page: 1,
          limit: PAGE_SIZE,
          totalItems: 0,
          totalPages: 1,
        });
        setLoadError(error.message || 'Khong the tai bookings luc nay.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (adminToken) {
      loadBookings();
    }

    return () => {
      isMounted = false;
    };
  }, [PAGE_SIZE, adminToken, currentPage, reloadKey, searchQuery, selectedStatus]);

  const bookingStats = [
    {
      id: 'total',
      label: 'Total Bookings',
      value: formatCount(pagination.totalItems),
      meta: 'Matched results',
      metaClassName: 'text-primary',
    },
    {
      id: 'pending',
      label: 'Pending',
      value: formatCount(bookingRows.filter((booking) => booking.status === 'PENDING').length),
      meta: 'On current page',
      metaClassName: 'text-tertiary',
    },
    {
      id: 'confirmed',
      label: 'Confirmed',
      value: formatCount(
        bookingRows.filter((booking) => booking.status === 'CONFIRMED' || booking.status === 'COMPLETED').length,
      ),
      meta: 'On current page',
      metaClassName: 'text-slate-400',
    },
    {
      id: 'revenue',
      label: 'Revenue',
      value: formatCurrency(bookingRows.reduce((sum, booking) => sum + booking.rawTotal, 0)),
      meta: 'Current page',
      metaClassName: 'text-primary',
    },
  ];

  const statusOptions = ['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];

  const handleUpdateStatus = async (bookingId, nextStatus) => {
    setIsUpdatingId(bookingId);
    setLoadError('');

    try {
      await updateAdminBookingStatusRequest(bookingId, nextStatus, adminToken);
      setReloadKey((currentValue) => currentValue + 1);
    } catch (error) {
      setLoadError(error.message || 'Khong the cap nhat trang thai booking.');
    } finally {
      setIsUpdatingId(null);
    }
  };

  const totalPages = Math.max(pagination.totalPages || 1, 1);
  const paginationStart = pagination.totalItems === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const paginationEnd = pagination.totalItems === 0
    ? 0
    : Math.min(pagination.page * pagination.limit, pagination.totalItems);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter((page) => page === 1 || page === totalPages || Math.abs(page - pagination.page) <= 1);
  const compactPageNumbers = pageNumbers.filter((page, index, pages) => (
    index === 0 || page !== pages[index - 1]
  ));

  return (
    <div className="admin-page-shell">
      <HeroSection
        title="Bookings Management"
        description="Oversee all traveler expeditions and reservation statuses with live backend data."
        actions={(
          <Button variant="secondary" disabled>
            Export Report
          </Button>
        )}
      />

      {loadError ? (
        <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm text-rose-600">
          {loadError}
        </div>
      ) : null}

      <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {bookingStats.map((stat) => (
          <StatCard
            key={stat.id}
            className={stat.id === 'pending' ? 'border-l-4 border-tertiary-fixed' : stat.id === 'confirmed' ? 'border-l-4 border-green-500' : ''}
            label={stat.label}
            value={isLoading ? '...' : stat.value}
          >
            <p className={`mt-2 text-xs font-medium ${stat.metaClassName}`}>{stat.meta}</p>
          </StatCard>
        ))}
      </section>

      <section className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-container-low p-4">
        <div className="flex flex-1 flex-wrap items-center gap-4">
          <SearchInput
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value);
              setCurrentPage(1);
            }}
            placeholder="Search by ID, name or tour..."
            containerClassName="min-w-[280px] flex-1 max-w-md"
            className="bg-surface-container-lowest"
          />
          <div className="relative rounded-lg bg-surface-container-lowest px-4">
            <select
              value={selectedStatus}
              onChange={(event) => {
                setSelectedStatus(event.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-transparent py-2 pr-8 text-sm"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === 'ALL' ? 'All statuses' : status}
                </option>
              ))}
            </select>
            <Icon name="expand_more" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
        <div className="text-xs font-medium text-slate-500">
          Showing {bookingRows.length} rows
        </div>
      </section>

      <SectionCard
        contentClassName="p-0"
        footer={(
          <div className="flex items-center justify-between bg-surface-container-low px-6 py-4">
            <p className="text-xs font-medium text-slate-500">
              Showing {paginationStart} to {paginationEnd} of {pagination.totalItems} entries
            </p>
            <div className="flex gap-1">
              <IconButton
                icon="chevron_left"
                variant="subtle"
                className="h-8 w-8 rounded-lg p-0 text-slate-400"
                disabled={pagination.page <= 1 || isLoading}
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              />
              {compactPageNumbers.map((page, index) => {
                const previousPage = compactPageNumbers[index - 1];
                const shouldShowGap = previousPage && page - previousPage > 1;

                return (
                  <div key={page} className="flex items-center gap-1">
                    {shouldShowGap ? (
                      <span className="px-2 text-sm text-slate-400">...</span>
                    ) : null}
                    <Button
                      variant={page === pagination.page ? 'solid' : 'outline'}
                      className="h-8 min-w-8 rounded-lg px-2 shadow-none"
                      onClick={() => setCurrentPage(page)}
                      disabled={isLoading}
                    >
                      {page}
                    </Button>
                  </div>
                );
              })}
              <IconButton
                icon="chevron_right"
                variant="subtle"
                className="h-8 w-8 rounded-lg p-0 text-slate-400"
                disabled={pagination.page >= totalPages || isLoading}
                onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
              />
            </div>
          </div>
        )}
      >
        <DataTable
          rows={bookingRows.length ? bookingRows : [{ id: 'empty', empty: true }]}
          columns={[
            { key: 'booking-id', label: 'Booking ID', className: 'text-xs font-bold uppercase tracking-wider text-on-surface-variant' },
            { key: 'customer', label: 'Customer Name', className: 'text-xs font-bold uppercase tracking-wider text-on-surface-variant' },
            { key: 'tour', label: 'Tour Expedition', className: 'text-xs font-bold uppercase tracking-wider text-on-surface-variant' },
            { key: 'date', label: 'Travel Date', className: 'text-xs font-bold uppercase tracking-wider text-on-surface-variant' },
            { key: 'total', label: 'Total Price', className: 'text-right text-xs font-bold uppercase tracking-wider text-on-surface-variant' },
            { key: 'status', label: 'Status', className: 'text-center text-xs font-bold uppercase tracking-wider text-on-surface-variant' },
            { key: 'actions', label: 'Actions', className: 'text-right text-xs font-bold uppercase tracking-wider text-on-surface-variant' },
          ]}
          headClassName="bg-surface-container-low"
          bodyClassName="divide-y divide-slate-100"
          renderRow={(booking) => {
            if (booking.empty) {
              return (
                <tr key={booking.id}>
                  <td colSpan={7} className="px-6 py-10 text-center text-sm text-slate-500">
                    {isLoading ? 'Dang tai bookings...' : 'Khong co booking nao phu hop.'}
                  </td>
                </tr>
              );
            }

            return (
              <tr key={booking.id} className="group transition-colors hover:bg-slate-50">
                <td className="px-6 py-5 font-mono text-xs font-bold text-blue-700">{booking.displayId}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={booking.avatar}
                      alt={booking.customer}
                      initials={booking.initials}
                      className="h-8 w-8 rounded-full"
                      fallbackClassName={booking.initialsClassName}
                    />
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{booking.customer}</p>
                      <p className="text-[11px] text-slate-500">{booking.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-on-surface">{booking.tour}</p>
                  <p className="text-[11px] text-slate-400">{booking.subtitle || `${booking.numberOfPeople} travelers`}</p>
                </td>
                <td className="px-6 py-5 text-sm text-on-surface-variant">{booking.travelDate}</td>
                <td className="px-6 py-5 text-right text-sm font-bold text-on-surface">{booking.total}</td>
                <td className="px-6 py-5 text-center">
                  <StatusBadge
                    label={booking.status}
                    tone={booking.statusTone}
                    className="normal-case tracking-normal"
                  />
                </td>
                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      className="px-0 text-xs font-bold"
                      disabled={isUpdatingId === booking.id || booking.status !== 'PENDING'}
                      onClick={() => handleUpdateStatus(booking.id, 'CONFIRMED')}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-0 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                      disabled={isUpdatingId === booking.id || booking.status !== 'CONFIRMED'}
                      onClick={() => handleUpdateStatus(booking.id, 'COMPLETED')}
                    >
                      Complete
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-0 text-xs font-bold text-on-surface-variant hover:text-on-surface"
                      disabled={isUpdatingId === booking.id || booking.status === 'CANCELLED' || booking.status === 'COMPLETED'}
                      onClick={() => handleUpdateStatus(booking.id, 'CANCELLED')}
                    >
                      Cancel
                    </Button>
                  </div>
                </td>
              </tr>
            );
          }}
        />
      </SectionCard>
    </div>
  );
}
