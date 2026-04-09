import { cn } from "../utils/formatters";

export default function HeroSection({
  title,
  description,
  actions,
  className = "",
  descriptionClassName = "",
  titleClassName = "",
}) {
  return (
    <section
      className={cn(
        "mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div>
        <h1
          className={cn(
            "font-headline text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl",
            titleClassName,
          )}
        >
          {title}
        </h1>
        {description ? (
          <p className={cn("mt-2 max-w-2xl text-sm text-on-surface-variant", descriptionClassName)}>
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </section>
  );
}
