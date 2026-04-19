import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../assets';
import Button from '../components/Button';
import HeroSection from '../components/HeroSection';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { ROUTES } from '../utils/routes';
import TourExperienceLayout from '../../shared/components/TourExperienceLayout';
import { formatCurrencyVnd } from '../../shared/utils/formatters';

const DEFAULT_IMAGE = images.tourHaLong;

const INITIAL_FORM = {
  name: '',
  location: '',
  duration: '',
  price: '',
  status: 'Draft',
  transport: '',
  groupSize: '',
  departure: '',
  tagline: '',
  description: '',
  includes: '',
  highlights: '',
  dayOne: '',
  dayTwo: '',
  dayThree: '',
};

function buildList(value, fallbackItems) {
  const items = value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length ? items : fallbackItems;
}

export default function TourCreatePage() {
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [imagePreview, setImagePreview] = useState(DEFAULT_IMAGE);
  const [uploadLabel, setUploadLabel] = useState('Chua co anh moi');
  const [saveMessage, setSaveMessage] = useState('');

  useDocumentTitle('Create Tour | The Horizon Admin');

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
    setUploadLabel(file.name);
    setSaveMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaveMessage('Ban nhap da duoc luu o giao dien preview. Ban co the noi API luu that o buoc tiep theo.');
  };

  const previewName = formValues.name.trim() || 'Ten tour moi dang cho ban dat';
  const previewLocation = formValues.location.trim() || 'Nhap khu vuc, thanh pho hoac cum diem den';
  const previewDuration = formValues.duration.trim() || 'Nhap tong thoi gian hanh trinh';
  const previewTransport = formValues.transport.trim() || 'Nhap cach di chuyen chinh';
  const previewGroupSize = formValues.groupSize.trim() || 'Tinh chinh suc chua cho nhom khach';
  const previewDeparture = formValues.departure.trim() || 'Them lich khoi hanh du kien';
  const previewDescription =
    formValues.description.trim() ||
    'Phan mo ta nay la ban xem truoc cua detail tour. Khi nhap thong tin o cot ben phai, khung nay se doi theo.';
  const previewTagline =
    formValues.tagline.trim() || 'Them mot tagline ngan de dinh hinh chat rieng cua san pham moi.';
  const previewPrice = formValues.price ? `${formatCurrencyVnd(Number(formValues.price))}d` : '0d';

  const includedItems = buildList(formValues.includes, [
    'Xe don tra hoac diem gap mat ro rang',
    'Lich trinh duoc canh chinh theo nhom khach muc tieu',
    'Cho cho phan upload anh va thong tin bo sung',
  ]);

  const highlightItems = buildList(formValues.highlights, [
    'Nhap moi diem nhan tren mot dong de ben trai cap nhat ngay',
    'Co the dung khu vuc nay de mo ta USP cua tour',
    'Khi co API, phan nay co the map vao highlights trong database',
  ]).map((item, index) => ({
    icon: index === 0 ? 'photo_camera' : index === 1 ? 'star' : 'inventory_2',
    title: `Diem nhan ${index + 1}`,
    description: item,
  }));

  const itinerary = [
    {
      label: 'Buoc 1',
      title: 'Mo dau hanh trinh',
      description:
        formValues.dayOne.trim() ||
        'Mo ta ngay dau tien, noi don khach, su kien mo man hoac diem cham dau tien.',
    },
    {
      label: 'Buoc 2',
      title: 'Khoi cao trai nghiem',
      description:
        formValues.dayTwo.trim() ||
        'Nhap hoat dong trung tam cua tour de xem block lich trinh cap nhat theo.',
    },
    {
      label: 'Buoc 3',
      title: 'Ket tour va gia tri de lai',
      description:
        formValues.dayThree.trim() ||
        'Day la noi mo ta diem dong hanh trinh, qua tang, bua an hoac call-to-action tiep theo.',
    },
  ];

  const aside = (
    <div className="tour-spotlight__panel">
      <p className="tour-spotlight__panel-eyebrow">Tour builder</p>
      <h2 className="tour-spotlight__panel-title">Nhap thong tin va upload anh</h2>
      <p className="tour-spotlight__panel-copy">
        Screen nay duoc dat cung bo cuc voi detail tour de ban vua nhap, vua xem truoc cach san pham
        se hien thi ra ngoai.
      </p>

      <div className="tour-spotlight__upload">
        <label className="tour-spotlight__upload-button" htmlFor="tour-cover-upload">
          <div>
            <span className="material-symbols-outlined">cloud_upload</span>
            <strong>Tai anh cover tour</strong>
            <p className="tour-spotlight__upload-hint">PNG, JPG hoac WebP.</p>
            <p className="tour-spotlight__upload-file" title={uploadLabel}>
              {uploadLabel}
            </p>
          </div>
        </label>
        <input id="tour-cover-upload" type="file" accept="image/*" onChange={handleImageChange} />
        <div className="tour-spotlight__upload-preview">
          <img src={imagePreview} alt={previewName} />
        </div>
      </div>

      <form className="tour-spotlight__form" onSubmit={handleSubmit}>
        <div className="tour-spotlight__field">
          <label htmlFor="tour-name">Ten tour</label>
          <input
            id="tour-name"
            name="name"
            placeholder="Vi du: Da Nang Skyline Escape"
            value={formValues.name}
            onChange={handleFieldChange('name')}
          />
        </div>

        <div className="tour-spotlight__field-grid">
          <label className="tour-spotlight__field" htmlFor="tour-location">
            <span>Dia diem</span>
            <input
              id="tour-location"
              name="location"
              placeholder="Da Nang, Hoi An"
              value={formValues.location}
              onChange={handleFieldChange('location')}
            />
          </label>

          <label className="tour-spotlight__field" htmlFor="tour-duration">
            <span>Thoi luong</span>
            <input
              id="tour-duration"
              name="duration"
              placeholder="4 ngay 3 dem"
              value={formValues.duration}
              onChange={handleFieldChange('duration')}
            />
          </label>
        </div>

        <div className="tour-spotlight__field-grid">
          <label className="tour-spotlight__field" htmlFor="tour-price">
            <span>Gia tour</span>
            <input
              id="tour-price"
              name="price"
              type="number"
              min="0"
              placeholder="6290000"
              value={formValues.price}
              onChange={handleFieldChange('price')}
            />
          </label>

          <label className="tour-spotlight__field" htmlFor="tour-status">
            <span>Trang thai</span>
            <select id="tour-status" name="status" value={formValues.status} onChange={handleFieldChange('status')}>
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
            </select>
          </label>
        </div>

        <div className="tour-spotlight__field-grid">
          <label className="tour-spotlight__field" htmlFor="tour-transport">
            <span>Di chuyen</span>
            <input
              id="tour-transport"
              name="transport"
              placeholder="May bay + xe dua don"
              value={formValues.transport}
              onChange={handleFieldChange('transport')}
            />
          </label>

          <label className="tour-spotlight__field" htmlFor="tour-group">
            <span>Suc chua</span>
            <input
              id="tour-group"
              name="groupSize"
              placeholder="Toi da 18 khach"
              value={formValues.groupSize}
              onChange={handleFieldChange('groupSize')}
            />
          </label>
        </div>

        <div className="tour-spotlight__field">
          <label htmlFor="tour-departure">Lich khoi hanh</label>
          <input
            id="tour-departure"
            name="departure"
            placeholder="Thu 6 hang tuan, khoi hanh tu TPHCM"
            value={formValues.departure}
            onChange={handleFieldChange('departure')}
          />
        </div>

        <div className="tour-spotlight__field">
          <label htmlFor="tour-tagline">Tagline</label>
          <input
            id="tour-tagline"
            name="tagline"
            placeholder="Mot cau ngan de tao chat rieng cho tour"
            value={formValues.tagline}
            onChange={handleFieldChange('tagline')}
          />
        </div>

        <label className="tour-spotlight__field" htmlFor="tour-description">
          <span>Mo ta tong quan</span>
          <textarea
            id="tour-description"
            name="description"
            placeholder="Mo ta dai hon ve trai nghiem, doi tuong phu hop, cam xuc chu dao..."
            value={formValues.description}
            onChange={handleFieldChange('description')}
          />
        </label>

        <label className="tour-spotlight__field" htmlFor="tour-includes">
          <span>Dich vu bao gom</span>
          <textarea
            id="tour-includes"
            name="includes"
            placeholder="Moi dong mot dich vu: xe dua don, bua sang, ve tham quan..."
            value={formValues.includes}
            onChange={handleFieldChange('includes')}
          />
          <span className="tour-spotlight__field-hint">Moi dong se thanh mot item trong block "Bao gom".</span>
        </label>

        <label className="tour-spotlight__field" htmlFor="tour-highlights">
          <span>Diem nhan</span>
          <textarea
            id="tour-highlights"
            name="highlights"
            placeholder="Moi dong mot diem nhan de hien thi thanh card preview."
            value={formValues.highlights}
            onChange={handleFieldChange('highlights')}
          />
        </label>

        <div className="tour-spotlight__field-grid">
          <label className="tour-spotlight__field" htmlFor="tour-day-1">
            <span>Ngay 1</span>
            <textarea
              id="tour-day-1"
              name="dayOne"
              placeholder="Mo ta buoc mo dau"
              value={formValues.dayOne}
              onChange={handleFieldChange('dayOne')}
            />
          </label>

          <label className="tour-spotlight__field" htmlFor="tour-day-2">
            <span>Ngay 2</span>
            <textarea
              id="tour-day-2"
              name="dayTwo"
              placeholder="Mo ta phan cao trao"
              value={formValues.dayTwo}
              onChange={handleFieldChange('dayTwo')}
            />
          </label>
        </div>

        <label className="tour-spotlight__field" htmlFor="tour-day-3">
          <span>Ngay 3</span>
          <textarea
            id="tour-day-3"
            name="dayThree"
            placeholder="Mo ta phan ket tour"
            value={formValues.dayThree}
            onChange={handleFieldChange('dayThree')}
          />
        </label>

        {saveMessage ? <div className="tour-spotlight__inline-note">{saveMessage}</div> : null}

        <div className="tour-spotlight__panel-actions">
          <Button type="submit" icon="check">
            Luu ban nhap
          </Button>
          <Button as={Link} to={ROUTES.tours} variant="secondary">
            Quay lai danh sach
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="admin-page-shell">
      <HeroSection
        title="Tao tour moi"
        description="Mot screen mo rong de ban vua nhap noi dung, vua xem truoc chi tiet tour ngay trong admin."
        actions={
          <Button as={Link} to={ROUTES.tours} variant="secondary">
            Ve trang tours
          </Button>
        }
      />

      <TourExperienceLayout
        actions={
          <Button as={Link} to={ROUTES.tours} variant="secondary">
            Quay lai bang quan ly
          </Button>
        }
        aside={aside}
        badge={formValues.status}
        description={previewDescription}
        eyebrow="Tour draft preview"
        heroAlt={previewName}
        heroImage={imagePreview}
        highlights={highlightItems}
        highlightsTitle="Diem nhan dang duoc dinh hinh"
        itinerary={itinerary}
        itineraryTitle="Phac thao hanh trinh"
        meta={[
          { icon: 'location_on', label: previewLocation },
          { icon: 'schedule', label: previewDuration },
          { icon: 'groups', label: previewGroupSize },
          { icon: 'flight_takeoff', label: previewTransport },
        ]}
        overviewCards={[
          {
            icon: 'auto_awesome',
            title: 'Tagline san pham',
            description: previewTagline,
          },
          {
            icon: 'payments',
            title: 'Gia dang preview',
            description: `Screen dang hien gia de xuat: ${previewPrice}. Khi noi API, day co the map vao schema tours.`,
          },
          {
            icon: 'inventory_2',
            title: 'Nhung gi khach nhan duoc',
            items: includedItems,
          },
          {
            icon: 'edit_square',
            title: 'Trang thai draft',
            description:
              formValues.status === 'Active'
                ? 'Ban dang de trang thai Active. Neu day la du lieu that, tour co the du dieu kien xuat ban.'
                : 'Tour dang o che do Draft, phu hop de nhap noi dung, kiem duyet va bo sung anh.',
          },
        ]}
        overviewDescription="Khung preview nay duoc thiet ke cung phong cach voi chi tiet tour public, nhung duoc buoc vao form ben phai de admin chinh tren mot man hinh."
        overviewTitle="Preview dang song"
        quote="Ban dang nhin mot man hinh chung cho ca logic quan tri va giao dien public. Khi thong tin thay doi, preview ben trai se thay doi theo."
        quoteAuthor="Admin tour builder"
        stats={[
          { label: 'Gia de xuat', value: previewPrice, helper: 'auto format o preview' },
          { label: 'Trang thai', value: formValues.status, helper: 'ban nhap hien tai' },
          { label: 'Khoi hanh', value: previewDeparture, helper: 'lich mo ta tu do' },
          { label: 'Suc chua', value: previewGroupSize, helper: 'gioi han nhom' },
        ]}
        theme="admin"
        title={previewName}
      />
    </div>
  );
}
