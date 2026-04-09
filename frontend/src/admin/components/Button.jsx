import { cn } from "../utils/formatters";
import Icon from "./Icon";

const variantClasses = {
  primary:
    "bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg shadow-primary/20 hover:brightness-105",
  solid: "bg-primary text-on-primary hover:bg-primary-container",
  secondary: "bg-surface-container-high text-primary hover:bg-surface-container-highest",
  surface: "bg-surface-container-low text-slate-600 hover:bg-surface-container-high",
  outline: "border border-slate-200 bg-transparent text-slate-600 hover:bg-slate-50",
  ghost: "bg-transparent text-primary hover:text-primary-container",
  danger: "bg-error-container text-on-error-container hover:bg-error/10",
  glass: "bg-white/20 text-white backdrop-blur-md hover:bg-white/30",
  white: "bg-white text-primary hover:bg-white/90",
};

const sizeClasses = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm",
};

export default function Button({
  as: Component = "button",
  children,
  className = "",
  icon,
  iconClassName = "",
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}) {
  const buttonClassName = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  return (
    <Component className={buttonClassName} type={Component === "button" ? type : undefined} {...props}>
      {icon ? <Icon name={icon} className={iconClassName} /> : null}
      {children}
    </Component>
  );
}
