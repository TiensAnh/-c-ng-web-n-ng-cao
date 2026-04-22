import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { images } from '../assets';
import Button from '../components/Button';
import HeroSection from '../components/HeroSection';
import { useAdminAuth } from '../context/AdminAuthContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import {
  createTourRequest,
  getTourByIdRequest,
  resolveTourImageUrl,
  updateTourRequest,
} from '../services/toursService';
import { ROUTES } from '../utils/routes';
import { formatCurrencyVnd } from '../../shared/utils/formatters';

const DEFAULT_IMAGE = images.tourHaLong;
const OVERVIEW_ICONS = ['bed', 'explore', 'restaurant'];
const HIGHLIGHT_ICONS = ['landscape', 'beach_access', 'nightlife', 'photo_camera', 'hiking'];
const BADGE_OPTIONS = ['', 'Ban chay', 'Moi', 'Kham pha', 'Tinh tuyen', 'Uu dai', 'Giam gia'];

const EMPTY_FORM = {
  name: '',
  eyebrow: '',
  badge: '',
  description: '',
  location: '',
  duration: '',
  groupSize: '',
  transport: '',
  status: 'Draft',
  price: '',
  rating: '',
  reviews: '',
  season: '',
  departureNote: '',
  departureSchedule: '',
  meetingPoint: '',
  curatorNote: '',
  curatorName: '',
  includedItems: [''],
  promiseItems: [''],
  overviewCards: [
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
  ],
  highlights: [
    { title: '', description: '' },
  ],
  itinerary: [
    { label: 'Ngay 1', title: '', description: '' },
  ],
};

const panelInputClass =
  'w-full rounded-2xl border border-transparent bg-slate-50/80 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary/25 focus:ring-2 focus:ring-primary/10';
const inlineInputClass =
  'w-full border-none bg-transparent p-0 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:outline-none';
const headingInputClass =
  'w-full border-none bg-transparent p-0 font-headline text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.05em] text-on-surface outline-none placeholder:text-slate-300';
const quoteTextareaClass =
  'w-full min-h-[140px] resize-none border-none bg-transparent p-0 text-[1.05rem] leading-8 text-slate-700 outline-none placeholder:text-slate-400 focus:outline-none';
const richTextareaClass =
  'w-full min-h-[120px] resize-none rounded-2xl border border-transparent bg-slate-50/80 px-4 py-4 text-sm leading-7 text-slate-600 outline-none transition placeholder:text-slate-400 focus:border-primary/25 focus:ring-2 focus:ring-primary/10';
const compactTextareaClass =
  'w-full min-h-[96px] resize-none rounded-2xl border border-transparent bg-slate-50/80 px-4 py-4 text-sm leading-7 text-slate-600 outline-none transition placeholder:text-slate-400 focus:border-primary/25 focus:ring-2 focus:ring-primary/10';
const cardTextareaClass =
  'mt-3 w-full min-h-[110px] resize-none border-none bg-transparent p-0 text-sm leading-7 text-slate-600 outline-none placeholder:text-slate-400 focus:outline-none';
const pillInputClass =
  'min-w-[120px] border-none bg-transparent p-0 text-[0.78rem] font-bold uppercase tracking-[0.08em] outline-none placeholder:text-current';
const pillSelectClass =
  'min-w-[140px] cursor-pointer appearance-none border-none bg-transparent p-0 pr-6 text-[0.78rem] font-bold uppercase tracking-[0.08em] outline-none';

function createEmptyOverviewCard() {
  return { title: '', description: '' };
}

function createEmptyHighlight(index) {
  return {
    title: '',
    description: '',
    icon: HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length],
  };
}

function createEmptyItinerary(index) {
  return {
    label: `Ngay ${index + 1}`,
    title: '',
    description: '',
  };
}

function ensureOverviewCards(cards = []) {
  return Array.from({ length: 3 }, (_, index) => ({
    ...createEmptyOverviewCard(),
    ...cards[index],
  }));
}

function ensureHighlights(items = []) {
  if (!items.length) {
    return [createEmptyHighlight(0)];
  }

  return items.map((item, index) => ({
    ...createEmptyHighlight(index),
    ...item,
  }));
}

function ensureItinerary(items = []) {
  if (!items.length) {
    return [createEmptyItinerary(0)];
  }

  return items.map((item, index) => ({
    ...createEmptyItinerary(index),
    ...item,
    label: item.label || `Ngay ${index + 1}`,
  }));
}

function normalizeArray(items) {
  return Array.isArray(items) ? items : [];
}

function buildInitialForm() {
  return {
    ...EMPTY_FORM,
    overviewCards: ensureOverviewCards(EMPTY_FORM.overviewCards),
    highlights: ensureHighlights(EMPTY_FORM.highlights),
    itinerary: ensureItinerary(EMPTY_FORM.itinerary),
  };
}

function mapTourToFormValues(tour) {
  return {
    ...EMPTY_FORM,
    name: tour.title || '',
    eyebrow: tour.tagline || '',
    badge: tour.badge || '',
    description: tour.description || '',
    location: tour.location || '',
    duration: tour.duration ? String(tour.duration) : '',
    groupSize: tour.maxPeople ? String(tour.maxPeople) : '',
    transport: tour.transport || '',
    status: tour.status || 'Draft',
    price: tour.price ? String(tour.price) : '',
    rating: tour.rating ? String(tour.rating) : '',
    reviews: tour.reviews ? String(tour.reviews) : '',
    season: tour.season || '',
    departureNote: tour.departureNote || '',
    departureSchedule: tour.departureSchedule || '',
    meetingPoint: tour.meetingPoint || '',
    curatorNote: tour.curatorNote || '',
    curatorName: tour.curatorName || '',
    includedItems: normalizeArray(tour.includes).length ? tour.includes : [''],
    promiseItems: normalizeArray(tour.promiseItems).length ? tour.promiseItems : [''],
    overviewCards: ensureOverviewCards(tour.overviewCards),
    highlights: ensureHighlights(tour.highlights),
    itinerary: ensureItinerary(tour.itinerary),
  };
}

export default function TourCreatePage() {
  const navigate = useNavigate();
  const { tourId } = useParams();
  const { adminToken } = useAdminAuth();
  const isEditMode = Boolean(tourId);
  const [formValues, setFormValues] = useState(buildInitialForm);
  const [imagePreview, setImagePreview] = useState(DEFAULT_IMAGE);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [uploadLabel, setUploadLabel] = useState('Dang dung anh mau he thong');
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingTour, setIsLoadingTour] = useState(isEditMode);
  const [saveMessage, setSaveMessage] = useState('');

  useDocumentTitle(isEditMode ? 'Chinh sua tour | ADN Travel Admin' : 'Tao tour moi | ADN Travel Admin');

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    let isMounted = true;

    const loadExistingTour = async () => {
      if (!isEditMode || !tourId) {
        return;
      }

      setIsLoadingTour(true);
      setSaveMessage('');

      try {
        const response = await getTourByIdRequest(tourId);

        if (!isMounted || !response.tour) {
          return;
        }

        setFormValues(mapTourToFormValues(response.tour));
        setExistingImageUrl(response.tour.imageUrl || '');
        setImagePreview(response.tour.imageUrl ? resolveTourImageUrl(response.tour.imageUrl) : DEFAULT_IMAGE);
        setUploadLabel(response.tour.imageUrl || 'Dang dung anh hien tai');
      } catch (error) {
        if (isMounted) {
          setSaveMessage(error.message || 'Khong the tai du lieu tour de chinh sua.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingTour(false);
        }
      }
    };

    loadExistingTour();

    return () => {
      isMounted = false;
    };
  }, [isEditMode, tourId]);

  const handleFieldChange = (field) => (event) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: event.target.value,
    }));
    setSaveMessage('');
  };

  const handleOverviewCardChange = (index, field) => (event) => {
    const nextValue = event.target.value;

    setFormValues((currentValues) => ({
      ...currentValues,
      overviewCards: currentValues.overviewCards.map((card, cardIndex) => (
        cardIndex === index ? { ...card, [field]: nextValue } : card
      )),
    }));
    setSaveMessage('');
  };

  const handleStringArrayChange = (field, index) => (event) => {
    const nextValue = event.target.value;

    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: currentValues[field].map((item, itemIndex) => (
        itemIndex === index ? nextValue : item
      )),
    }));
    setSaveMessage('');
  };

  const addStringArrayItem = (field) => () => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: [...normalizeArray(currentValues[field]), ''],
    }));
    setSaveMessage('');
  };

  const removeStringArrayItem = (field, index) => () => {
    setFormValues((currentValues) => {
      const nextItems = currentValues[field].filter((_, itemIndex) => itemIndex !== index);

      return {
        ...currentValues,
        [field]: nextItems.length ? nextItems : [''],
      };
    });
    setSaveMessage('');
  };

  const handleHighlightChange = (index, field) => (event) => {
    const nextValue = event.target.value;

    setFormValues((currentValues) => ({
      ...currentValues,
      highlights: currentValues.highlights.map((item, itemIndex) => (
        itemIndex === index ? { ...item, [field]: nextValue } : item
      )),
    }));
    setSaveMessage('');
  };

  const addHighlight = () => {
    setFormValues((currentValues) => ({
      ...currentValues,
      highlights: [...currentValues.highlights, createEmptyHighlight(currentValues.highlights.length)],
    }));
    setSaveMessage('');
  };

  const removeHighlight = (index) => () => {
    setFormValues((currentValues) => {
      const nextItems = currentValues.highlights.filter((_, itemIndex) => itemIndex !== index);

      return {
        ...currentValues,
        highlights: ensureHighlights(nextItems),
      };
    });
    setSaveMessage('');
  };

  const handleItineraryChange = (index, field) => (event) => {
    const nextValue = event.target.value;

    setFormValues((currentValues) => ({
      ...currentValues,
      itinerary: currentValues.itinerary.map((item, itemIndex) => (
        itemIndex === index ? { ...item, [field]: nextValue } : item
      )),
    }));
    setSaveMessage('');
  };

  const addItinerary = () => {
    setFormValues((currentValues) => ({
      ...currentValues,
      itinerary: [...currentValues.itinerary, createEmptyItinerary(currentValues.itinerary.length)],
    }));
    setSaveMessage('');
  };

  const removeItinerary = (index) => () => {
    setFormValues((currentValues) => {
      const nextItems = currentValues.itinerary.filter((_, itemIndex) => itemIndex !== index);

      return {
        ...currentValues,
        itinerary: ensureItinerary(nextItems),
      };
    });
    setSaveMessage('');
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImagePreview((currentPreview) => {
      if (currentPreview && currentPreview.startsWith('blob:')) {
        URL.revokeObjectURL(currentPreview);
      }

      return URL.createObjectURL(file);
    });
    setSelectedImageFile(file);
    setUploadLabel(file.name);
    setSaveMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!adminToken) {
      setSaveMessage('Phien dang nhap admin da het. Ban hay dang nhap lai de luu tour.');
      return;
    }

    const payload = {
      name: formValues.name,
      description: formValues.description,
      location: formValues.location,
      duration: formValues.duration,
      price: formValues.price,
      groupSize: formValues.groupSize,
      status: formValues.status,
      badge: formValues.badge,
      transport: formValues.transport,
      season: formValues.season,
      departureNote: formValues.departureNote,
      departureSchedule: formValues.departureSchedule,
      meetingPoint: formValues.meetingPoint,
      tagline: formValues.eyebrow,
      curatorNote: formValues.curatorNote,
      curatorName: formValues.curatorName,
      includedItems: normalizeArray(formValues.includedItems).filter(Boolean),
      promiseItems: normalizeArray(formValues.promiseItems).filter(Boolean),
      overviewCards: normalizeArray(formValues.overviewCards).filter(
        (item) => item?.title || item?.description,
      ),
      highlights: normalizeArray(formValues.highlights).filter(
        (item) => item?.title || item?.description,
      ),
      itinerary: normalizeArray(formValues.itinerary).filter(
        (item) => item?.title || item?.description,
      ),
      imageUrl: existingImageUrl,
    };

    setIsSaving(true);
    setSaveMessage('');

    try {
      if (isEditMode && tourId) {
        await updateTourRequest(tourId, payload, adminToken, selectedImageFile);
      } else {
        await createTourRequest(payload, adminToken, selectedImageFile);
      }

      navigate(ROUTES.tours);
    } catch (error) {
      setSaveMessage(error.message || (isEditMode ? 'Khong the cap nhat tour luc nay.' : 'Khong the luu tour luc nay.'));
    } finally {
      setIsSaving(false);
    }
  };

  const pricePreview = formValues.price ? `${formatCurrencyVnd(Number(formValues.price))}d` : 'Chua dat gia';
  const statusLabel = formValues.status === 'Active' ? 'Dang hoat dong' : 'Ban nhap';

  if (isLoadingTour) {
    return (
      <div className="admin-page-shell">
        <HeroSection
          title="Dang tai tour"
          description="He thong dang nap du lieu tour de ban chinh sua."
          actions={(
            <Button as={Link} to={ROUTES.tours} variant="secondary">
              Ve danh sach tour
            </Button>
          )}
        />
      </div>
    );
  }

  return (
    <div className="admin-page-shell">
      <HeroSection
        title={isEditMode ? 'Chinh sua tour' : 'Them tour moi'}
        description="Trang nay duoc dung theo nhip cua giao dien chi tiet tour ben ngoai, nhung toan bo noi dung co the sua truc tiep ngay tren bo cuc."
        actions={(
          <Button as={Link} to={ROUTES.tours} variant="secondary">
            Ve danh sach tour
          </Button>
        )}
      />

      <form onSubmit={handleSubmit}>
        <section className="tour-spotlight tour-spotlight--admin">
          <div className="tour-spotlight__container">
            <div className="tour-spotlight__hero">
              <div className="tour-spotlight__hero-copy">
                <div className="tour-spotlight__eyebrow-row">
                  <span className="tour-spotlight__eyebrow">
                    <input value={formValues.eyebrow} onChange={handleFieldChange('eyebrow')} className={pillInputClass} placeholder="Eyebrow" />
                  </span>
                  <span className="tour-spotlight__badge">
                    <select value={formValues.badge} onChange={handleFieldChange('badge')} className={pillSelectClass} aria-label="Chon badge cho tour">
                      <option value="">Khong gan badge</option>
                      {BADGE_OPTIONS.filter(Boolean).map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </span>
                </div>

                <input value={formValues.name} onChange={handleFieldChange('name')} className={headingInputClass} placeholder="Ten tour moi" />

                <textarea value={formValues.description} onChange={handleFieldChange('description')} className={richTextareaClass} placeholder="Mo ta dai cho phan hero. Goi y: neu cam xuc chu dao, kieu hanh trinh va vi sao tour nay dang chon." />

                <div className="tour-spotlight__meta">
                  <label className="tour-spotlight__meta-chip min-w-[220px] flex-1">
                    <span className="material-symbols-outlined">location_on</span>
                    <input value={formValues.location} onChange={handleFieldChange('location')} className={inlineInputClass} placeholder="Diem den" />
                  </label>

                  <label className="tour-spotlight__meta-chip min-w-[220px] flex-1">
                    <span className="material-symbols-outlined">schedule</span>
                    <input value={formValues.duration} onChange={handleFieldChange('duration')} className={inlineInputClass} placeholder="Thoi luong" />
                  </label>

                  <label className="tour-spotlight__meta-chip min-w-[220px] flex-1">
                    <span className="material-symbols-outlined">groups</span>
                    <input value={formValues.groupSize} onChange={handleFieldChange('groupSize')} className={inlineInputClass} placeholder="Quy mo nhom" />
                  </label>

                  <label className="tour-spotlight__meta-chip min-w-[220px] flex-1">
                    <span className="material-symbols-outlined">flight_takeoff</span>
                    <input value={formValues.transport} onChange={handleFieldChange('transport')} className={inlineInputClass} placeholder="Phuong tien" />
                  </label>
                </div>
              </div>

              <div className="tour-spotlight__hero-media">
                <img src={imagePreview} alt={formValues.name || 'Anh tour'} className="h-full w-full object-cover" />
                <div className="tour-spotlight__hero-glow" />
              </div>
            </div>

            <div className="tour-spotlight__stats">
              <article className="tour-spotlight__stat-card">
                <span className="tour-spotlight__stat-label">Gia tu</span>
                <input type="number" min="0" value={formValues.price} onChange={handleFieldChange('price')} className="mt-2 w-full border-none bg-transparent p-0 font-headline text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-[-0.04em] text-primary outline-none placeholder:text-slate-300" placeholder="0" />
                <span className="tour-spotlight__stat-helper">Moi khach. Hien hien thi: {pricePreview}</span>
              </article>

              <article className="tour-spotlight__stat-card">
                <span className="tour-spotlight__stat-label">Danh gia</span>
                <div className="mt-3 rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-sm text-slate-400">
                  <p className="font-semibold uppercase tracking-[0.08em] text-slate-300">Chua co du lieu</p>
                  <p className="mt-2 leading-6">Phan danh gia se de trong va chi hien thi sau khi tour co nhan xet thuc te tu khach hang.</p>
                </div>
              </article>

              <article className="tour-spotlight__stat-card">
                <span className="tour-spotlight__stat-label">Mua dep</span>
                <textarea value={formValues.season} onChange={handleFieldChange('season')} className="mt-2 min-h-[86px] w-full resize-none rounded-2xl border border-transparent bg-slate-50/80 px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary/25 focus:ring-2 focus:ring-primary/10" placeholder="Vi du: Thang 3 - thang 8" />
              </article>

              <article className="tour-spotlight__stat-card">
                <span className="tour-spotlight__stat-label">Khoi hanh</span>
                <textarea value={formValues.departureNote} onChange={handleFieldChange('departureNote')} className="mt-2 min-h-[86px] w-full resize-none rounded-2xl border border-transparent bg-slate-50/80 px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary/25 focus:ring-2 focus:ring-primary/10" placeholder="Ghi chu khoi hanh gan nhat" />
              </article>
            </div>

            <div className="tour-spotlight__body">
              <div className="tour-spotlight__main">
                <blockquote className="tour-spotlight__quote">
                  <textarea value={formValues.curatorNote} onChange={handleFieldChange('curatorNote')} className={quoteTextareaClass} placeholder="Ghi chu curator hoac loi dan noi bat cho tour..." />
                  <input value={formValues.curatorName} onChange={handleFieldChange('curatorName')} className="mt-4 w-full border-none bg-transparent p-0 text-sm font-bold uppercase tracking-[0.06em] text-primary outline-none placeholder:text-slate-400" placeholder="Ten curator / nguoi bien tap" />
                </blockquote>

                <section className="tour-spotlight__section">
                  <div className="tour-spotlight__section-head">
                    <h2>Chan dung cua chuyen di</h2>
                    <p>Nhung khoi noi dung cot loi duoc trinh bay giong trang chi tiet tour phia ngoai.</p>
                  </div>

                  <div className="tour-spotlight__overview-grid">
                    {formValues.overviewCards.map((card, index) => (
                      <article key={`overview-${index}`} className="tour-spotlight__overview-card">
                        <div className="tour-spotlight__card-icon">
                          <span className="material-symbols-outlined">{OVERVIEW_ICONS[index]}</span>
                        </div>
                        <input value={card.title} onChange={handleOverviewCardChange(index, 'title')} className="mt-4 w-full border-none bg-transparent p-0 font-headline text-[1.18rem] font-bold tracking-[-0.03em] text-on-surface outline-none placeholder:text-slate-400" placeholder={`Tieu de card ${index + 1}`} />
                        <textarea value={card.description} onChange={handleOverviewCardChange(index, 'description')} className={cardTextareaClass} placeholder={`Mo ta cho card ${index + 1}`} />
                      </article>
                    ))}

                    <article className="tour-spotlight__overview-card">
                      <div className="tour-spotlight__card-icon">
                        <span className="material-symbols-outlined">inventory_2</span>
                      </div>
                      <h3>Bao gom trong goi</h3>
                      <div className="mt-4 grid gap-3">
                        {formValues.includedItems.map((item, index) => (
                          <div key={`included-${index}`} className="flex items-center gap-3">
                            <input value={item} onChange={handleStringArrayChange('includedItems', index)} className={panelInputClass} placeholder={`Dich vu bao gom ${index + 1}`} />
                            <Button type="button" variant="outline" size="sm" onClick={removeStringArrayItem('includedItems', index)}>Xoa</Button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Button type="button" variant="secondary" size="sm" onClick={addStringArrayItem('includedItems')}>Them muc bao gom</Button>
                      </div>
                    </article>
                  </div>
                </section>

                <section className="tour-spotlight__section">
                  <div className="tour-spotlight__section-head">
                    <h2>Ly do hanh trinh nay duoc chon nhieu</h2>
                    <p>Phan nay tuong ung voi cac highlight card tren trang chi tiet tour public.</p>
                  </div>

                  <div className="mb-4">
                    <Button type="button" variant="secondary" size="sm" onClick={addHighlight}>Them diem nhan</Button>
                  </div>

                  <div className="tour-spotlight__highlights">
                    {formValues.highlights.map((highlight, index) => (
                      <article key={`highlight-${index}`} className="tour-spotlight__highlight-card">
                        <div className="tour-spotlight__highlight-icon">
                          <span className="material-symbols-outlined">{highlight.icon || HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length]}</span>
                        </div>
                        <div className="w-full">
                          <div className="flex items-center justify-between gap-3">
                            <input value={highlight.title} onChange={handleHighlightChange(index, 'title')} className="w-full border-none bg-transparent p-0 font-headline text-[1.18rem] font-bold tracking-[-0.03em] text-on-surface outline-none placeholder:text-slate-400" placeholder={`Tieu de diem nhan ${index + 1}`} />
                            <Button type="button" variant="outline" size="sm" onClick={removeHighlight(index)}>Xoa</Button>
                          </div>
                          <textarea value={highlight.description} onChange={handleHighlightChange(index, 'description')} className={`${richTextareaClass} mt-3`} placeholder={`Mo ta diem nhan ${index + 1}`} />
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="tour-spotlight__section">
                  <div className="tour-spotlight__section-head">
                    <h2>Nhip trai nghiem theo tung ngay</h2>
                    <p>Timeline duoc dung giong trang chi tiet tour va cho phep them hoac bot ngay ngay tren giao dien.</p>
                  </div>

                  <div className="mb-4">
                    <Button type="button" variant="secondary" size="sm" onClick={addItinerary}>Them lich trinh goi y</Button>
                  </div>

                  <div className="tour-spotlight__timeline">
                    {formValues.itinerary.map((item, index) => (
                      <article key={`itinerary-${index}`} className="tour-spotlight__timeline-item">
                        <div className="tour-spotlight__timeline-marker">
                          <span>{item.label || `Ngay ${index + 1}`}</span>
                        </div>

                        <div className="tour-spotlight__timeline-card">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <input value={item.title} onChange={handleItineraryChange(index, 'title')} className="w-full border-none bg-transparent p-0 font-headline text-[1.18rem] font-bold tracking-[-0.03em] text-on-surface outline-none placeholder:text-slate-400" placeholder={`Tieu de ngay ${index + 1}`} />
                            <Button type="button" variant="outline" size="sm" onClick={removeItinerary(index)}>Xoa</Button>
                          </div>

                          <input value={item.label} onChange={handleItineraryChange(index, 'label')} className={`${panelInputClass} mt-3`} placeholder={`Nhan ngay ${index + 1}`} />

                          <textarea value={item.description} onChange={handleItineraryChange(index, 'description')} className={`${richTextareaClass} mt-3`} placeholder={`Mo ta nhip trai nghiem ngay ${index + 1}`} />
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="tour-spotlight__aside">
                <div className="tour-spotlight__panel tour-spotlight__panel--accent">
                  <p className="tour-spotlight__panel-eyebrow">San sang cau hinh</p>
                  <h2 className="tour-spotlight__panel-title">Khoi van hanh theo kieu trang chi tiet tour</h2>
                  <p className="tour-spotlight__panel-copy">
                    Khu vuc nay mo phong panel ben phai cua trang chi tiet tour ngoai frontend, nhung cho phep ban nhap va chinh sua truc tiep.
                  </p>

                  <div className="tour-spotlight__upload">
                    <label className="tour-spotlight__upload-button" htmlFor="tour-cover-upload">
                      <div>
                        <span className="material-symbols-outlined">cloud_upload</span>
                        <strong>Doi anh cover</strong>
                        <p className="tour-spotlight__upload-hint">PNG, JPG hoac WebP</p>
                        <p className="tour-spotlight__upload-file" title={uploadLabel}>{uploadLabel}</p>
                      </div>
                    </label>
                    <input id="tour-cover-upload" type="file" accept="image/*" onChange={handleImageChange} />
                    <div className="tour-spotlight__upload-preview">
                      <img src={imagePreview} alt={formValues.name || 'Anh cover'} />
                    </div>
                  </div>

                  <div className="tour-spotlight__panel-price">
                    <div>
                      <span>Gia tham khao</span>
                      <strong>{pricePreview}</strong>
                    </div>
                    <em>{formValues.badge || statusLabel}</em>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <select value={formValues.status} onChange={handleFieldChange('status')} className={panelInputClass}>
                      <option value="Draft">Ban nhap</option>
                      <option value="Active">Dang hoat dong</option>
                      <option value="Closed">Da dong</option>
                    </select>

                    <textarea value={formValues.departureSchedule} onChange={handleFieldChange('departureSchedule')} className={compactTextareaClass} placeholder="Khoi hanh chi tiet" />

                    <textarea value={formValues.meetingPoint} onChange={handleFieldChange('meetingPoint')} className={compactTextareaClass} placeholder="Diem don / noi gap" />
                  </div>

                  <dl className="tour-spotlight__panel-meta">
                    <div>
                      <dt>Khoi hanh</dt>
                      <dd>{formValues.departureSchedule || 'Dang cap nhat'}</dd>
                    </div>
                    <div>
                      <dt>Diem don</dt>
                      <dd>{formValues.meetingPoint || 'Dang cap nhat'}</dd>
                    </div>
                    <div>
                      <dt>Nhom toi da</dt>
                      <dd>{formValues.groupSize || 'Dang cap nhat'}</dd>
                    </div>
                  </dl>

                  <div className="tour-spotlight__panel-divider" />

                  <p className="tour-spotlight__panel-eyebrow">Cam ket trai nghiem</p>
                  <div className="mt-4 grid gap-3">
                    {formValues.promiseItems.map((item, index) => (
                      <div key={`promise-${index}`} className="flex items-center gap-3">
                        <input value={item} onChange={handleStringArrayChange('promiseItems', index)} className={panelInputClass} placeholder={`Cam ket ${index + 1}`} />
                        <Button type="button" variant="outline" size="sm" onClick={removeStringArrayItem('promiseItems', index)}>Xoa</Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Button type="button" variant="secondary" size="sm" onClick={addStringArrayItem('promiseItems')}>Them cam ket</Button>
                  </div>

                  <div className="tour-spotlight__panel-actions">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? 'Dang luu...' : isEditMode ? 'Cap nhat tour' : 'Luu tour'}
                    </Button>
                    <Button as={Link} to={ROUTES.tours} variant="secondary">Quay lai danh sach</Button>
                  </div>

                  {saveMessage ? <div className="tour-spotlight__inline-note">{saveMessage}</div> : null}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
