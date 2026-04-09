import { useState } from 'react';
import Button from '../common/Button';
import '../../styles/booking-form.css';

function BookingForm({ tour, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    num_people: 1,
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    note: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'num_people' ? parseInt(value) : value,
    }));
    // Clear error khi user thay đổi
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.contact_name.trim()) newErrors.contact_name = 'Tên khách hàng không được trống';
    if (!formData.contact_phone.trim()) newErrors.contact_phone = 'Số điện thoại không được trống';
    if (!/^[\d\s\-\+]+$/.test(formData.contact_phone) || formData.contact_phone.length < 9) {
      newErrors.contact_phone = 'Số điện thoại không hợp lệ';
    }
    if (!formData.contact_email.trim()) newErrors.contact_email = 'Email không được trống';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
      newErrors.contact_email = 'Email không hợp lệ';
    }
    if (formData.num_people < 1) newErrors.num_people = 'Số lượng khách tối thiểu 1';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await onSubmit({
      tour_id: tour.id,
      ...formData,
    });

    setSuccess('Đặt tour thành công!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const total = tour.price * formData.num_people;

  return (
    <div className="booking-form-wrapper">
      <div className="booking-form-container">
        <h2 className="booking-form__title">Đặt tour ngay</h2>

        {success && <div className="booking-form__success">{success}</div>}

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="booking-form__row">
            <div className="booking-form__group">
              <label htmlFor="num_people">Số lượng khách *</label>
              <input
                id="num_people"
                type="number"
                name="num_people"
                min="1"
                max="100"
                value={formData.num_people}
                onChange={handleChange}
                className={errors.num_people ? 'booking-form__input--error' : ''}
              />
              {errors.num_people && <span className="booking-form__error">{errors.num_people}</span>}
            </div>

            <div className="booking-form__price-info">
              <span>Giá/người:</span>
              <strong className="booking-form__price">
                {tour.price.toLocaleString('vi-VN')} đ
              </strong>
            </div>
          </div>

          <div className="booking-form__group">
            <label htmlFor="contact_name">Tên khách hàng *</label>
            <input
              id="contact_name"
              type="text"
              name="contact_name"
              placeholder="Nhập tên đầy đủ"
              value={formData.contact_name}
              onChange={handleChange}
              className={errors.contact_name ? 'booking-form__input--error' : ''}
            />
            {errors.contact_name && <span className="booking-form__error">{errors.contact_name}</span>}
          </div>

          <div className="booking-form__row">
            <div className="booking-form__group">
              <label htmlFor="contact_phone">Số điện thoại *</label>
              <input
                id="contact_phone"
                type="tel"
                name="contact_phone"
                placeholder="0987..."
                value={formData.contact_phone}
                onChange={handleChange}
                className={errors.contact_phone ? 'booking-form__input--error' : ''}
              />
              {errors.contact_phone && <span className="booking-form__error">{errors.contact_phone}</span>}
            </div>

            <div className="booking-form__group">
              <label htmlFor="contact_email">Email *</label>
              <input
                id="contact_email"
                type="email"
                name="contact_email"
                placeholder="email@example.com"
                value={formData.contact_email}
                onChange={handleChange}
                className={errors.contact_email ? 'booking-form__input--error' : ''}
              />
              {errors.contact_email && <span className="booking-form__error">{errors.contact_email}</span>}
            </div>
          </div>

          <div className="booking-form__group">
            <label htmlFor="note">Ghi chú</label>
            <textarea
              id="note"
              name="note"
              placeholder="Yêu cầu đặc biệt, thông tin thêm..."
              rows="4"
              value={formData.note}
              onChange={handleChange}
            />
          </div>

          <div className="booking-form__summary">
            <div className="booking-form__summary-row">
              <span>Giá/người:</span>
              <strong>{tour.price.toLocaleString('vi-VN')} đ</strong>
            </div>
            <div className="booking-form__summary-row">
              <span>Số lượng:</span>
              <strong>{formData.num_people} người</strong>
            </div>
            <div className="booking-form__summary-row booking-form__summary-row--total">
              <span>Tổng cộng:</span>
              <strong className="booking-form__total">{total.toLocaleString('vi-VN')} đ</strong>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="booking-form__button">
            {isLoading ? 'Đang xử lý...' : 'Xác nhận đặt tour'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
