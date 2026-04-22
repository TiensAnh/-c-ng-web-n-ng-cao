import { useEffect, useState } from 'react';
import Button from '../components/Button';
import ChartBars from '../components/ChartBars';
import DataTable from '../components/DataTable';
import Icon from '../components/Icon';
import IconButton from '../components/IconButton';
import SectionCard from '../components/SectionCard';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useAdminAuth } from '../context/AdminAuthContext';
import { getDashboardRequest } from '../services/dashboardApiService';

const INITIAL_DASHBOARD = {
  summaryCards: [],
  chartTabs: [{ key: 'monthly', label: 'Monthly' }],
  chartData: { monthly: [{ label: 'N/A', height: 36, active: true }] },
  recentBookings: [],
};

export default function DashboardPage() {
  const { adminToken } = useAdminAuth();
  const [dashboardData, setDashboardData] = useState(INITIAL_DASHBOARD);
  const [chartView, setChartView] = useState('monthly');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useDocumentTitle('ADN Travel - Admin Dashboard');

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const response = await getDashboardRequest(adminToken);

        if (!isMounted) {
          return;
        }

        setDashboardData(response);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setDashboardData(INITIAL_DASHBOARD);
        setLoadError(error.message || 'Khong the tai dashboard luc nay.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (adminToken) {
      loadDashboard();
    }

    return () => {
      isMounted = false;
    };
  }, [adminToken]);

  return (
    <div className="admin-page-shell">
      {loadError ? (
        <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm text-rose-600">
          {loadError}
        </div>
      ) : null}

      <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardData.summaryCards.map((card) => (
          <StatCard
            key={card.id}
            className="transition-shadow hover:shadow-md"
            icon={<Icon name={card.icon} />}
            iconPanelClassName={card.iconPanelClassName}
            label={card.label}
            value={isLoading ? '...' : card.value}
          />
        ))}
      </section>

      <SectionCard
        className="mb-8 rounded-2xl"
        contentClassName="px-8 pb-8"
        description="Revenue captured from successful payments in the last 6 months"
        title="Revenue Overview"
        actions={(
          <div className="flex gap-2">
            {dashboardData.chartTabs.map((tab) => (
              <Button
                key={tab.key}
                size="sm"
                variant={chartView === tab.key ? 'solid' : 'surface'}
                className="rounded-lg px-4 py-2 text-xs font-semibold shadow-none"
                onClick={() => setChartView(tab.key)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        )}
      >
        <ChartBars bars={dashboardData.chartData[chartView] || INITIAL_DASHBOARD.chartData.monthly} />
      </SectionCard>

      <SectionCard
        className="rounded-2xl"
        contentClassName="p-0"
        headerClassName="bg-white"
        title="Recent Bookings"
        actions={(
          <Button variant="ghost" className="px-0 text-sm font-semibold">
            Live Data
          </Button>
        )}
      >
        <DataTable
          rows={
            dashboardData.recentBookings.length
              ? dashboardData.recentBookings
              : [{ id: 'empty', empty: true }]
          }
          columns={[
            { key: 'id', label: 'ID', className: 'text-xs font-bold uppercase tracking-wider text-slate-500' },
            { key: 'customer', label: 'Customer', className: 'text-xs font-bold uppercase tracking-wider text-slate-500' },
            { key: 'tour', label: 'Tour', className: 'text-xs font-bold uppercase tracking-wider text-slate-500' },
            { key: 'date', label: 'Date', className: 'text-xs font-bold uppercase tracking-wider text-slate-500' },
            { key: 'amount', label: 'Amount', className: 'text-xs font-bold uppercase tracking-wider text-slate-500' },
            { key: 'status', label: 'Status', className: 'text-xs font-bold uppercase tracking-wider text-slate-500' },
            { key: 'action', label: 'Action', className: 'text-right text-xs font-bold uppercase tracking-wider text-slate-500' },
          ]}
          headClassName="bg-surface-container-low"
          bodyClassName="divide-y divide-slate-50"
          renderRow={(booking) => {
            if (booking.empty) {
              return (
                <tr key={booking.id}>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-slate-500">
                    {isLoading ? 'Dang tai dashboard...' : 'Chua co booking nao.'}
                  </td>
                </tr>
              );
            }

            return (
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
            );
          }}
        />
      </SectionCard>
    </div>
  );
}
