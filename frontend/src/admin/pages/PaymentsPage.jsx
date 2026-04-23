import { useEffect, useMemo, useState } from 'react';
import Button from '../components/Button';
import DataTable from '../components/DataTable';
import Icon from '../components/Icon';
import IconButton from '../components/IconButton';
import SearchInput from '../components/SearchInput';
import SectionCard from '../components/SectionCard';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useAdminAuth } from '../context/AdminAuthContext';
import { confirmAdminPaymentRequest, getAdminPaymentsRequest } from '../services/paymentsApiService';
import { normalizeText } from '../utils/formatters';

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

export default function PaymentsPage() {
  const { adminToken } = useAdminAuth();
  const [transactions, setTransactions] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [actionId, setActionId] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [loadError, setLoadError] = useState('');

  useDocumentTitle('Payments & Transactions | ADN Travel Admin');

  useEffect(() => {
    let isMounted = true;

    const loadPayments = async () => {
      setIsLoading(true);
      setLoadError('');
      setActionMessage('');

      try {
        const response = await getAdminPaymentsRequest(adminToken);

        if (!isMounted) {
          return;
        }

        setTransactions(response.payments || []);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setTransactions([]);
        setLoadError(error.message || 'Khong the tai giao dich luc nay.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (adminToken) {
      loadPayments();
    }

    return () => {
      isMounted = false;
    };
  }, [adminToken]);

  const handleConfirmPayment = async (transaction) => {
    if (!adminToken || !transaction?.rawPaymentId) {
      return;
    }

    setActionId(transaction.rawPaymentId);
    setLoadError('');
    setActionMessage('');

    try {
      const response = await confirmAdminPaymentRequest(transaction.rawPaymentId, adminToken);

      setTransactions((currentTransactions) => currentTransactions.map((currentTransaction) => (
        currentTransaction.rawPaymentId === transaction.rawPaymentId
          ? {
              ...currentTransaction,
              ...(response.payment || {}),
              bookingId: currentTransaction.bookingId,
              customer: currentTransaction.customer,
              initials: currentTransaction.initials,
              initialsClassName: currentTransaction.initialsClassName,
              tourTitle: currentTransaction.tourTitle,
            }
          : currentTransaction
      )));

      setActionMessage(response.message || 'Da xac nhan giao dich thanh cong.');
    } catch (error) {
      setLoadError(error.message || 'Khong the xac nhan giao dich luc nay.');
    } finally {
      setActionId('');
    }
  };

  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return transactions;
    }

    return transactions.filter((transaction) =>
      normalizeText(
        `${transaction.id} ${transaction.bookingId} ${transaction.customer} ${transaction.method} ${transaction.status} ${transaction.tourTitle}`,
      ).includes(normalizeText(query)),
    );
  }, [query, transactions]);

  const successfulPayments = transactions.filter((transaction) => transaction.status === 'SUCCESS');
  const totalRevenue = successfulPayments.reduce((sum, transaction) => sum + transaction.rawAmount, 0);
  const pendingPayments = transactions.filter((transaction) => transaction.status === 'PENDING');

  const summaryCards = [
    {
      id: 'today',
      icon: 'trending_up',
      iconPanelClassName: 'bg-tertiary-fixed text-tertiary',
      label: 'Successful Payments',
      value: isLoading ? '...' : `${successfulPayments.length}`,
      badge: formatCurrency(totalRevenue),
      badgeClassName: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'pending',
      icon: 'pending_actions',
      iconPanelClassName: 'bg-secondary-container text-secondary',
      label: 'Pending Payments',
      value: isLoading ? '...' : `${pendingPayments.length}`,
      badge: `${pendingPayments.length} items`,
      badgeClassName: 'bg-slate-100 text-slate-500',
      progress: transactions.length ? Math.round((pendingPayments.length / transactions.length) * 100) : 0,
    },
  ];

  return (
    <div className="admin-page-shell">
      {actionMessage ? (
        <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
          {actionMessage}
        </div>
      ) : null}

      {loadError ? (
        <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm text-rose-600">
          {loadError}
        </div>
      ) : null}

      <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4">
        <article className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-container p-6 text-on-primary shadow-lg md:col-span-2">
          <div className="relative z-10">
            <p className="mb-1 text-sm font-medium opacity-80">Total Treasury Balance</p>
            <h1 className="mb-6 text-3xl font-extrabold tracking-tight">{isLoading ? '...' : formatCurrency(totalRevenue)}</h1>
            <div className="flex flex-wrap gap-4">
              <Button variant="glass" icon="account_balance_wallet" disabled>
                Withdraw Funds
              </Button>
              <Button variant="white" icon="analytics" disabled>
                View Report
              </Button>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        </article>

        {summaryCards.map((card) => (
          <StatCard
            key={card.id}
            className="flex flex-col justify-between"
            icon={<Icon name={card.icon} />}
            iconPanelClassName={card.iconPanelClassName}
            label={card.label}
            value={card.value}
            badge={(
              <div className={`rounded-full px-2 py-1 text-[10px] font-bold ${card.badgeClassName}`}>
                {card.badge}
              </div>
            )}
          >
            {card.progress !== undefined ? (
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
        actions={(
          <div className="flex flex-wrap gap-3">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search transactions..."
              containerClassName="w-64"
            />
            <Button variant="outline" icon="filter_list" disabled>
              Filters
            </Button>
          </div>
        )}
        footer={(
          <div className="flex items-center justify-between border-t border-surface-container bg-surface-container/20 px-8 py-4">
            <p className="text-xs text-slate-500">
              Showing <span className="font-bold text-on-surface">{filteredItems.length}</span> of {transactions.length} transactions
            </p>
            <div className="flex gap-2">
              <IconButton icon="chevron_left" variant="subtle" className="border border-slate-200 text-slate-400" disabled />
              <IconButton icon="chevron_right" variant="subtle" className="border border-slate-200 text-slate-600" disabled />
            </div>
          </div>
        )}
      >
        <DataTable
          rows={filteredItems.length ? filteredItems : [{ id: 'empty', empty: true }]}
          columns={[
            { key: 'transaction-id', label: 'Transaction ID', className: 'px-8 text-[11px] font-bold uppercase tracking-widest text-slate-400' },
            { key: 'booking-id', label: 'Booking ID', className: 'text-[11px] font-bold uppercase tracking-widest text-slate-400' },
            { key: 'customer', label: 'Customer', className: 'text-[11px] font-bold uppercase tracking-widest text-slate-400' },
            { key: 'method', label: 'Method', className: 'text-[11px] font-bold uppercase tracking-widest text-slate-400' },
            { key: 'date', label: 'Date', className: 'text-[11px] font-bold uppercase tracking-widest text-slate-400' },
            { key: 'amount', label: 'Amount', className: 'text-[11px] font-bold uppercase tracking-widest text-slate-400' },
            { key: 'status', label: 'Status', className: 'text-[11px] font-bold uppercase tracking-widest text-slate-400' },
            { key: 'action', label: 'Action', className: 'px-8 text-right text-[11px] font-bold uppercase tracking-widest text-slate-400' },
          ]}
          headClassName="bg-surface-container/30"
          bodyClassName="divide-y divide-surface-container-low"
          renderRow={(transaction) => {
            if (transaction.empty) {
              return (
                <tr key={transaction.id}>
                  <td colSpan={8} className="px-8 py-10 text-center text-sm text-slate-500">
                    {isLoading ? 'Dang tai giao dich...' : 'Khong co giao dich nao phu hop.'}
                  </td>
                </tr>
              );
            }

            return (
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
                  {transaction.methodTone === 'momo' ? (
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
                  {transaction.status === 'PENDING' ? (
                    <Button
                      variant="outline"
                      icon="check_circle"
                      disabled={actionId === transaction.rawPaymentId}
                      onClick={() => handleConfirmPayment(transaction)}
                    >
                      {actionId === transaction.rawPaymentId ? 'Dang xac nhan...' : 'Xac nhan'}
                    </Button>
                  ) : (
                    <IconButton icon="check_circle" variant="clean" disabled />
                  )}
                </td>
              </tr>
            );
          }}
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
              This screen now reads payment history from backend data joined with booking, user, and tour records.
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
              If you need reconciliation, refund, or payout actions, those still need dedicated backend endpoints and business rules.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
