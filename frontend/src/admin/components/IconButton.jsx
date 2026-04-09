import { cn } from "../utils/formatters";
import Icon from "./Icon";

const variantClasses = {
  subtle: "text-slate-500 hover:bg-slate-100 hover:text-primary",
  clean: "text-slate-400 hover:text-primary",
  danger: "text-slate-400 hover:bg-white hover:text-error",
};

export default function IconButton({
  icon,
  filled = false,
  className = "",
  variant = "subtle",
  ...props
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-lg p-2 transition-all",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      <Icon name={icon} filled={filled} className="text-[20px]" />
    </button>
  );
}
