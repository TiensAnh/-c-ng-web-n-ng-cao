function ContactHeroSection({ hero }) {
  return (
    <section className="contact-hero section-block">
      <div className="content-container contact-hero__content">
        <span className="eyebrow eyebrow--soft">{hero.eyebrow}</span>
        <h1>{hero.title}</h1>
        <p>{hero.description}</p>
      </div>
    </section>
  );
}

export default ContactHeroSection;
