import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../assets';
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
import { toursPage } from '../services/adminService';
import { getToursRequest, resolveTourImageUrl } from '../services/toursService';
import { ROUTES } from '../utils/routes';
import { formatCurrencyVnd } from '../../shared/utils/formatters';

function formatCount(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

function formatTourDuration(tour) {
  if (tour.durationText) {
    return tour.durationText;
  }

  if (tour.duration) {
    return `${tour.duration} ngày`;
  }

  return 'Đang cập nhật';
}

function formatTourPrice(price) {
  if (price === null || price === undefined || Number.isNaN(Number(price))) {
    return 'Liên hệ';
  }

  return `${formatCurrencyVnd(Number(price))}đ`;
}

function getStatusTone(status) {
  if (status === 'Active') {
    return 'success';
  }

  if (status === 'Closed') {
    return 'inactive';
  }

  return 'draft';
}

function mapApiTourToRow(tour) {
  return {
    id: tour.id,
    displayId: `TR-${String(tour.id).padStart(4, '0')}`,
    name: tour.title || 'Chưa đặt tên tour',
    image: resolveTourImageUrl(tour.imageUrl) || images.tourHaLong,
    location: tour.location || 'Đang cập nhật',
    duration: formatTourDuration(tour),
    price: formatTourPrice(tour.price),
    status: tour.status || 'Draft',
  };
}

export default function ToursPage() {
  const [tourRows, setTourRows] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1, hasNextPage: false, hasPrevPage: false });
  // Dùng ref để debounce search, tránh gọi API liên tục khi gõ
  const debounceTimer = useRef(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useDocumentTitle('Tours | ADN Travel Admin');

  // Debounce: đợi 400ms sau khi user ngừng gõ mới gọi API
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(value);
      setCurrentPage(1); // Reset về trang 1 khi search thay đổi
    }, 400);
  };

  // Reset về trang 1 khi đổi status filter
  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    let isMounted = true;

    const loadTours = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const response = await getToursRequest({
          page: currentPage,
          search: debouncedSearch || undefined,
          status: selectedStatus || undefined,
        });

        if (!isMounted) {
          return;
        }

        setTourRows((response.tours || []).map(mapApiTourToRow));
        if (response.pagination) {
          setPagination(response.pagination);
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setTourRows([]);
        setLoadError(error.message || 'Không thể tải danh sách tour lúc này.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTours();

    return () => {
      isMounted = false;
    };
  // Gọi lại API khi page, search, hoặc status thay đổi
  }, [currentPage, debouncedSearch, selectedStatus]);

  const visibleTours = tourRows;

  const tourSummaryCards = toursPage.summaryCards.map((card) => {
    if (card.id === 'total') {
      return { ...card, value: formatCount(pagination.total) };
    }

    if (card.id === 'active') {
      return {
        ...card,
        value: formatCount(tourRows.filter((tour) => tour.status === 'Active').length),
      };
    }

    return card;
  });

  const displayRows = visibleTours.length
    ? visibleTours
    : [
        {
          id: 'empty-state',
          isEmptyState: true,
          message: isLoading
            ? 'Đang tải danh sách tour...'
            : loadError || 'Không có tour nào phù hợp.',
        },
      ];

  return (
    <div className="admin-page-shell">
      <HeroSection
        title={toursPage.title}
        description={toursPage.description}
        actions={(
          <Button as={Link} icon="add" iconClassName="text-lg" size="lg" to={ROUTES.newTour}>
            Them Tour moi
          </Button>
        )}
      />

      <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="rounded-2xl bg-surface-container-low p-2 lg:col-span-8">
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Tim kiem tour theo ten, dia diem..."
            className="rounded-xl bg-surface-container-lowest py-4 shadow-sm"
          />
        </div>
        <div className="flex gap-3 lg:col-span-4">
          <div className="relative flex-1 rounded-xl bg-surface-container-low px-4">
            <select
              value={selectedStatus}
              onChange={(event) => handleStatusChange(event.target.value)}
              className="w-full appearance-none bg-transparent py-4 pr-8 text-sm font-medium text-slate-600"
            >
              <option value="">All statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Closed">Closed</option>
            </select>
            <Icon name="expand_more" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </section>

      {loadError && !isLoading ? (
        <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm text-rose-600">
          {loadError}
        </div>
      ) : null}

      <SectionCard
        className="rounded-[2rem] border-none"
        contentClassName="p-0"
        footer={(
          <div className="flex items-center justify-between bg-surface-container-low px-8 py-6">
            <p className="text-xs font-medium text-slate-500">
              Trang {currentPage} / {pagination.totalPages} &mdash; Tổng {pagination.total} tour
            </p>
            <div className="flex gap-2">
              <IconButton
                icon="chevron_left"
                variant="subtle"
                className="border border-primary/10 bg-surface-container-lowest text-slate-400"
                disabled={!pagination.hasPrevPage}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              />
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? 'solid' : 'secondary'}
                  className={`h-10 w-10 rounded-lg px-0 shadow-none ${
                    pageNum !== currentPage ? 'text-slate-600' : ''
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </Button>
              ))}
              <IconButton
                icon="chevron_right"
                variant="subtle"
                className="border border-primary/10 bg-surface-container-lowest text-slate-400"
                disabled={!pagination.hasNextPage}
                onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
              />
            </div>
          </div>
        )}
      >
        <DataTable
          rows={displayRows}
          columns={[
            { key: 'image', label: 'Image', className: 'px-8 text-xs font-extrabold uppercase tracking-widest text-slate-500' },
            { key: 'details', label: 'Tour Details', className: 'text-xs font-extrabold uppercase tracking-widest text-slate-500' },
            { key: 'location', label: 'Location', className: 'text-xs font-extrabold uppercase tracking-widest text-slate-500' },
            { key: 'duration', label: 'Duration', className: 'text-xs font-extrabold uppercase tracking-widest text-slate-500' },
            { key: 'price', label: 'Price', className: 'text-xs font-extrabold uppercase tracking-widest text-slate-500' },
            { key: 'status', label: 'Status', className: 'text-xs font-extrabold uppercase tracking-widest text-slate-500' },
            { key: 'actions', label: 'Actions', className: 'px-8 text-right text-xs font-extrabold uppercase tracking-widest text-slate-500' },
          ]}
          headClassName="bg-surface-container-low"
          bodyClassName="divide-y divide-surface-container-low"
          renderRow={(tour) => {
            if (tour.isEmptyState) {
              return (
                <tr key={tour.id}>
                  <td colSpan={7} className="px-8 py-12 text-center text-sm text-slate-500">
                    {tour.message}
                  </td>
                </tr>
              );
            }

            return (
              <tr key={tour.id} className="group transition-colors hover:bg-surface-container-low">
                <td className="px-8 py-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl shadow-md">
                    <img src={tour.image} alt={tour.name} className="h-full w-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-on-surface transition-colors group-hover:text-primary">{tour.name}</p>
                  <p className="mt-1 text-xs text-slate-400">ID: {tour.displayId}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Icon name="location_on" className="text-sm" />
                    <span className="text-sm">{tour.location}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-700">{tour.duration}</td>
                <td className="px-6 py-4 text-sm font-bold text-primary">{tour.price}</td>
                <td className="px-6 py-4">
                  <StatusBadge
                    label={tour.status}
                    tone={getStatusTone(tour.status)}
                    showDot
                    className="rounded-full"
                  />
                </td>
                <td className="px-8 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <IconButton icon="edit" variant="clean" className="hover:bg-white" />
                    <IconButton icon="delete" variant="danger" />
                  </div>
                </td>
              </tr>
            );
          }}
        />
      </SectionCard>

      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
        {tourSummaryCards.map((card) => (
          <StatCard
            key={card.id}
            className={`${card.className} flex h-40 flex-col justify-between p-6`}
            icon={<Icon name={card.icon} />}
            iconPanelClassName="flex h-10 w-10 items-center justify-center rounded-xl"
            label={card.label}
            value={card.value}
          />
        ))}
        <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-container p-8 md:col-span-2">
          <div className="relative z-10">
            <p className="mb-1 font-medium text-white/80">{toursPage.tip.label}</p>
            <h3 className="max-w-xs text-xl font-bold leading-tight text-white">{toursPage.tip.title}</h3>
          </div>
          <Icon name="auto_awesome" className="absolute -bottom-4 -right-4 rotate-12 text-[96px] text-white/10" />
        </article>
      </section>
    </div>
  );
}
