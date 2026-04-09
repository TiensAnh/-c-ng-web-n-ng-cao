import Button from '../common/Button';
import useNewsletterForm from '../../hooks/useNewsletterForm';

function HomeNewsletterSection({ newsletter }) {
  const { email, handleSubmit, message, setEmail, status } = useNewsletterForm('home');

  return (
    <section className="home-newsletter section-block">
      <div className="content-container">
        <div className="home-newsletter__panel">
          <div className="home-newsletter__copy">
            <h2 className="home-newsletter__title">{newsletter.title}</h2>
            <p className="home-newsletter__description">{newsletter.description}</p>

            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email của bạn"
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

          <div className="home-newsletter__visual">
            <div className="home-newsletter__image-frame">
              <img src={newsletter.image} alt={newsletter.imageAlt} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeNewsletterSection;
