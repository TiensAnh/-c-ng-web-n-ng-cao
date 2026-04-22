import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import brandLogo from '../../../shared/assets/images/Logo.png';
import AuthModal from '../../../shared/components/AuthModal';
import Button from '../../../shared/components/Button';
import { useAuth } from '../../../shared/context/AuthContext';
import { classNames } from '../../../shared/utils/classNames';
import { navigationLinks } from '../../services/siteContentService';

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const [authMode, setAuthMode] = useState(null);
  const displayName = user?.name?.trim() || 'Nguoi dung';
  const avatarLabel = displayName.charAt(0).toUpperCase();

  const handleOpenAuthModal = (mode) => {
    setAuthMode(mode);
  };

  const handleCloseAuthModal = () => {
    setAuthMode(null);
  };

  return (
    <>
      <header className="site-navbar">
        <div className="site-navbar__inner content-container">
          <NavLink className="site-navbar__brand" to="/" aria-label="ADN Travel home">
            <img className="site-navbar__brand-logo" src={brandLogo} alt="ADN Travel" />
          </NavLink>

          <nav className="site-navbar__links" aria-label="Main navigation">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  classNames('site-navbar__link', isActive && 'site-navbar__link--active')
                }
                end={link.path === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-navbar__actions">
            <div className="site-navbar__icons">
              <span className="material-symbols-outlined">language</span>
              <span className="material-symbols-outlined">travel_explore</span>
            </div>

            <Button className="site-navbar__support" variant="ghost">
              Ho tro
            </Button>

            {isAuthenticated ? (
              <>
                <div className="site-navbar__user" aria-label={`Tai khoan ${displayName}`}>
                  <span className="site-navbar__user-avatar" aria-hidden="true">
                    {avatarLabel}
                  </span>

                  <div className="site-navbar__user-copy">
                    <span className="site-navbar__user-label">Tai khoan</span>
                    <strong className="site-navbar__user-name">{displayName}</strong>
                  </div>
                </div>

                <Button className="site-navbar__support" variant="ghost" onClick={() => navigate('/my-bookings')}>
                  Booking cua toi
                </Button>

                <Button className="site-navbar__auth-trigger" variant="secondary" onClick={logout}>
                  Dang xuat
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="site-navbar__login site-navbar__auth-trigger"
                  variant="secondary"
                  onClick={() => handleOpenAuthModal('login')}
                >
                  Dang nhap
                </Button>

                <Button
                  className="site-navbar__signup site-navbar__auth-trigger"
                  onClick={() => handleOpenAuthModal('register')}
                >
                  Dang ky
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={Boolean(authMode)}
        mode={authMode ?? 'login'}
        onClose={handleCloseAuthModal}
        onModeChange={handleOpenAuthModal}
      />
    </>
  );
}

export default Navbar;
