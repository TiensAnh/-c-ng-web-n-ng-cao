import Button from "../components/Button";
import DataTable from "../components/DataTable";
import Icon from "../components/Icon";
import IconButton from "../components/IconButton";
import SearchInput from "../components/SearchInput";
import SectionCard from "../components/SectionCard";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useSearchFilter from "../hooks/useSearchFilter";
import { paymentsPage } from "../services/adminService";

export default function PaymentsPage() {
  const { query, setQuery, filteredItems } = useSearchFilter(
    paymentsPage.transactions,
    (transaction) =>
      `${transaction.id} ${transaction.bookingId} ${transaction.customer} ${transaction.method} ${transaction.status}`,
  );

  useDocumentTitle(paymentsPage.title);

  return (
    <div className="admin-page-shell">
      <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4">
        <article className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-container p-6 text-on-primary shadow-lg md:col-span-2">
          <div className="relative z-10">
            <p className="mb-1 text-sm font-medium opacity-80">{paymentsPage.hero.label}</p>
            <h1 className="mb-6 text-3xl font-extrabold tracking-tight">{paymentsPage.hero.value}</h1>
            <div className="flex flex-wrap gap-4">
              <Button variant="glass" icon="account_balance_wallet">
                Withdraw Funds
              </Button>
              <Button variant="white" icon="analytics">
                View Report
              </Button>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        </article>

        {paymentsPage.summaryCards.map((card) => (
          <StatCard
            key={card.id}
            className="flex flex-col justify-between"
            icon={<Icon name={card.icon} />}
            iconPanelClassName={card.iconPanelClassName}
            label={card.label}
            value={card.value}
            badge={
              <div className={`rounded-full px-2 py-1 text-[10px] font-bold ${card.badgeClassName}`}>
                {card.badge}
              </div>
            }
          >
            {card.footer ? <p className="mt-4 text-[10px] italic text-slate-400">{card.footer}</p> : null}
            {card.progress ? (
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full bg-blue-600" style={{ width: `${card.progress}%` }} />
              </div>
            ) : null}
          </StatCard>
        ))}
      </section>

      <SectionCard
        title="Recent Transactions"
        description="Monitoring all financial activities within the ADN Travel ecosystem."
        contentClassName="p-0"
        actions={
          <div className="flex flex-wrap gap-3">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search transactions..."
              containerClassName="w-64"
            />
            <Button variant="outline" icon="filter_list">
              Filters
            </Button>
          </div>
        }
        footer={
          <div className="flex items-center justify-between border-t border-surface-container bg-surface-container/20 px-8 py-4">
            <p className="text-xs text-slate-500">
              Showing <span className="font-bold text-on-surface">1-{filteredItems.length}</span> of 124 transactions
            </p>
            <div className="flex gap-2">
              <IconButton icon="chevron_left" variant="subtle" className="border border-slate-200 text-slate-400" />
              <IconButton icon="chevron_right" variant="subtle" className="border border-slate-200 text-slate-600" />
            </div>
          </div>
        }
      >
        <DataTable
          rows={filteredItems}
          columns={[
            { key: "transaction-id", label: "Transaction ID", className: "px-8 text-[11px] font-bold uppercase tracking-widest text-slate-400" },
            { key: "booking-id", label: "Booking ID", className: "text-[11px] font-bold uppercase tracking-widest text-slate-400" },
            { key: "customer", label: "Customer", className: "text-[11px] font-bold uppercase tracking-widest text-slate-400" },
            { key: "method", label: "Method", className: "text-[11px] font-bold uppercase tracking-widest text-slate-400" },
            { key: "date", label: "Date", className: "text-[11px] font-bold uppercase tracking-widest text-slate-400" },
            { key: "amount", label: "Amount", className: "text-[11px] font-bold uppercase tracking-widest text-slate-400" },
            { key: "status", label: "Status", className: "text-[11px] font-bold uppercase tracking-widest text-slate-400" },
            { key: "action", label: "Action", className: "px-8 text-right text-[11px] font-bold uppercase tracking-widest text-slate-400" },
          ]}
          headClassName="bg-surface-container/30"
          bodyClassName="divide-y divide-surface-container-low"
          renderRow={(transaction) => (
            <tr key={transaction.id} className="transition-colors hover:bg-slate-50/50">
              <td className="px-8 py-5 font-mono text-xs text-blue-700">{transaction.id}</td>
              <td className="px-6 py-5 text-sm font-medium">{transaction.bookingId}</td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${transaction.initialsClassName}`}>
                    {transaction.initials}
                  </div>
                  <span className="text-sm font-medium">{transaction.customer}</span>
                </div>
              </td>
              <td className="px-6 py-5">
                {transaction.methodIcon ? (
                  <div className="flex items-center gap-2">
                    <img src={transaction.methodIcon} alt={transaction.method} className="h-4 w-6 rounded-[2px] object-contain" />
                    <span className="text-xs text-slate-600">{transaction.method}</span>
                  </div>
                ) : transaction.methodTone === "momo" ? (
                  <div className="flex items-center gap-2">
                    <div className="flex h-4 w-6 items-center justify-center rounded-[2px] bg-orange-500 text-[6px] font-bold text-white">
                      MOMO
                    </div>
                    <span className="text-xs text-slate-600">{transaction.method}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Icon name="payments" className="text-sm text-slate-600" />
                    <span className="text-xs text-slate-600">{transaction.method}</span>
                  </div>
                )}
              </td>
              <td className="px-6 py-5 text-xs text-slate-500">{transaction.date}</td>
              <td className="px-6 py-5 text-sm font-bold text-on-surface">{transaction.amount}</td>
              <td className="px-6 py-5">
                <StatusBadge label={transaction.status} tone={transaction.statusTone} showDot />
              </td>
              <td className="px-8 py-5 text-right">
                <IconButton icon="more_vert" variant="clean" />
              </td>
            </tr>
          )}
        />
      </SectionCard>

      <section className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <article className="flex items-center gap-6 rounded-2xl bg-surface-container-low p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
            <Icon name="security" className="text-3xl text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-on-surface">Security & Compliance</h3>
            <p className="mt-1 text-sm text-slate-500">
              ADN Travel uses PCI-DSS Level 1 compliant infrastructure for all transaction processing. All data is encrypted at rest and in transit.
            </p>
          </div>
        </article>
        <article className="flex items-center gap-6 rounded-2xl bg-surface-container-low p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
            <Icon name="support_agent" className="text-3xl text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-on-surface">Financial Support</h3>
            <p className="mt-1 text-sm text-slate-500">
              Having issues with a specific transaction? Contact our specialized finance support desk for immediate reconciliation assistance.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}

