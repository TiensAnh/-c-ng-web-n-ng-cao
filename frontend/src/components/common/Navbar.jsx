import { NavLink } from 'react-router-dom';
<<<<<<< HEAD
import Button from './Button';
import { classNames } from '../../utils/classNames';
import { navigationLinks } from '../../services/siteContentService';
=======
import brandLogo from '../../assets/images/Logo.png';
import Button from './Button';
import { classNames } from '../../utils/classNames';
import { navigationLinks } from '../../services/public/siteContentService';
>>>>>>> 8cf1a3989029571942876b8f0683261f93b85e40

function Navbar() {
  return (
    <header className="site-navbar">
      <div className="site-navbar__inner content-container">
<<<<<<< HEAD
        <NavLink className="site-navbar__brand" to="/">
          ADN Travel
=======
        <NavLink className="site-navbar__brand" to="/" aria-label="ADN Travel home">
          <img className="site-navbar__brand-logo" src={brandLogo} alt="ADN Travel" />
>>>>>>> 8cf1a3989029571942876b8f0683261f93b85e40
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
<<<<<<< HEAD
            <span className="material-symbols-outlined">language</span>
            <span className="material-symbols-outlined">settings</span>
=======
            <span className="material-symbols-outlined"></span>
            <span className="material-symbols-outlined"></span>
>>>>>>> 8cf1a3989029571942876b8f0683261f93b85e40
          </div>
          <Button className="site-navbar__support" variant="ghost">
            Support
          </Button>
          <Button className="site-navbar__signin">Sign In</Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
