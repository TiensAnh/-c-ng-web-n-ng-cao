import { cn } from "../utils/formatters";

const badgeClasses = {
  success: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  draft: "bg-slate-100 text-slate-500",
  failed: "bg-error-container text-on-error-container",
  blocked: "bg-error-container/20 text-error",
  inactive: "bg-slate-100 text-slate-400",
  admin: "bg-blue-100 text-blue-700",
  user: "bg-slate-100 text-slate-600",
};

export default function StatusBadge({
  className = "",
  dotClassName = "",
  label,
  showDot = false,
  tone = "success",
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide",
        badgeClasses[tone],
        className,
      )}
    >
      {showDot ? <span className={cn("h-1.5 w-1.5 rounded-full bg-current", dotClassName)} /> : null}
      {label}
    </span>
  );
}
