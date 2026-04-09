import { Link } from 'react-router-dom';
import { footerLinks } from '../../services/siteContentService';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner content-container">
        <div className="site-footer__brand-block">
          <Link className="site-footer__brand" to="/">
            ADN Travel
          </Link>
          <p className="site-footer__copyright">
            © {new Date().getFullYear()} ADN Travel. All rights reserved.
          </p>
        </div>

        <div className="site-footer__links">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="site-footer__link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="site-footer__socials" aria-label="Social links">
          <span className="material-symbols-outlined">share</span>
          <span className="material-symbols-outlined">public</span>
          <span className="material-symbols-outlined">mail</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
