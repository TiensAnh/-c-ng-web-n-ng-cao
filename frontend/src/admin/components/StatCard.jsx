import { cn } from "../utils/formatters";

export default function StatCard({
  badge,
  children,
  className = "",
  icon,
  iconPanelClassName = "",
  label,
  value,
  valueClassName = "",
}) {
  return (
    <article className={cn("surface-card p-6", className)}>
      {icon || badge ? (
        <div className="mb-4 flex items-start justify-between gap-4">
          {icon ? <div className={cn("rounded-lg p-3", iconPanelClassName)}>{icon}</div> : <span />}
          {badge}
        </div>
      ) : null}
      {label ? <p className="text-sm font-medium text-slate-500">{label}</p> : null}
      {value ? (
        <h3 className={cn("mt-1 font-headline text-2xl font-extrabold text-on-surface", valueClassName)}>
          {value}
        </h3>
      ) : null}
      {children}
    </article>
  );
}
