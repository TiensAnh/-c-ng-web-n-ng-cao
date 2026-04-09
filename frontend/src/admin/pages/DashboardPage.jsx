import { useState } from "react";
import Button from "../components/Button";
import ChartBars from "../components/ChartBars";
import DataTable from "../components/DataTable";
import Icon from "../components/Icon";
import IconButton from "../components/IconButton";
import SectionCard from "../components/SectionCard";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { dashboardPage } from "../services/adminService";

export default function DashboardPage() {
  const [chartView, setChartView] = useState("monthly");

  useDocumentTitle(dashboardPage.title);

  return (
    <div className="admin-page-shell">
      <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardPage.summaryCards.map((card) => (
          <StatCard
            key={card.id}
            className="transition-shadow hover:shadow-md"
            icon={<Icon name={card.icon} />}
            iconPanelClassName={card.iconPanelClassName}
            label={card.label}
            value={card.value}
            badge={
              <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${card.badgeClassName}`}>
                <Icon name="trending_up" className="text-[14px]" />
                {card.badge}
              </div>
            }
          />
        ))}
      </section>

      <SectionCard
        className="mb-8 rounded-2xl"
        contentClassName="px-8 pb-8"
        description="Earnings performance over the last 6 months"
        title="Revenue Overview"
        actions={
          <div className="flex gap-2">
            {dashboardPage.chartTabs.map((tab) => (
              <Button
                key={tab.key}
                size="sm"
                variant={chartView === tab.key ? "solid" : "surface"}
                className="rounded-lg px-4 py-2 text-xs font-semibold shadow-none"
                onClick={() => setChartView(tab.key)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        }
      >
        <ChartBars bars={dashboardPage.chartData[chartView]} />
      </SectionCard>

      <SectionCard
        className="rounded-2xl"
        contentClassName="p-0"
        headerClassName="bg-white"
        title="Recent Bookings"
        actions={
          <Button variant="ghost" className="px-0 text-sm font-semibold">
            View All Bookings
          </Button>
        }
      >
        <DataTable
          rows={dashboardPage.recentBookings}
          columns={[
            { key: "id", label: "ID", className: "text-xs font-bold uppercase tracking-wider text-slate-500" },
            { key: "customer", label: "Customer", className: "text-xs font-bold uppercase tracking-wider text-slate-500" },
            { key: "tour", label: "Tour", className: "text-xs font-bold uppercase tracking-wider text-slate-500" },
            { key: "date", label: "Date", className: "text-xs font-bold uppercase tracking-wider text-slate-500" },
            { key: "amount", label: "Amount", className: "text-xs font-bold uppercase tracking-wider text-slate-500" },
            { key: "status", label: "Status", className: "text-xs font-bold uppercase tracking-wider text-slate-500" },
            { key: "action", label: "Action", className: "text-right text-xs font-bold uppercase tracking-wider text-slate-500" },
          ]}
          headClassName="bg-surface-container-low"
          bodyClassName="divide-y divide-slate-50"
          renderRow={(booking) => (
            <tr key={booking.id} className="transition-colors hover:bg-slate-50/50">
              <td className="px-6 py-4 text-sm font-semibold text-on-surface">{booking.id}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${booking.initialsClassName}`}>
                    {booking.initials}
                  </div>
                  <span className="text-sm font-medium text-on-surface">{booking.customer}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">{booking.tour}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{booking.date}</td>
              <td className="px-6 py-4 text-sm font-bold text-on-surface">{booking.amount}</td>
              <td className="px-6 py-4">
                <StatusBadge label={booking.status} tone={booking.statusTone} className="normal-case tracking-normal" />
              </td>
              <td className="px-6 py-4 text-right">
                <IconButton icon="more_vert" variant="clean" />
              </td>
            </tr>
          )}
        />
      </SectionCard>
    </div>
  );
}

