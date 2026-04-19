import { NavLink, useNavigate } from 'react-router-dom';
import brandLogo from '../../shared/assets/images/Logo.png';
import { useAdminAuth } from '../context/AdminAuthContext';
import { NAV_ITEMS, ROUTES } from '../utils/routes';
import Avatar from './Avatar';
import Icon from './Icon';

export default function Sidebar({ onClose, open, profile, subtitle }) {
  const navigate = useNavigate();
  const { logoutAdmin } = useAdminAuth();

  const handleLogout = () => {
    logoutAdmin();
    onClose?.();
    navigate(ROUTES.login, { replace: true });
  };

  return (
    <div className="lg:pointer-events-auto">
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-900/40 transition-opacity lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`admin-sidebar z-50 transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6">
          <NavLink
            to={ROUTES.dashboard}
            onClick={onClose}
            className="inline-flex items-center justify-center"
            style={{
              width: '12.25rem',
              height: '2.5rem',
              marginTop: '-0.35rem',
              overflow: 'hidden',
              lineHeight: 0,
            }}
          >
            <img
              src={brandLogo}
              alt="ADN Travel"
              style={{ width: 'auto', height: '8.3rem', maxWidth: 'none', flexShrink: 0 }}
            />
          </NavLink>
          {profile ? (
            <div className="mt-5 flex items-center gap-3">
              <Avatar
                src={profile.avatar}
                alt={profile.name}
                className="h-10 w-10 rounded-full"
                fallbackClassName="bg-primary text-on-primary shadow-sm"
                initials={profile.name}
              />
              <div>
                <p className="text-sm font-bold text-on-surface">{profile.name}</p>
                <p className="text-xs text-slate-500">{profile.role}</p>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">{subtitle}</p>
          )}
        </div>

        <nav className="mt-8 flex-1 space-y-1 px-3">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? "sidebar-nav-item-active" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon name={item.icon} filled={isActive && (item.key === "reviews" || item.key === "payments")} />
                  <span className="text-sm">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-slate-100 px-4 pt-4">
          <button
            type="button"
            className="sidebar-nav-item w-full justify-start text-slate-500 hover:text-error"
            onClick={handleLogout}
          >
            <Icon name="logout" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
