import { cn } from "../utils/formatters";

export default function ChartBars({ bars }) {
  return (
    <div className="relative h-64 pt-10">
      <div className="chart-grid-lines">
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className="flex h-full items-end justify-center gap-4">
        {bars.map((bar) => (
          <div
            key={bar.label}
            className="group flex min-w-[72px] max-w-[112px] flex-1 flex-col items-center gap-2"
          >
            <span className={cn("text-center text-[11px] font-semibold", bar.active ? "text-primary" : "text-slate-400")}>
              {bar.revenue ? new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                maximumFractionDigits: 0,
              }).format(bar.revenue) : ''}
            </span>
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
    </div>
  );
}
