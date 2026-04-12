function AboutMissionSection({ mission, values }) {
  return (
    <section className="about-mission section-block">
      <div className="content-container about-mission__grid">
        <article className="about-mission__card">
          <img src={mission.image} alt={mission.title} />
          <div className="about-mission__card-copy">
            <h2>{mission.title}</h2>
            <p>{mission.description}</p>
          </div>
        </article>

        <article className="about-values">
          <h3>Giá Trị Cốt Lõi</h3>
          <div className="about-values__list">
            {values.map((value) => (
              <div key={value.title} className="about-values__item">
                <span className="material-symbols-outlined">{value.icon}</span>
                <div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

export default AboutMissionSection;
