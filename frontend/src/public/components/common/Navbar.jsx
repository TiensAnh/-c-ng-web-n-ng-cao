import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import brandLogo from '../../../shared/assets/images/Logo.png';
import AuthModal from '../../../shared/components/AuthModal';
import Button from '../../../shared/components/Button';
import { classNames } from '../../../shared/utils/classNames';
import { navigationLinks } from '../../services/siteContentService';

function Navbar() {
  const [authMode, setAuthMode] = useState(null);

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
              Hỗ trợ
            </Button>

            <Button
              className="site-navbar__login site-navbar__auth-trigger"
              variant="secondary"
              onClick={() => handleOpenAuthModal('login')}
            >
              Đăng nhập
            </Button>

            <Button
              className="site-navbar__signup site-navbar__auth-trigger"
              onClick={() => handleOpenAuthModal('register')}
            >
              Đăng ký
            </Button>
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
