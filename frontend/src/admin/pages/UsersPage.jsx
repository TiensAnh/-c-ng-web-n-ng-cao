import { useOutletContext } from "react-router-dom";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import HeroSection from "../components/HeroSection";
import Icon from "../components/Icon";
import IconButton from "../components/IconButton";
import SectionCard from "../components/SectionCard";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { usersPage } from "../services/adminService";
import { normalizeText } from "../utils/formatters";

export default function UsersPage() {
  const { topbarSearch } = useOutletContext();

  useDocumentTitle(usersPage.title);

  const visibleUsers = topbarSearch.trim()
    ? usersPage.rows.filter((user) =>
        normalizeText(`${user.name} ${user.email} ${user.role} ${user.status}`).includes(
          normalizeText(topbarSearch),
        ),
      )
    : usersPage.rows;

  return (
    <div className="admin-page-shell">
      <HeroSection
        title="User Directory"
        description="Manage access, roles, and account status for all platform members."
        actions={
          <>
            <Button variant="secondary" icon="file_download">
              Export List
            </Button>
            <Button icon="person_add">Invite User</Button>
          </>
        }
      />

      <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <StatCard className="border-l-4 border-primary" label="Total Users" value="12,842">
          <div className="mt-2 flex items-center gap-1 text-xs font-medium text-green-600">
            <Icon name="trending_up" className="text-sm" />
            8% vs last month
          </div>
        </StatCard>

        <article className="surface-card p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Active Now</p>
          <h3 className="mt-1 font-headline text-2xl font-extrabold text-on-surface">1,402</h3>
          <div className="mt-3 flex -space-x-2">
            {usersPage.stats[1].avatars.map((avatar, index) => (
              <img
                key={`active-${index + 1}`}
                src={avatar}
                alt={`Active user ${index + 1}`}
                className="h-6 w-6 rounded-full border-2 border-white object-cover"
              />
            ))}
            <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[10px] font-bold text-slate-500">
              +1.4k
            </span>
          </div>
        </article>

        <StatCard className="border-l-4 border-tertiary" label="Pending Verifications" value="42">
          <p className="mt-2 text-xs font-medium text-amber-600">Needs attention</p>
        </StatCard>

        <StatCard className="border-l-4 border-error" label="Blocked Accounts" value="12">
          <p className="mt-2 text-xs font-medium text-slate-400">Compliance flagged</p>
        </StatCard>
      </section>

      <SectionCard
        title="User Database"
        contentClassName="p-0"
        headerClassName="border-b border-white bg-surface-container-low"
        actions={
          <div className="flex gap-2">
            <IconButton icon="filter_list" />
            <IconButton icon="more_vert" />
          </div>
        }
        footer={
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4">
            <span className="text-xs font-medium text-slate-500">
              Showing <span className="text-on-surface">{visibleUsers.length}</span> of{" "}
              <span className="text-on-surface">12,842</span> users
            </span>
            <div className="flex items-center gap-1">
              <IconButton icon="chevron_left" variant="subtle" className="border border-transparent p-1.5 text-slate-400 hover:border-slate-200" />
              <Button variant="solid" className="rounded px-2.5 py-1 text-xs shadow-none">
                1
              </Button>
              <Button variant="secondary" className="rounded px-2.5 py-1 text-xs text-slate-600 shadow-none">
                2
              </Button>
              <Button variant="secondary" className="rounded px-2.5 py-1 text-xs text-slate-600 shadow-none">
                3
              </Button>
              <span className="px-2 text-xs text-slate-400">...</span>
              <Button variant="secondary" className="rounded px-2.5 py-1 text-xs text-slate-600 shadow-none">
                428
              </Button>
              <IconButton icon="chevron_right" variant="subtle" className="border border-transparent p-1.5 text-slate-400 hover:border-slate-200" />
            </div>
          </div>
        }
      >
        <DataTable
          rows={visibleUsers}
          columns={[
            { key: "details", label: "User Details", className: "text-xs font-bold uppercase tracking-wider text-slate-500" },
            { key: "role", label: "Role", className: "text-xs font-bold uppercase tracking-wider text-slate-500" },
            { key: "status", label: "Status", className: "text-xs font-bold uppercase tracking-wider text-slate-500" },
            { key: "date", label: "Reg. Date", className: "text-xs font-bold uppercase tracking-wider text-slate-500" },
            { key: "actions", label: "Actions", className: "text-right text-xs font-bold uppercase tracking-wider text-slate-500" },
          ]}
          headClassName="bg-slate-50"
          bodyClassName="divide-y divide-slate-100"
          renderRow={(user) => (
            <tr key={user.id} className="group transition-colors hover:bg-surface-container-low">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover shadow-sm" />
                  <div>
                    <p className="text-sm font-semibold text-on-surface">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge label={user.role} tone={user.roleTone} className="tracking-tight" />
              </td>
              <td className="px-6 py-4">
                <div className={`flex items-center gap-1.5 text-xs font-medium ${user.statusTone === "success" ? "text-green-600" : user.statusTone === "blocked" ? "text-error" : "text-slate-400"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${user.statusTone === "success" ? "bg-green-500" : user.statusTone === "blocked" ? "bg-error" : "bg-slate-300"}`} />
                  {user.status}
                </div>
              </td>
              <td className="px-6 py-4 text-xs font-medium text-slate-500">{user.registeredAt}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant={user.actionLabel === "Unblock" ? "secondary" : "danger"}
                    className="opacity-0 transition-all group-hover:opacity-100 text-xs font-bold"
                  >
                    {user.actionLabel}
                  </Button>
                  <IconButton icon="edit" variant="clean" />
                </div>
              </td>
            </tr>
          )}
        />
      </SectionCard>

      <section className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <article className="relative overflow-hidden rounded-2xl bg-surface-container-low p-8">
          <div className="relative z-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Icon name="shield_person" className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-on-surface">Platform Access Control</h3>
            <p className="mt-2 max-w-sm text-sm text-on-surface-variant">
              Review system-wide permissions and security protocols. Admin roles grant full CRUD capabilities across tours and financial reports.
            </p>
            <Button variant="ghost" className="mt-6 px-0 text-sm font-bold">
              Configure Permissions
            </Button>
          </div>
          <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        </article>
        <article className="rounded-2xl border border-dashed border-slate-300 bg-surface-container-low p-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary/10">
            <Icon name="history" className="text-tertiary" />
          </div>
          <h3 className="text-xl font-bold text-on-surface">Audit Logs</h3>
          <p className="mt-2 max-w-sm text-sm text-on-surface-variant">
            Track user modification history, status changes, and administrative actions for compliance and security auditing.
          </p>
          <Button variant="ghost" className="mt-6 px-0 text-sm font-bold text-tertiary hover:text-tertiary">
            View Activity Logs
          </Button>
        </article>
      </section>
    </div>
  );
}

