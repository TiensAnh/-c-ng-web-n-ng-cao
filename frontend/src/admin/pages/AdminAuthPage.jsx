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
    eyebrow: 'Truy cập quản trị',
    title: 'Đăng nhập khu quản trị ADN Travel',
    subtitle:
      'Khu vực này dành riêng cho bộ phận điều hành, kiểm duyệt tour và cập nhật nội dung hệ thống.',
    submitLabel: 'Đăng nhập admin',
    footerText: 'Chưa có tài khoản admin?',
    footerAction: 'Tạo tài khoản',
    footerPath: ROUTES.register,
  },
  register: {
    eyebrow: 'Khởi tạo quản trị viên',
    title: 'Tạo tài khoản quản trị mới',
    subtitle:
      'Đăng ký nhanh một tài khoản admin mới để truy cập dashboard, quản lý tour và theo dõi booking.',
    submitLabel: 'Đăng ký admin',
    footerText: 'Đã có tài khoản admin?',
    footerAction: 'Đăng nhập ngay',
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
                <strong>Scope riêng cho admin</strong>
                <p>Phiên này được tách riêng với tài khoản người dùng và xác thực bằng bảng `admins`..</p>
              </div>
            </div>

            <div className="admin-auth-card__highlight">
              <span className="material-symbols-outlined">travel_explore</span>
              <div>
                <strong>Truy cập dashboard nhanh</strong>
                <p>Sau khi đăng nhập thành công, bạn sẽ được chuyển hướng về đúng khu vực quản trị đã yêu cầu trước đó.</p>
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
                 <span>Ghi nhớ phiên đăng nhập admin trên trình duyệt này</span>
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
