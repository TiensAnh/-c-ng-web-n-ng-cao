import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { images } from '../assets';
import Button from '../components/Button';
import HeroSection from '../components/HeroSection';
import { useAdminAuth } from '../context/AdminAuthContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { createTourRequest } from '../services/toursService';
import { ROUTES } from '../utils/routes';
import { formatCurrencyVnd } from '../../shared/utils/formatters';

const DEFAULT_IMAGE = images.tourHaLong;
const OVERVIEW_ICONS = ['bed', 'explore', 'restaurant'];
const HIGHLIGHT_ICONS = ['landscape', 'beach_access', 'nightlife', 'photo_camera', 'hiking'];
const BADGE_OPTIONS = ['', 'Bán chạy', 'Mới', 'Khám phá', 'Tinh tuyển', 'Ưu đãi', 'Giảm giá'];

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
    { label: 'Ngày 1', title: '', description: '' },
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
const ghostTextareaClass =
  'w-full resize-none border-none bg-transparent p-0 text-sm leading-7 text-slate-600 outline-none placeholder:text-slate-400 focus:outline-none';
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
    label: `Ngày ${index + 1}`,
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
    label: item.label || `Ngày ${index + 1}`,
  }));
}

function normalizeArray(items) {
  return Array.isArray(items) ? items : [];
}

export default function TourCreatePage() {
  const navigate = useNavigate();
  const { adminToken } = useAdminAuth();
  const [formValues, setFormValues] = useState({
    ...EMPTY_FORM,
    overviewCards: ensureOverviewCards(EMPTY_FORM.overviewCards),
    highlights: ensureHighlights(EMPTY_FORM.highlights),
    itinerary: ensureItinerary(EMPTY_FORM.itinerary),
  });
  const [imagePreview, setImagePreview] = useState(DEFAULT_IMAGE);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [uploadLabel, setUploadLabel] = useState('Đang dùng ảnh mẫu hệ thống');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useDocumentTitle('Tạo tour mới | ADN Travel Admin');

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
      setSaveMessage('Phiên đăng nhập admin đã hết. Bạn hãy đăng nhập lại để lưu tour.');
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
      imageUrl: '',
    };

    setIsSaving(true);
    setSaveMessage('');

    try {
      await createTourRequest(payload, adminToken, selectedImageFile);
      navigate(ROUTES.tours);
    } catch (error) {
      setSaveMessage(error.message || 'Không thể lưu tour lúc này.');
    } finally {
      setIsSaving(false);
    }
  };

  const pricePreview = formValues.price ? `${formatCurrencyVnd(Number(formValues.price))}đ` : 'Chưa đặt giá';
  const statusLabel = formValues.status === 'Active' ? 'Đang hoạt động' : 'Bản nháp';

  return (
    <div className="admin-page-shell">
      <HeroSection
        title="Thêm tour mới"
        description="Trang này được dựng theo nhịp của giao diện chi tiết tour bên ngoài, nhưng toàn bộ nội dung có thể sửa trực tiếp ngay trên bố cục."
        actions={
          <Button as={Link} to={ROUTES.tours} variant="secondary">
            Về danh sách tour
          </Button>
        }
      />

      <form onSubmit={handleSubmit}>
        <section className="tour-spotlight tour-spotlight--admin">
          <div className="tour-spotlight__container">
            <div className="tour-spotlight__hero">
              <div className="tour-spotlight__hero-copy">
                <div className="tour-spotlight__eyebrow-row">
                  <span className="tour-spotlight__eyebrow">
                    <input
                      value={formValues.eyebrow}
                      onChange={handleFieldChange('eyebrow')}
                      className={pillInputClass}
                      placeholder="Eyebrow"
                    />
                  </span>
                  <span className="tour-spotlight__badge">
                    <select
                      value={formValues.badge}
                      onChange={handleFieldChange('badge')}
                      className={pillSelectClass}
                      aria-label="Chọn badge cho tour"
                    >
                      <option value="">Không gắn badge</option>
                      {BADGE_OPTIONS.filter(Boolean).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </span>
                </div>

                <input
                  value={formValues.name}
                  onChange={handleFieldChange('name')}
                  className={headingInputClass}
                  placeholder="Tên tour mới"
                />

                <textarea
                  value={formValues.description}
                  onChange={handleFieldChange('description')}
                  className={richTextareaClass}
                  placeholder="Mô tả dài cho phần hero. Gợi ý: nêu cảm xúc chủ đạo, kiểu hành trình và vì sao tour này đáng chọn."
                />

                <div className="tour-spotlight__meta">
                  <label className="tour-spotlight__meta-chip min-w-[220px] flex-1">
                    <span className="material-symbols-outlined">location_on</span>
                    <input
                      value={formValues.location}
                      onChange={handleFieldChange('location')}
                      className={inlineInputClass}
                      placeholder="Điểm đến"
                    />
                  </label>

                  <label className="tour-spotlight__meta-chip min-w-[220px] flex-1">
                    <span className="material-symbols-outlined">schedule</span>
                    <input
                      value={formValues.duration}
                      onChange={handleFieldChange('duration')}
                      className={inlineInputClass}
                      placeholder="Thời lượng"
                    />
                  </label>

                  <label className="tour-spotlight__meta-chip min-w-[220px] flex-1">
                    <span className="material-symbols-outlined">groups</span>
                    <input
                      value={formValues.groupSize}
                      onChange={handleFieldChange('groupSize')}
                      className={inlineInputClass}
                      placeholder="Quy mô nhóm"
                    />
                  </label>

                  <label className="tour-spotlight__meta-chip min-w-[220px] flex-1">
                    <span className="material-symbols-outlined">flight_takeoff</span>
                    <input
                      value={formValues.transport}
                      onChange={handleFieldChange('transport')}
                      className={inlineInputClass}
                      placeholder="Phương tiện"
                    />
                  </label>
                </div>
              </div>

              <div className="tour-spotlight__hero-media">
                <img src={imagePreview} alt={formValues.name || 'Ảnh tour'} />
                <div className="tour-spotlight__hero-glow" />
              </div>
            </div>

            <div className="tour-spotlight__stats">
              <article className="tour-spotlight__stat-card">
                <span className="tour-spotlight__stat-label">Giá từ</span>
                <input
                  type="number"
                  min="0"
                  value={formValues.price}
                  onChange={handleFieldChange('price')}
                  className="mt-2 w-full border-none bg-transparent p-0 font-headline text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-[-0.04em] text-primary outline-none placeholder:text-slate-300"
                  placeholder="0"
                />
                <span className="tour-spotlight__stat-helper">Mỗi khách. Hiện hiển thị: {pricePreview}</span>
              </article>

              <article className="tour-spotlight__stat-card">
                <span className="tour-spotlight__stat-label">Đánh giá</span>
                <div className="mt-3 rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-sm text-slate-400">
                  <p className="font-semibold uppercase tracking-[0.08em] text-slate-300">Chưa có dữ liệu</p>
                  <p className="mt-2 leading-6">Phần đánh giá sẽ để trống và chỉ hiển thị sau khi tour có nhận xét thực tế từ khách hàng.</p>
                </div>
              </article>

              <article className="tour-spotlight__stat-card">
                <span className="tour-spotlight__stat-label">Mùa đẹp</span>
                <textarea
                  value={formValues.season}
                  onChange={handleFieldChange('season')}
                  className="mt-2 min-h-[86px] w-full resize-none rounded-2xl border border-transparent bg-slate-50/80 px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary/25 focus:ring-2 focus:ring-primary/10"
                  placeholder="Ví dụ: Tháng 3 - tháng 8"
                />
              </article>

              <article className="tour-spotlight__stat-card">
                <span className="tour-spotlight__stat-label">Khởi hành</span>
                <textarea
                  value={formValues.departureNote}
                  onChange={handleFieldChange('departureNote')}
                  className="mt-2 min-h-[86px] w-full resize-none rounded-2xl border border-transparent bg-slate-50/80 px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary/25 focus:ring-2 focus:ring-primary/10"
                  placeholder="Ghi chú khởi hành gần nhất"
                />
              </article>
            </div>

            <div className="tour-spotlight__body">
              <div className="tour-spotlight__main">
                <blockquote className="tour-spotlight__quote">
                  <textarea
                    value={formValues.curatorNote}
                    onChange={handleFieldChange('curatorNote')}
                    className={quoteTextareaClass}
                    placeholder="Ghi chú curator hoặc lời dẫn nổi bật cho tour..."
                  />
                  <input
                    value={formValues.curatorName}
                    onChange={handleFieldChange('curatorName')}
                    className="mt-4 w-full border-none bg-transparent p-0 text-sm font-bold uppercase tracking-[0.06em] text-primary outline-none placeholder:text-slate-400"
                    placeholder="Tên curator / người biên tập"
                  />
                </blockquote>

                <section className="tour-spotlight__section">
                  <div className="tour-spotlight__section-head">
                    <h2>Chân dung của chuyến đi</h2>
                    <p>Những khối nội dung cốt lõi được trình bày giống trang chi tiết tour phía ngoài.</p>
                  </div>

                  <div className="tour-spotlight__overview-grid">
                    {formValues.overviewCards.map((card, index) => (
                      <article key={`overview-${index}`} className="tour-spotlight__overview-card">
                        <div className="tour-spotlight__card-icon">
                          <span className="material-symbols-outlined">{OVERVIEW_ICONS[index]}</span>
                        </div>
                        <input
                          value={card.title}
                          onChange={handleOverviewCardChange(index, 'title')}
                          className="mt-4 w-full border-none bg-transparent p-0 font-headline text-[1.18rem] font-bold tracking-[-0.03em] text-on-surface outline-none placeholder:text-slate-400"
                          placeholder={`Tiêu đề card ${index + 1}`}
                        />
                        <textarea
                          value={card.description}
                          onChange={handleOverviewCardChange(index, 'description')}
                          className={cardTextareaClass}
                          placeholder={`Mô tả cho card ${index + 1}`}
                        />
                      </article>
                    ))}

                    <article className="tour-spotlight__overview-card">
                      <div className="tour-spotlight__card-icon">
                        <span className="material-symbols-outlined">inventory_2</span>
                      </div>
                      <h3>Bao gồm trong gói</h3>
                      <div className="mt-4 grid gap-3">
                        {formValues.includedItems.map((item, index) => (
                          <div key={`included-${index}`} className="flex items-center gap-3">
                            <input
                              value={item}
                              onChange={handleStringArrayChange('includedItems', index)}
                              className={panelInputClass}
                              placeholder={`Dịch vụ bao gồm ${index + 1}`}
                            />
                            <Button type="button" variant="outline" size="sm" onClick={removeStringArrayItem('includedItems', index)}>
                              Xóa
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Button type="button" variant="secondary" size="sm" onClick={addStringArrayItem('includedItems')}>
                          Thêm mục bao gồm
                        </Button>
                      </div>
                    </article>
                  </div>
                </section>

                <section className="tour-spotlight__section">
                  <div className="tour-spotlight__section-head">
                    <h2>Lý do hành trình này được chọn nhiều</h2>
                    <p>Phần này tương ứng với các highlight card trên trang chi tiết tour public.</p>
                  </div>

                  <div className="mb-4">
                    <Button type="button" variant="secondary" size="sm" onClick={addHighlight}>
                      Thêm điểm nhấn
                    </Button>
                  </div>

                  <div className="tour-spotlight__highlights">
                    {formValues.highlights.map((highlight, index) => (
                      <article key={`highlight-${index}`} className="tour-spotlight__highlight-card">
                        <div className="tour-spotlight__highlight-icon">
                          <span className="material-symbols-outlined">
                            {highlight.icon || HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length]}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="flex items-center justify-between gap-3">
                            <input
                              value={highlight.title}
                              onChange={handleHighlightChange(index, 'title')}
                              className="w-full border-none bg-transparent p-0 font-headline text-[1.18rem] font-bold tracking-[-0.03em] text-on-surface outline-none placeholder:text-slate-400"
                              placeholder={`Tiêu đề điểm nhấn ${index + 1}`}
                            />
                            <Button type="button" variant="outline" size="sm" onClick={removeHighlight(index)}>
                              Xóa
                            </Button>
                          </div>
                          <textarea
                            value={highlight.description}
                            onChange={handleHighlightChange(index, 'description')}
                            className={`${richTextareaClass} mt-3`}
                            placeholder={`Mô tả điểm nhấn ${index + 1}`}
                          />
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="tour-spotlight__section">
                  <div className="tour-spotlight__section-head">
                    <h2>Nhịp trải nghiệm theo từng ngày</h2>
                    <p>Timeline được dựng giống trang chi tiết tour và cho phép thêm hoặc bớt ngày ngay trên giao diện.</p>
                  </div>

                  <div className="mb-4">
                    <Button type="button" variant="secondary" size="sm" onClick={addItinerary}>
                      Thêm lịch trình gợi ý
                    </Button>
                  </div>

                  <div className="tour-spotlight__timeline">
                    {formValues.itinerary.map((item, index) => (
                      <article key={`itinerary-${index}`} className="tour-spotlight__timeline-item">
                        <div className="tour-spotlight__timeline-marker">
                          <span>{item.label || `Ngày ${index + 1}`}</span>
                        </div>

                        <div className="tour-spotlight__timeline-card">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <input
                              value={item.title}
                              onChange={handleItineraryChange(index, 'title')}
                              className="w-full border-none bg-transparent p-0 font-headline text-[1.18rem] font-bold tracking-[-0.03em] text-on-surface outline-none placeholder:text-slate-400"
                              placeholder={`Tiêu đề ngày ${index + 1}`}
                            />
                            <Button type="button" variant="outline" size="sm" onClick={removeItinerary(index)}>
                              Xóa
                            </Button>
                          </div>

                          <input
                            value={item.label}
                            onChange={handleItineraryChange(index, 'label')}
                            className={`${panelInputClass} mt-3`}
                            placeholder={`Nhãn ngày ${index + 1}`}
                          />

                          <textarea
                            value={item.description}
                            onChange={handleItineraryChange(index, 'description')}
                            className={`${richTextareaClass} mt-3`}
                            placeholder={`Mô tả nhịp trải nghiệm ngày ${index + 1}`}
                          />
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="tour-spotlight__aside">
                <div className="tour-spotlight__panel tour-spotlight__panel--accent">
                  <p className="tour-spotlight__panel-eyebrow">Sẵn sàng cấu hình</p>
                  <h2 className="tour-spotlight__panel-title">Khối vận hành theo kiểu trang chi tiết tour</h2>
                  <p className="tour-spotlight__panel-copy">
                    Khu vực này mô phỏng panel bên phải của trang chi tiết tour ngoài frontend, nhưng cho phép bạn nhập và chỉnh sửa trực tiếp.
                  </p>

                  <div className="tour-spotlight__upload">
                    <label className="tour-spotlight__upload-button" htmlFor="tour-cover-upload">
                      <div>
                        <span className="material-symbols-outlined">cloud_upload</span>
                        <strong>Đổi ảnh cover</strong>
                        <p className="tour-spotlight__upload-hint">PNG, JPG hoặc WebP</p>
                        <p className="tour-spotlight__upload-file" title={uploadLabel}>
                          {uploadLabel}
                        </p>
                      </div>
                    </label>
                    <input id="tour-cover-upload" type="file" accept="image/*" onChange={handleImageChange} />
                    <div className="tour-spotlight__upload-preview">
                      <img src={imagePreview} alt={formValues.name || 'Ảnh cover'} />
                    </div>
                  </div>

                  <div className="tour-spotlight__panel-price">
                    <div>
                      <span>Giá tham khảo</span>
                      <strong>{pricePreview}</strong>
                    </div>
                    <em>{formValues.badge || statusLabel}</em>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <select
                      value={formValues.status}
                      onChange={handleFieldChange('status')}
                      className={panelInputClass}
                    >
                      <option value="Draft">Bản nháp</option>
                      <option value="Active">Đang hoạt động</option>
                    </select>

                    <textarea
                      value={formValues.departureSchedule}
                      onChange={handleFieldChange('departureSchedule')}
                      className={compactTextareaClass}
                      placeholder="Khởi hành chi tiết"
                    />

                    <textarea
                      value={formValues.meetingPoint}
                      onChange={handleFieldChange('meetingPoint')}
                      className={compactTextareaClass}
                      placeholder="Điểm đón / nơi gặp"
                    />
                  </div>

                  <dl className="tour-spotlight__panel-meta">
                    <div>
                      <dt>Khởi hành</dt>
                      <dd>{formValues.departureSchedule || 'Đang cập nhật'}</dd>
                    </div>
                    <div>
                      <dt>Điểm đón</dt>
                      <dd>{formValues.meetingPoint || 'Đang cập nhật'}</dd>
                    </div>
                    <div>
                      <dt>Nhóm tối đa</dt>
                      <dd>{formValues.groupSize || 'Đang cập nhật'}</dd>
                    </div>
                  </dl>

                  <div className="tour-spotlight__panel-divider" />

                  <p className="tour-spotlight__panel-eyebrow">Cam kết trải nghiệm</p>
                  <div className="mt-4 grid gap-3">
                    {formValues.promiseItems.map((item, index) => (
                      <div key={`promise-${index}`} className="flex items-center gap-3">
                        <input
                          value={item}
                          onChange={handleStringArrayChange('promiseItems', index)}
                          className={panelInputClass}
                          placeholder={`Cam kết ${index + 1}`}
                        />
                        <Button type="button" variant="outline" size="sm" onClick={removeStringArrayItem('promiseItems', index)}>
                          Xóa
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Button type="button" variant="secondary" size="sm" onClick={addStringArrayItem('promiseItems')}>
                      Thêm cam kết
                    </Button>
                  </div>

                  <div className="tour-spotlight__panel-actions">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? 'Đang lưu...' : 'Lưu tour'}
                    </Button>
                    <Button as={Link} to={ROUTES.tours} variant="secondary">
                      Quay lại danh sách
                    </Button>
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
