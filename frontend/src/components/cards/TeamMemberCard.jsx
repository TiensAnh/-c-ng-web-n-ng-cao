function TeamMemberCard({ description, image, name, role }) {
  return (
    <article className="team-member-card">
      <div className="team-member-card__media">
        <img className="team-member-card__image" src={image} alt={name} />
      </div>
      <h3 className="team-member-card__name">{name}</h3>
      <p className="team-member-card__role">{role}</p>
      <p className="team-member-card__description">{description}</p>
    </article>
  );
}

export default TeamMemberCard;
