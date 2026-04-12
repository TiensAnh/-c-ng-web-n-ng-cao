import { useEffect, useId, useState } from 'react';
import Button from './Button';
import { classNames } from '../utils/classNames';

const INITIAL_LOGIN_FORM = {
  email: '',
  password: '',
  rememberMe: false,
};

const INITIAL_REGISTER_FORM = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const MODAL_COPY = {
  login: {
    eyebrow: 'ADN Explorer Club',
    title: 'Chào mừng bạn quay trở lại',
    description:
      'Đăng nhập để quản lý hành trình, theo dõi đặt chỗ và nhận ưu đãi dành riêng cho thành viên ADN Travel.',
    benefits: [
      'Lưu lịch sử đặt tour và thông tin hành khách an toàn.',
      'Nhận thông báo ưu đãi sớm hơn và mã giảm giá theo mùa.',
      'Theo dõi trạng thái booking và yêu cầu hỗ trợ nhanh hơn.',
    ],
    heading: 'Đăng nhập tài khoản',
    subheading: 'Nhập email và mật khẩu để tiếp tục hành trình của bạn.',
    submitLabel: 'Đăng nhập',
    switchLabel: 'Chưa có tài khoản?',
    switchAction: 'Đăng ký ngay',
    successMessage:
      'Đăng nhập mẫu thành công. Bạn có thể nối API thật vào modal này ở bước tiếp theo.',
  },
  register: {
    eyebrow: 'Thành viên ADN Travel',
    title: 'Bắt đầu hành trình của riêng bạn',
    description:
      'Tạo tài khoản để lưu yêu thích, nhận ưu đãi độc quyền và kết nối với đội ngũ hỗ trợ của ADN Travel.',
    benefits: [
      'Nhận ưu đãi tân thủ và thông tin khuyến mại du lịch mới nhất.',
      'Đồng bộ thông tin đặt tour, hóa đơn và lịch sử thanh toán.',
      'Mở khóa không gian thành viên cho những chuyến đi cá nhân hóa.',
    ],
    heading: 'Tạo tài khoản mới',
    subheading: 'Điền thông tin cơ bản để ADN Travel giữ cho bạn những ưu đãi đẹp nhất.',
    submitLabel: 'Tạo tài khoản',
    switchLabel: 'Đã có tài khoản?',
    switchAction: 'Đăng nhập',
    successMessage:
      'Đăng ký mẫu thành công. Bạn chỉ cần kết nối API backend để lưu tài khoản thật.',
  },
};

function AuthModal({ isOpen, mode, onClose, onModeChange }) {
  const [loginForm, setLoginForm] = useState(INITIAL_LOGIN_FORM);
  const [registerForm, setRegisterForm] = useState(INITIAL_REGISTER_FORM);
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setFeedback(null);
    setIsSubmitting(false);
  }, [isOpen, mode]);

  if (!isOpen) {
    return null;
  }

  const activeCopy = MODAL_COPY[mode];

  const handleLoginChange = (event) => {
    const { name, type, checked, value } = event.target;
    setLoginForm((currentForm) => ({
      ...currentForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback(null);

    if (mode === 'register' && registerForm.password !== registerForm.confirmPassword) {
      setFeedback({
        type: 'error',
        message: 'Mật khẩu xác nhận chưa khớp. Vui lòng kiểm tra lại.',
      });
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 500);
    });

    setFeedback({
      type: 'success',
      message: activeCopy.successMessage,
    });
    setIsSubmitting(false);

    if (mode === 'login') {
      setLoginForm(INITIAL_LOGIN_FORM);
      return;
    }

    setRegisterForm(INITIAL_REGISTER_FORM);
  };

  const renderLoginForm = () => (
    <>
      <div className="auth-modal__field">
        <label htmlFor="auth-login-email">Email</label>
        <input
          autoComplete="email"
          autoFocus
          className="auth-modal__input"
          id="auth-login-email"
          name="email"
          placeholder="ban@email.com"
          required
          type="email"
          value={loginForm.email}
          onChange={handleLoginChange}
        />
      </div>

      <div className="auth-modal__field">
        <label htmlFor="auth-login-password">Mật khẩu</label>
        <input
          autoComplete="current-password"
          className="auth-modal__input"
          id="auth-login-password"
          name="password"
          placeholder="Nhập mật khẩu của bạn"
          required
          type="password"
          value={loginForm.password}
          onChange={handleLoginChange}
        />
      </div>

      <div className="auth-modal__row">
        <label className="auth-modal__checkbox" htmlFor="auth-remember-me">
          <input
            checked={loginForm.rememberMe}
            id="auth-remember-me"
            name="rememberMe"
            type="checkbox"
            onChange={handleLoginChange}
          />
          <span>Ghi nhớ đăng nhập</span>
        </label>

        <button className="auth-modal__link" type="button">
          Quên mật khẩu?
        </button>
      </div>
    </>
  );

  const renderRegisterForm = () => (
    <>
      <div className="auth-modal__grid">
        <div className="auth-modal__field">
          <label htmlFor="auth-register-name">Họ và tên</label>
          <input
            autoComplete="name"
            autoFocus
            className="auth-modal__input"
            id="auth-register-name"
            name="fullName"
            placeholder="Nguyen Van A"
            required
            type="text"
            value={registerForm.fullName}
            onChange={handleRegisterChange}
          />
        </div>

        <div className="auth-modal__field">
          <label htmlFor="auth-register-phone">Số điện thoại</label>
          <input
            autoComplete="tel"
            className="auth-modal__input"
            id="auth-register-phone"
            name="phone"
            placeholder="0901 234 567"
            required
            type="tel"
            value={registerForm.phone}
            onChange={handleRegisterChange}
          />
        </div>
      </div>

      <div className="auth-modal__field">
        <label htmlFor="auth-register-email">Email</label>
        <input
          autoComplete="email"
          className="auth-modal__input"
          id="auth-register-email"
          name="email"
          placeholder="ban@email.com"
          required
          type="email"
          value={registerForm.email}
          onChange={handleRegisterChange}
        />
      </div>

      <div className="auth-modal__grid">
        <div className="auth-modal__field">
          <label htmlFor="auth-register-password">Mật khẩu</label>
          <input
            autoComplete="new-password"
            className="auth-modal__input"
            id="auth-register-password"
            name="password"
            placeholder="Tối thiểu 8 ký tự"
            required
            type="password"
            value={registerForm.password}
            onChange={handleRegisterChange}
          />
        </div>

        <div className="auth-modal__field">
          <label htmlFor="auth-register-confirm">Xác nhận mật khẩu</label>
          <input
            autoComplete="new-password"
            className="auth-modal__input"
            id="auth-register-confirm"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            required
            type="password"
            value={registerForm.confirmPassword}
            onChange={handleRegisterChange}
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="auth-modal">
      <button
        aria-label="Đóng cửa sổ đăng nhập"
        className="auth-modal__backdrop"
        type="button"
        onClick={onClose}
      />

      <div
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-modal="true"
        className="auth-modal__dialog"
        role="dialog"
      >
        <aside className="auth-modal__panel">
          <span className="eyebrow eyebrow--hero auth-modal__eyebrow">{activeCopy.eyebrow}</span>
          <h2 className="auth-modal__panel-title">{activeCopy.title}</h2>
          <p className="auth-modal__panel-description">{activeCopy.description}</p>

          <div className="auth-modal__benefits">
            {activeCopy.benefits.map((benefit) => (
              <div key={benefit} className="auth-modal__benefit">
                <span className="material-symbols-outlined auth-modal__benefit-icon">luggage</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className="auth-modal__content">
          <button aria-label="Đóng modal" className="auth-modal__close" type="button" onClick={onClose}>
            <span aria-hidden="true">×</span>
          </button>

          <div className="auth-modal__tabs" role="tablist" aria-label="Lựa chọn xác thực">
            <button
              aria-selected={mode === 'login'}
              className={classNames('auth-modal__tab', mode === 'login' && 'auth-modal__tab--active')}
              role="tab"
              type="button"
              onClick={() => onModeChange('login')}
            >
              Đăng nhập
            </button>
            <button
              aria-selected={mode === 'register'}
              className={classNames('auth-modal__tab', mode === 'register' && 'auth-modal__tab--active')}
              role="tab"
              type="button"
              onClick={() => onModeChange('register')}
            >
              Đăng ký
            </button>
          </div>

          <div className="auth-modal__body">
            <p className="promo-chip">Travel account</p>
            <h3 className="auth-modal__title" id={titleId}>
              {activeCopy.heading}
            </h3>
            <p className="auth-modal__subtitle" id={descriptionId}>
              {activeCopy.subheading}
            </p>

            <form className="auth-modal__form" onSubmit={handleSubmit}>
              {mode === 'login' ? renderLoginForm() : renderRegisterForm()}

              {feedback ? (
                <p
                  className={classNames(
                    'auth-modal__feedback',
                    feedback.type === 'success'
                      ? 'auth-modal__feedback--success'
                      : 'auth-modal__feedback--error',
                  )}
                >
                  {feedback.message}
                </p>
              ) : null}

              <div className="auth-modal__actions">
                <Button className="auth-modal__submit" disabled={isSubmitting} type="submit">
                  {isSubmitting ? 'Đang xử lý...' : activeCopy.submitLabel}
                </Button>

                <p className="auth-modal__switch">
                  {activeCopy.switchLabel}{' '}
                  <button
                    className="auth-modal__link"
                    type="button"
                    onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
                  >
                    {activeCopy.switchAction}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AuthModal;
