function SectionHeading({ title, description, action }) {
  return (
    <div className="section-heading">
      <div>
        <h2 className="section-heading__title">{title}</h2>
        {description ? <p className="section-heading__description">{description}</p> : null}
      </div>
      {action ? <div className="section-heading__action">{action}</div> : null}
    </div>
  );
}

export default SectionHeading;
