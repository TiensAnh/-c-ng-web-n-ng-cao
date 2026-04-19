import { useEffect, useId, useRef, useState } from 'react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
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
    title: 'Chao mung ban quay tro lai',
    description:
      'Dang nhap de quan ly hanh trinh, theo doi dat cho va nhan uu dai danh rieng cho thanh vien ADN Travel.',
    benefits: [
      'Luu lich su dat tour va thong tin hanh khach an toan.',
      'Nhan thong bao uu dai som hon va ma giam gia theo mua.',
      'Theo doi trang thai booking va gui yeu cau ho tro nhanh hon.',
    ],
    heading: 'Dang nhap tai khoan',
    subheading: 'Nhap email va mat khau de tiep tuc hanh trinh cua ban.',
    submitLabel: 'Dang nhap',
    switchLabel: 'Chua co tai khoan?',
    switchAction: 'Dang ky ngay',
  },
  register: {
    eyebrow: 'Thanh vien ADN Travel',
    title: 'Bat dau hanh trinh cua rieng ban',
    description:
      'Tao tai khoan de luu yeu thich, nhan uu dai doc quyen va ket noi voi doi ngu ho tro cua ADN Travel.',
    benefits: [
      'Nhan uu dai tan thu va thong tin khuyen mai du lich moi nhat.',
      'Dong bo thong tin dat tour, hoa don va lich su thanh toan.',
      'Mo khoa khong gian thanh vien cho nhung chuyen di ca nhan hoa.',
    ],
    heading: 'Tao tai khoan moi',
    subheading: 'Dien thong tin co ban de ADN Travel giu cho ban nhung uu dai dep nhat.',
    submitLabel: 'Tao tai khoan',
    switchLabel: 'Da co tai khoan?',
    switchAction: 'Dang nhap',
  },
};

function AuthModal({ isOpen, mode, onClose, onModeChange, onSuccess }) {
  const { login, register } = useAuth();
  const [loginForm, setLoginForm] = useState(INITIAL_LOGIN_FORM);
  const [registerForm, setRegisterForm] = useState(INITIAL_REGISTER_FORM);
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeTimeoutRef = useRef(null);
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
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

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
        message: 'Mat khau xac nhan chua khop. Vui long kiem tra lai.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = mode === 'login'
        ? await login(
          {
            email: loginForm.email,
            password: loginForm.password,
          },
          { rememberMe: loginForm.rememberMe },
        )
        : await register({
          fullName: registerForm.fullName,
          email: registerForm.email,
          phone: registerForm.phone,
          password: registerForm.password,
          confirmPassword: registerForm.confirmPassword,
        });

      setFeedback({
        type: 'success',
        message: response.message || (mode === 'login' ? 'Dang nhap thanh cong.' : 'Dang ky thanh cong.'),
      });

      setLoginForm(INITIAL_LOGIN_FORM);
      setRegisterForm(INITIAL_REGISTER_FORM);

      closeTimeoutRef.current = window.setTimeout(() => {
        onSuccess?.(response);
        onClose();
      }, 700);
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Khong the xu ly yeu cau luc nay.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <label htmlFor="auth-login-password">Mat khau</label>
        <input
          autoComplete="current-password"
          className="auth-modal__input"
          id="auth-login-password"
          name="password"
          placeholder="Nhap mat khau cua ban"
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
          <span>Ghi nho dang nhap</span>
        </label>

        <button className="auth-modal__link" type="button">
          Quen mat khau?
        </button>
      </div>
    </>
  );

  const renderRegisterForm = () => (
    <>
      <div className="auth-modal__grid">
        <div className="auth-modal__field">
          <label htmlFor="auth-register-name">Ho va ten</label>
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
          <label htmlFor="auth-register-phone">So dien thoai</label>
          <input
            autoComplete="tel"
            className="auth-modal__input"
            id="auth-register-phone"
            name="phone"
            pattern="[0-9]{9,11}"
            placeholder="0901234567"
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
          <label htmlFor="auth-register-password">Mat khau</label>
          <input
            autoComplete="new-password"
            className="auth-modal__input"
            id="auth-register-password"
            minLength={6}
            name="password"
            placeholder="Toi thieu 6 ky tu"
            required
            type="password"
            value={registerForm.password}
            onChange={handleRegisterChange}
          />
        </div>

        <div className="auth-modal__field">
          <label htmlFor="auth-register-confirm">Xac nhan mat khau</label>
          <input
            autoComplete="new-password"
            className="auth-modal__input"
            id="auth-register-confirm"
            minLength={6}
            name="confirmPassword"
            placeholder="Nhap lai mat khau"
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
        aria-label="Dong cua so dang nhap"
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
          <button aria-label="Dong modal" className="auth-modal__close" type="button" onClick={onClose}>
            <span aria-hidden="true">x</span>
          </button>

          <div className="auth-modal__tabs" role="tablist" aria-label="Lua chon xac thuc">
            <button
              aria-selected={mode === 'login'}
              className={classNames('auth-modal__tab', mode === 'login' && 'auth-modal__tab--active')}
              role="tab"
              type="button"
              onClick={() => onModeChange('login')}
            >
              Dang nhap
            </button>
            <button
              aria-selected={mode === 'register'}
              className={classNames('auth-modal__tab', mode === 'register' && 'auth-modal__tab--active')}
              role="tab"
              type="button"
              onClick={() => onModeChange('register')}
            >
              Dang ky
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
                  {isSubmitting ? 'Dang xu ly...' : activeCopy.submitLabel}
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
