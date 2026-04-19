import { useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAdminAuth } from '../context/AdminAuthContext';
import useAdminHeadAssets from '../hooks/useAdminHeadAssets';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { ROUTES } from '../utils/routes';
import '../styles/admin.css';
import '../styles/admin-auth.css';

const PAGE_COPY = {
  login: {
    eyebrow: 'Admin access',
    title: 'Dang nhap khu quan tri ADN Travel',
    subtitle:
      'Khu vuc nay danh rieng cho bo phan dieu hanh, kiem duyet tour va cap nhat noi dung he thong.',
    submitLabel: 'Dang nhap admin',
    footerText: 'Chua co tai khoan admin?',
    footerAction: 'Tao tai khoan',
    footerPath: ROUTES.register,
  },
  register: {
    eyebrow: 'Admin onboarding',
    title: 'Tao tai khoan quan tri moi',
    subtitle:
      'Dang ky nhanh mot tai khoan admin moi de truy cap dashboard, quan ly tour va theo doi booking.',
    submitLabel: 'Dang ky admin',
    footerText: 'Da co tai khoan admin?',
    footerAction: 'Dang nhap ngay',
    footerPath: ROUTES.login,
  },
};

const INITIAL_LOGIN_FORM = {
  email: '',
  password: '',
  rememberMe: true,
};

const INITIAL_REGISTER_FORM = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function AdminAuthPage({ mode = 'login' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdminAuthenticated, isAdminAuthChecking, loginAdmin, registerAdmin } = useAdminAuth();
  const [loginForm, setLoginForm] = useState(INITIAL_LOGIN_FORM);
  const [registerForm, setRegisterForm] = useState(INITIAL_REGISTER_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useAdminHeadAssets();
  useDocumentTitle(mode === 'login' ? 'Admin Login | ADN Travel' : 'Admin Register | ADN Travel');

  const copy = PAGE_COPY[mode];
  const redirectPath = useMemo(
    () => location.state?.from?.pathname || ROUTES.dashboard,
    [location.state],
  );

  if (!isAdminAuthChecking && isAdminAuthenticated) {
    return <Navigate replace to={redirectPath} />;
  }

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
    setIsSubmitting(true);

    try {
      const response = mode === 'login'
        ? await loginAdmin(
          {
            email: loginForm.email,
            password: loginForm.password,
          },
          {
            rememberMe: loginForm.rememberMe,
          },
        )
        : await registerAdmin({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
          confirmPassword: registerForm.confirmPassword,
        });

      setFeedback({
        type: 'success',
        message: response.message || 'Xac thuc admin thanh cong.',
      });

      window.setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 500);
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Khong the xu ly yeu cau admin luc nay.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-auth-screen">
      <div className="admin-auth-screen__ambient admin-auth-screen__ambient--one" />
      <div className="admin-auth-screen__ambient admin-auth-screen__ambient--two" />

      <div className="admin-auth-card">
        <section className="admin-auth-card__hero">
          <span className="admin-auth-card__eyebrow">{copy.eyebrow}</span>
          <h1 className="admin-auth-card__title">{copy.title}</h1>
          <p className="admin-auth-card__subtitle">{copy.subtitle}</p>

          <div className="admin-auth-card__highlights">
            <div className="admin-auth-card__highlight">
              <span className="material-symbols-outlined">shield_lock</span>
              <div>
                <strong>Scope rieng cho admin</strong>
                <p>Session nay duoc tach rieng voi tai khoan public va xac thuc bang bang `admins`.</p>
              </div>
            </div>

            <div className="admin-auth-card__highlight">
              <span className="material-symbols-outlined">travel_explore</span>
              <div>
                <strong>Truy cap dashboard nhanh</strong>
                <p>Sau khi dang nhap xong, he thong se dua ban ve lai khu admin dang muon truy cap.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="admin-auth-card__form-panel">
          <div className="admin-auth-card__tabs">
            <Link
              className={`admin-auth-card__tab ${mode === 'login' ? 'admin-auth-card__tab--active' : ''}`}
              to={ROUTES.login}
            >
              Dang nhap
            </Link>
            <Link
              className={`admin-auth-card__tab ${mode === 'register' ? 'admin-auth-card__tab--active' : ''}`}
              to={ROUTES.register}
            >
              Dang ky
            </Link>
          </div>

          <form className="admin-auth-form" onSubmit={handleSubmit}>
            {mode === 'register' ? (
              <>
                <label className="admin-auth-form__field">
                  <span>Ten admin</span>
                  <input
                    name="name"
                    placeholder="Nguyen Admin"
                    required
                    type="text"
                    value={registerForm.name}
                    onChange={handleRegisterChange}
                  />
                </label>

                <label className="admin-auth-form__field">
                  <span>Email admin</span>
                  <input
                    name="email"
                    placeholder="admin@adntravel.vn"
                    required
                    type="email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                  />
                </label>

                <div className="admin-auth-form__grid">
                  <label className="admin-auth-form__field">
                    <span>Mat khau</span>
                    <input
                      minLength={6}
                      name="password"
                      placeholder="Toi thieu 6 ky tu"
                      required
                      type="password"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                    />
                  </label>

                  <label className="admin-auth-form__field">
                    <span>Xac nhan mat khau</span>
                    <input
                      minLength={6}
                      name="confirmPassword"
                      placeholder="Nhap lai mat khau"
                      required
                      type="password"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                    />
                  </label>
                </div>
              </>
            ) : (
              <>
                <label className="admin-auth-form__field">
                  <span>Email admin</span>
                  <input
                    name="email"
                    placeholder="admin@adntravel.vn"
                    required
                    type="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                  />
                </label>

                <label className="admin-auth-form__field">
                  <span>Mat khau</span>
                  <input
                    name="password"
                    placeholder="Nhap mat khau admin"
                    required
                    type="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                  />
                </label>

                <label className="admin-auth-form__remember">
                  <input
                    checked={loginForm.rememberMe}
                    name="rememberMe"
                    type="checkbox"
                    onChange={handleLoginChange}
                  />
                  <span>Ghi nho phien admin tren trinh duyet nay</span>
                </label>
              </>
            )}

            {feedback ? (
              <p className={`admin-auth-form__feedback admin-auth-form__feedback--${feedback.type}`}>
                {feedback.message}
              </p>
            ) : null}

            <Button className="admin-auth-form__submit" disabled={isSubmitting} size="lg" type="submit">
              {isSubmitting ? 'Dang xu ly...' : copy.submitLabel}
            </Button>

            <p className="admin-auth-form__footer">
              {copy.footerText}{' '}
              <Link to={copy.footerPath}>{copy.footerAction}</Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
