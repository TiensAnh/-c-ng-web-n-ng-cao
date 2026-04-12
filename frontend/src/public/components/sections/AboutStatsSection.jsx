import StatCard from '../cards/StatCard';

function AboutStatsSection({ stats }) {
  return (
    <section className="about-stats">
      <div className="content-container about-stats__grid">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}

export default AboutStatsSection;
