import { classNames } from '../utils/classNames';

function renderCardBody(card) {
  if (Array.isArray(card.items) && card.items.length) {
    return (
      <ul className="tour-spotlight__card-list">
        {card.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return card.description ? <p className="tour-spotlight__card-description">{card.description}</p> : null;
}

export default function TourExperienceLayout({
  actions,
  aside,
  badge,
  className,
  description,
  eyebrow,
  heroAlt,
  heroImage,
  highlights = [],
  highlightsTitle = 'Diem nhan hanh trinh',
  itinerary = [],
  itineraryTitle = 'Lich trinh goi y',
  meta = [],
  overviewCards = [],
  overviewDescription,
  overviewTitle = 'Bo cuc chuyen di',
  quote,
  quoteAuthor,
  stats = [],
  theme = 'public',
  title,
}) {
  return (
    <section className={classNames('tour-spotlight', theme === 'admin' && 'tour-spotlight--admin', className)}>
      <div className="tour-spotlight__container">
        <div className="tour-spotlight__hero">
          <div className="tour-spotlight__hero-copy">
            <div className="tour-spotlight__eyebrow-row">
              {eyebrow ? <span className="tour-spotlight__eyebrow">{eyebrow}</span> : null}
              {badge ? <span className="tour-spotlight__badge">{badge}</span> : null}
            </div>

            <h1 className="tour-spotlight__title">{title}</h1>
            {description ? <p className="tour-spotlight__description">{description}</p> : null}
            {actions ? <div className="tour-spotlight__hero-actions">{actions}</div> : null}

            {meta.length ? (
              <div className="tour-spotlight__meta">
                {meta.map((item) => (
                  <div key={`${item.icon}-${item.label}`} className="tour-spotlight__meta-chip">
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="tour-spotlight__hero-media">
            <img src={heroImage} alt={heroAlt} />
            <div className="tour-spotlight__hero-glow" />
          </div>
        </div>

        {stats.length ? (
          <div className="tour-spotlight__stats">
            {stats.map((stat) => (
              <article key={stat.label} className="tour-spotlight__stat-card">
                <span className="tour-spotlight__stat-label">{stat.label}</span>
                <strong className="tour-spotlight__stat-value">{stat.value}</strong>
                {stat.helper ? <span className="tour-spotlight__stat-helper">{stat.helper}</span> : null}
              </article>
            ))}
          </div>
        ) : null}

        <div className="tour-spotlight__body">
          <div className="tour-spotlight__main">
            {quote ? (
              <blockquote className="tour-spotlight__quote">
                <p>{quote}</p>
                {quoteAuthor ? <footer>{quoteAuthor}</footer> : null}
              </blockquote>
            ) : null}

            {overviewCards.length ? (
              <section className="tour-spotlight__section">
                <div className="tour-spotlight__section-head">
                  <h2>{overviewTitle}</h2>
                  {overviewDescription ? <p>{overviewDescription}</p> : null}
                </div>
                <div className="tour-spotlight__overview-grid">
                  {overviewCards.map((card) => (
                    <article key={card.title} className="tour-spotlight__overview-card">
                      <div className="tour-spotlight__card-icon">
                        <span className="material-symbols-outlined">{card.icon}</span>
                      </div>
                      {card.eyebrow ? <span className="tour-spotlight__card-eyebrow">{card.eyebrow}</span> : null}
                      <h3>{card.title}</h3>
                      {renderCardBody(card)}
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {highlights.length ? (
              <section className="tour-spotlight__section">
                <div className="tour-spotlight__section-head">
                  <h2>{highlightsTitle}</h2>
                </div>
                <div className="tour-spotlight__highlights">
                  {highlights.map((highlight) => (
                    <article key={highlight.title} className="tour-spotlight__highlight-card">
                      <div className="tour-spotlight__highlight-icon">
                        <span className="material-symbols-outlined">{highlight.icon}</span>
                      </div>
                      <div>
                        <h3>{highlight.title}</h3>
                        <p>{highlight.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {itinerary.length ? (
              <section className="tour-spotlight__section">
                <div className="tour-spotlight__section-head">
                  <h2>{itineraryTitle}</h2>
                </div>
                <div className="tour-spotlight__timeline">
                  {itinerary.map((item) => (
                    <article key={item.label} className="tour-spotlight__timeline-item">
                      <div className="tour-spotlight__timeline-marker">
                        <span>{item.label}</span>
                      </div>
                      <div className="tour-spotlight__timeline-card">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          {aside ? <aside className="tour-spotlight__aside">{aside}</aside> : null}
        </div>
      </div>
    </section>
  );
}
