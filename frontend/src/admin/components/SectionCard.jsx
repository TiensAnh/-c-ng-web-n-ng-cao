import { cn } from "../utils/formatters";

export default function SectionCard({
  actions,
  children,
  className = "",
  contentClassName = "",
  description,
  footer,
  headerClassName = "",
  title,
}) {
  return (
    <section className={cn("surface-card overflow-hidden", className)}>
      {title || description || actions ? (
        <div className={cn("flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between", headerClassName)}>
          <div>
            {title ? <h2 className="font-headline text-lg font-bold text-on-surface">{title}</h2> : null}
            {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
        </div>
      ) : null}
      <div className={contentClassName}>{children}</div>
      {footer ? <div>{footer}</div> : null}
    </section>
  );
}
