import { cn } from "../utils/formatters";
import Icon from "./Icon";

export default function SearchInput({
  className = "",
  containerClassName = "",
  onChange,
  placeholder,
  value,
}) {
  return (
    <div className={cn("relative", containerClassName)}>
      <Icon
        name="search"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400"
      />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border-none bg-surface-container-low py-2.5 pl-10 pr-4 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20",
          className,
        )}
      />
    </div>
  );
}
