import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

function AboutCtaSection({ cta }) {
  const navigate = useNavigate();

  return (
    <section className="about-cta section-block">
      <div className="content-container">
        <div className="about-cta__panel">
          <img src={cta.image} alt={cta.title} />
          <div className="about-cta__overlay" />
          <div className="about-cta__content">
            <h2>{cta.title}</h2>
            <div className="about-cta__actions">
              <Button onClick={() => navigate('/tours')}>{cta.primaryLabel}</Button>
              <Button variant="outline" onClick={() => navigate('/contact')}>
                {cta.secondaryLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCtaSection;
