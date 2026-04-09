import Button from "./Button";
import Icon from "./Icon";

export default function InsightPanel({
  actionLabel,
  actionVariant = "ghost",
  className = "",
  description,
  icon,
  iconClassName = "",
  iconPanelClassName = "",
  title,
}) {
  return (
    <article className={className}>
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${iconPanelClassName}`}>
        <Icon name={icon} className={iconClassName} />
      </div>
      <h3 className="font-headline text-xl font-bold text-on-surface">{title}</h3>
      <p className="mt-2 text-sm text-on-surface-variant">{description}</p>
      {actionLabel ? (
        <Button variant={actionVariant} className="mt-6 px-0 text-sm font-bold">
          {actionLabel}
        </Button>
      ) : null}
    </article>
  );
}
