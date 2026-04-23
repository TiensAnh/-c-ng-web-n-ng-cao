import { useEffect, useMemo, useState } from 'react';
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
import { normalizeText } from '../utils/formatters';

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
  const location = useLocation();
  const { adminToken } = useAdminAuth();
  const [bookingRows, setBookingRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isUpdatingId, setIsUpdatingId] = useState(null);
  const bookingIdFromQuery = new URLSearchParams(location.search).get('bookingId');

  useDocumentTitle('Bookings Management');

  useEffect(() => {
    if (!bookingIdFromQuery) {
      return;
    }

    setSearchQuery(`#BK-${bookingIdFromQuery}`);
  }, [bookingIdFromQuery]);

  useEffect(() => {
    let isMounted = true;

    const loadBookings = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const response = await getAdminBookingsRequest(adminToken, {
          status: selectedStatus === 'ALL' ? undefined : selectedStatus,
        });

        if (!isMounted) {
          return;
        }

        setBookingRows(response.bookings || []);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setBookingRows([]);
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
  }, [adminToken, selectedStatus]);

  const visibleBookings = useMemo(() => {
    if (!searchQuery.trim()) {
      return bookingRows;
    }

    const normalizedQuery = normalizeText(searchQuery);

    return bookingRows.filter((booking) => (
      normalizeText(
        `${booking.displayId} ${booking.customer} ${booking.email} ${booking.tour} ${booking.status}`,
      ).includes(normalizedQuery)
    ));
  }, [bookingRows, searchQuery]);

  const bookingStats = [
    {
      id: 'total',
      label: 'Total Bookings',
      value: formatCount(bookingRows.length),
      meta: 'Live from backend',
      metaClassName: 'text-green-600',
    },
    {
      id: 'pending',
      label: 'Pending',
      value: formatCount(bookingRows.filter((booking) => booking.status === 'PENDING').length),
      meta: 'Requires action',
      metaClassName: 'text-tertiary',
    },
    {
      id: 'confirmed',
      label: 'Confirmed',
      value: formatCount(
        bookingRows.filter((booking) => booking.status === 'CONFIRMED' || booking.status === 'COMPLETED').length,
      ),
      meta: 'Confirmed or completed',
      metaClassName: 'text-slate-400',
    },
    {
      id: 'revenue',
      label: 'Revenue',
      value: formatCurrency(bookingRows.reduce((sum, booking) => sum + booking.rawTotal, 0)),
      meta: 'Visible rows',
      metaClassName: 'text-primary',
    },
  ];

  const statusOptions = ['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];

  const handleUpdateStatus = async (bookingId, nextStatus) => {
    setIsUpdatingId(bookingId);
    setLoadError('');

    try {
      await updateAdminBookingStatusRequest(bookingId, nextStatus, adminToken);
      setBookingRows((currentRows) => currentRows.map((booking) => (
        booking.id === bookingId
          ? {
            ...booking,
            status: nextStatus,
            statusTone: nextStatus === 'CANCELLED'
              ? 'blocked'
              : nextStatus === 'CONFIRMED' || nextStatus === 'COMPLETED'
                ? 'success'
                : 'pending',
          }
          : booking
      )));
    } catch (error) {
      setLoadError(error.message || 'Khong the cap nhat trang thai booking.');
    } finally {
      setIsUpdatingId(null);
    }
  };

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
            onChange={setSearchQuery}
            placeholder="Search by ID, name or tour..."
            containerClassName="min-w-[280px] flex-1 max-w-md"
            className="bg-surface-container-lowest"
          />
          <div className="relative rounded-lg bg-surface-container-lowest px-4">
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
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
          Showing {visibleBookings.length} rows
        </div>
      </section>

      <SectionCard
        contentClassName="p-0"
        footer={(
          <div className="flex items-center justify-between bg-surface-container-low px-6 py-4">
            <p className="text-xs font-medium text-slate-500">
              Showing 1 to {visibleBookings.length} of {bookingRows.length} entries
            </p>
            <div className="flex gap-1">
              <IconButton icon="chevron_left" variant="subtle" className="h-8 w-8 rounded-lg p-0 text-slate-400" disabled />
              <Button variant="solid" className="h-8 w-8 rounded-lg px-0 shadow-none">
                1
              </Button>
              <IconButton icon="chevron_right" variant="subtle" className="h-8 w-8 rounded-lg p-0 text-slate-400" disabled />
            </div>
          </div>
        )}
      >
        <DataTable
          rows={visibleBookings.length ? visibleBookings : [{ id: 'empty', empty: true }]}
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
