import { cn } from "../utils/formatters";

export default function ChartBars({ bars }) {
  return (
    <div className="relative flex h-64 items-end justify-between gap-4 pt-10">
      <div className="chart-grid-lines">
        <div />
        <div />
        <div />
        <div />
      </div>
      {bars.map((bar) => (
        <div key={bar.label} className="group flex flex-1 flex-col items-center gap-2">
          <div
            className={cn(
              "w-full rounded-t-lg transition-all",
              bar.active
                ? "bg-primary shadow-lg shadow-primary/20"
                : bar.secondary
                  ? "bg-slate-200 group-hover:bg-primary-container"
                  : "bg-slate-100 group-hover:bg-primary-container",
            )}
            style={{ height: `${bar.height}px` }}
          />
          <span className={cn("text-xs font-medium", bar.active ? "font-bold text-primary" : "text-slate-400")}>
            {bar.label}
          </span>
        </div>
      ))}
    </div>
  );
}
