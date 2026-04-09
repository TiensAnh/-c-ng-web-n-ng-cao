import { cn } from "../utils/formatters";

export default function Avatar({
  src,
  alt,
  initials,
  className = "",
  fallbackClassName = "",
}) {
  if (src) {
    return <img src={src} alt={alt} className={cn("object-cover", className)} />;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-slate-200 font-bold text-slate-600",
        className,
        fallbackClassName,
      )}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
