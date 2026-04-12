function StatCard({ label, value }) {
  return (
    <article className="stat-card">
      <strong className="stat-card__value">{value}</strong>
      <span className="stat-card__label">{label}</span>
    </article>
  );
}

export default StatCard;
