function ContactInfoCard({ description, icon, title, wide = false }) {
  return (
    <article className={`contact-info-card${wide ? ' contact-info-card--wide' : ''}`}>
      <div className="contact-info-card__icon">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <h3 className="contact-info-card__title">{title}</h3>
      <p className="contact-info-card__description">{description}</p>
    </article>
  );
}

export default ContactInfoCard;
