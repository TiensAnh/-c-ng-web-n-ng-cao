function AboutHeroSection({ hero }) {
  return (
    <section className="about-hero">
      <img className="about-hero__image" src={hero.image} alt="Cánh máy bay trên biển mây" />
      <div className="about-hero__overlay" />

      <div className="content-container about-hero__content">
        <span className="eyebrow eyebrow--gold">{hero.eyebrow}</span>
        <h1 className="about-hero__title">
          {hero.title[0]}
          <br />
          <span>{hero.title[1]}</span>
        </h1>
        <p className="about-hero__description">{hero.description}</p>
      </div>
    </section>
  );
}

export default AboutHeroSection;
