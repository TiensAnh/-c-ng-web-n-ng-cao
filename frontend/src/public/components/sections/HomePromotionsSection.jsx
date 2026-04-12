import PromoCard from '../cards/PromoCard';
import FeatureCard from '../cards/FeatureCard';
import SectionHeading from '../../../shared/components/SectionHeading';

function HomePromotionsSection({ promotions }) {
  return (
    <section className="home-promotions section-block">
      <div className="content-container">
        <SectionHeading
          title={promotions.title}
          description={promotions.description}
          action={
            <button className="text-action" type="button">
              Xem tất cả
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          }
        />

        <div className="home-promotions__grid">
          <div className="home-promotions__cards">
            {promotions.items.map((item) => (
              <PromoCard key={item.title} {...item} />
            ))}
          </div>

          <div className="home-promotions__features">
            {promotions.features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePromotionsSection;
