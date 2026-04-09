import Button from '../common/Button';

function AboutWhyChooseSection({ whyChoose }) {
  return (
    <section className="about-why section-block">
      <div className="content-container about-why__grid">
        <div className="about-why__media">
          <img src={whyChoose.image} alt={whyChoose.title} />
          <div className="about-why__score">
            <strong>{whyChoose.score}</strong>
            <p>{whyChoose.scoreDescription}</p>
          </div>
        </div>

        <div className="about-why__copy">
          <h2>{whyChoose.title}</h2>
          <div className="about-why__items">
            {whyChoose.items.map((item) => (
              <div key={item.title} className="about-why__item">
                <div className="about-why__icon">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Button className="about-why__button" variant="secondary">
            Khám phá thêm
          </Button>
        </div>
      </div>
    </section>
  );
}

export default AboutWhyChooseSection;
