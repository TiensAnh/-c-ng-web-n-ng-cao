import { classNames } from '../../../shared/utils/classNames';

function FeatureCard({ description, icon, title, tone }) {
  return (
    <article className={classNames('feature-card', `feature-card--${tone}`)}>
      <div className="feature-card__icon">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__description">{description}</p>
    </article>
  );
}

export default FeatureCard;
