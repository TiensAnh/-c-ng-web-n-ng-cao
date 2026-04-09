import { cn } from "../utils/formatters";

export default function Icon({ name, filled = false, className = "" }) {
  return (
    <span
      className={cn("material-symbols-outlined", className)}
      style={{
        fontVariationSettings: filled
          ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
          : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
      }}
    >
      {name}
    </span>
  );
}
