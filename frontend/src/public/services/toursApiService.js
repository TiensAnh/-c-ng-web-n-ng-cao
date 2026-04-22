import {
  tourDanangImage,
  tourHalongImage,
  tourHueImage,
  tourSapaImage,
  toursPromoImage,
} from '../assets/images';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');
const API_ORIGIN = API_BASE_URL.replace(/\/api$/, '');
const HIGHLIGHT_ICONS = ['landscape', 'beach_access', 'nightlife', 'photo_camera', 'hiking'];
const OVERVIEW_ICONS = ['schedule', 'groups', 'flight_takeoff'];

export const toursSidebarContent = {
  ratingOptions: [
    { label: '5.0', value: '5' },
    { label: 'Trở lên', value: '4' },
  ],
  sidebarPromo: {
    image: toursPromoImage,
    title: 'Khám phá thiên đường Phú Quốc',
    description: 'Giảm ngay 20% cho nhóm trên 4 người.',
  },
};

function getFirstValidationError(errors) {
  if (!errors || typeof errors !== 'object') {
    return null;
  }

  const firstError = Object.values(errors).find(Boolean);
  return typeof firstError === 'string' ? firstError : null;
}

async function request(path, options = {}) {
  let response;
  const { token, headers: customHeaders, ...fetchOptions } = options;
  const headers = {
    'Content-Type': 'application/json',
    ...(customHeaders || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers,
      ...fetchOptions,
    });
  } catch (error) {
    throw new Error('Không thể kết nối tới dữ liệu tour.');
  }

  const rawText = await response.text();
  let payload = {};

  try {
    payload = rawText ? JSON.parse(rawText) : {};
  } catch (error) {
    payload = {};
  }

  if (!response.ok) {
    throw new Error(
      getFirstValidationError(payload.errors)
        || payload.message
        || 'Không thể tải dữ liệu tour lúc này.',
    );
  }

  return payload;
}

function normalizeLocation(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function resolveTourImageUrl(imageUrl) {
  if (!imageUrl) {
    return '';
  }

  if (/^(https?:)?\/\//i.test(imageUrl) || imageUrl.startsWith('data:') || imageUrl.startsWith('blob:')) {
    return imageUrl;
  }

  return `${API_ORIGIN}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
}

function resolveTourImage(tour) {
  if (tour.imageUrl) {
    return resolveTourImageUrl(tour.imageUrl);
  }

  const location = normalizeLocation(tour.location || '');

  if (location.includes('ha long') || location.includes('quang ninh')) {
    return tourHalongImage;
  }

  if (location.includes('da nang') || location.includes('hoi an')) {
    return tourDanangImage;
  }

  if (location.includes('sapa') || location.includes('lao cai')) {
    return tourSapaImage;
  }

  if (location.includes('hue')) {
    return tourHueImage;
  }

  return tourHalongImage;
}

function buildDurationText(tour) {
  if (tour.durationText) {
    return tour.durationText;
  }

  if (tour.duration) {
    const nights = Math.max(Number(tour.duration) - 1, 0);
    return `${tour.duration} ngày ${nights} đêm`;
  }

  return 'Đang cập nhật';
}

function buildDurationGroup(duration) {
  const days = Number(duration || 0);

  if (!days || days <= 3) {
    return '1-3 ngày';
  }

  if (days <= 7) {
    return '4-7 ngày';
  }

  return 'Trên 1 tuần';
}

function formatReviewCount(value) {
  const count = Number(value || 0);

  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }

  return `${count}`;
}

function buildGroupSize(maxPeople) {
  if (!maxPeople) {
    return 'Đang cập nhật';
  }

  return `Tối đa ${maxPeople} khách`;
}

function getOverviewIcon(transport = '') {
  const normalizedTransport = normalizeLocation(transport);

  if (normalizedTransport.includes('tau')) {
    return 'directions_boat';
  }

  if (normalizedTransport.includes('may bay')) {
    return 'flight_takeoff';
  }

  if (normalizedTransport.includes('xe')) {
    return 'airport_shuttle';
  }

  return 'explore';
}

function normalizeStringArray(items) {
  return Array.isArray(items) ? items.filter(Boolean) : [];
}

function normalizeOverviewCards(tour) {
  if (Array.isArray(tour.overviewCards) && tour.overviewCards.length) {
    return tour.overviewCards
      .map((card, index) => ({
        icon: card.icon || OVERVIEW_ICONS[index % OVERVIEW_ICONS.length],
        title: card.title || `Thông tin ${index + 1}`,
        description: card.description || '',
      }))
      .filter((card) => card.title || card.description);
  }

  return [
    { icon: 'schedule', title: 'Thời lượng', description: buildDurationText(tour) },
    { icon: 'groups', title: 'Quy mô nhóm', description: buildGroupSize(tour.maxPeople) },
    { icon: getOverviewIcon(tour.transport), title: 'Phương tiện', description: tour.transport || 'Đang cập nhật' },
  ].filter((card) => card.description);
}

function normalizeHighlights(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item, index) => {
      if (typeof item === 'string') {
        return {
          icon: HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length],
          title: `Điểm nhấn ${index + 1}`,
          description: item,
        };
      }

      return {
        icon: item.icon || HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length],
        title: item.title || `Điểm nhấn ${index + 1}`,
        description: item.description || item.title || '',
      };
    })
    .filter((item) => item.description);
}

function normalizeItinerary(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item, index) => ({
      label: item.label || `Ngày ${index + 1}`,
      title: item.title || `Lịch trình ${index + 1}`,
      description: item.description || '',
    }))
    .filter((item) => item.description);
}

export function mapApiTourToCard(tour) {
  return {
    id: tour.id,
    title: tour.title || 'Chưa đặt tên tour',
    destination: tour.location || 'Đang cập nhật',
    description: tour.description || 'Thông tin chi tiết đang được cập nhật.',
    duration: buildDurationText(tour),
    durationGroup: buildDurationGroup(tour.duration),
    transport: tour.transport || buildGroupSize(tour.maxPeople),
    price: Number(tour.price || 0),
    rating: Number(tour.rating || 0) || 5,
    reviews: formatReviewCount(tour.reviews),
    popularity: Number(tour.reviews || 0) * 10 + Number(tour.rating || 0),
    badge: tour.badge || '',
    image: resolveTourImage(tour),
    imageAlt: tour.title || 'Ảnh tour',
    status: tour.status || 'Draft',
  };
}

export function mapApiTourToDetail(tour) {
  return {
    id: tour.id,
    title: tour.title || 'Chưa đặt tên tour',
    destination: tour.location || 'Đang cập nhật',
    duration: buildDurationText(tour),
    transport: tour.transport || 'Đang cập nhật',
    badge: tour.badge || '',
    image: resolveTourImage(tour),
    imageAlt: tour.title || 'Ảnh tour',
    eyebrow: tour.tagline || '',
    season: tour.season || '',
    groupSize: buildGroupSize(tour.maxPeople),
    departureNote: tour.departureNote || '',
    departureSchedule: tour.departureSchedule || '',
    meetingPoint: tour.meetingPoint || '',
    longDescription: tour.description || '',
    curatorNote: tour.curatorNote || '',
    curatorName: tour.curatorName || '',
    overviewCards: normalizeOverviewCards(tour),
    highlights: normalizeHighlights(tour.highlights),
    itinerary: normalizeItinerary(tour.itinerary),
    includedItems: normalizeStringArray(tour.includes),
    promiseItems: normalizeStringArray(tour.promiseItems),
    price: Number(tour.price || 0),
    rating: tour.rating === null || tour.rating === undefined ? null : Number(tour.rating),
    reviews: Number(tour.reviews || 0),
    status: tour.status || 'Draft',
  };
}

export function getPublicToursRequest(params = {}) {
  const query = new URLSearchParams();

  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);
  if (params.status) query.set('status', params.status);
  if (params.search) query.set('search', params.search);

  const queryString = query.toString();

  return request(`/tours${queryString ? `?${queryString}` : ''}`, {
    method: 'GET',
  });
}

export function getPublicTourByIdRequest(tourId) {
  return request(`/tours/${tourId}`, {
    method: 'GET',
  });
}
