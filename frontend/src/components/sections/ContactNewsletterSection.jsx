import Button from '../common/Button';
import useNewsletterForm from '../../hooks/useNewsletterForm';

function ContactNewsletterSection({ newsletter }) {
  const { email, handleSubmit, message, setEmail, status } = useNewsletterForm('contact');

  return (
    <section className="contact-newsletter section-block">
      <div className="content-container">
        <div className="contact-newsletter__panel">
          <img src={newsletter.image} alt={newsletter.title} />
          <div className="contact-newsletter__overlay" />

          <div className="contact-newsletter__content">
            <h2>{newsletter.title}</h2>
            <p>{newsletter.description}</p>

            <form className="newsletter-form newsletter-form--dark" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button type="submit">Đăng ký ngay</Button>
            </form>

            {message ? (
              <p className={`form-feedback form-feedback--${status === 'success' ? 'success' : 'error'}`}>
                {message}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactNewsletterSection;
