import { cn } from "../utils/formatters";

export default function FilterChips({ className = "", onChange, options, value }) {
  return (
    <div className={cn("no-scrollbar flex gap-2 overflow-x-auto pb-2", className)}>
      {options.map((option) => {
        const isActive = option === value;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full px-6 py-2 text-sm font-semibold transition-colors",
              isActive
                ? "bg-primary-container text-on-primary-container shadow-sm"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
