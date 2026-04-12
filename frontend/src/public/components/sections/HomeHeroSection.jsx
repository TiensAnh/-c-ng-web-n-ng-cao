import HeroSearchForm from '../forms/HeroSearchForm';

function HomeHeroSection({ hero }) {
  return (
    <section className="home-hero">
      <img className="home-hero__image" src={hero.image} alt="Bãi biển nhiệt đới lúc hoàng hôn" />
      <div className="home-hero__overlay" />

      <div className="content-container home-hero__content">
        <div className="home-hero__copy">
          <span className="eyebrow eyebrow--hero">{hero.eyebrow}</span>
          <h1 className="home-hero__title">
            {hero.title[0]}
            <br />
            <span>{hero.title[1]}</span>
          </h1>
          <p className="home-hero__description">{hero.description}</p>
        </div>

        <HeroSearchForm />
      </div>
    </section>
  );
}

export default HomeHeroSection;
