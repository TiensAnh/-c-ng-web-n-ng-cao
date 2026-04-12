import { useState } from "react";
import AdminActionModal from "../components/AdminActionModal";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import HeroSection from "../components/HeroSection";
import Icon from "../components/Icon";
import IconButton from "../components/IconButton";
import SearchInput from "../components/SearchInput";
import SectionCard from "../components/SectionCard";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useSearchFilter from "../hooks/useSearchFilter";
import { bookingsPage } from "../services/adminService";
import { getInitials } from "../utils/formatters";

const BOOKING_STATUS_TONES = {
  Cancelled: "blocked",
  Confirmed: "success",
  Pending: "pending",
};

function formatCount(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatUsd(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return value;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function parseUsd(value) {
  const amount = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

function createBookingId(rows) {
  const largestId = rows.reduce((currentLargest, booking) => {
    const numericId = Number(booking.id.replace(/\D/g, ""));
    return Number.isFinite(numericId) ? Math.max(currentLargest, numericId) : currentLargest;
  }, 0);

  return `#HZ-${largestId + 1}`;
}

function formatTravelDate(value) {
  if (!value) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default function BookingsPage() {
  const [bookingRows, setBookingRows] = useState(bookingsPage.rows);
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { query, setQuery, filteredItems } = useSearchFilter(
    bookingRows,
    (booking) => `${booking.id} ${booking.customer} ${booking.email} ${booking.tour} ${booking.status}`,
  );

  useDocumentTitle(bookingsPage.title);

  const statusOptions = ["All statuses", ...new Set(bookingRows.map((booking) => booking.status))];
  const visibleBookings = filteredItems.filter(
    (booking) => selectedStatus === "All statuses" || booking.status === selectedStatus,
  );
  const bookingStats = bookingsPage.stats.map((stat) => {
    if (stat.id === "total") {
      return { ...stat, value: formatCount(bookingRows.length) };
    }

    if (stat.id === "pending") {
      return {
        ...stat,
        value: formatCount(bookingRows.filter((booking) => booking.status === "Pending").length),
      };
    }

    if (stat.id === "confirmed") {
      return {
        ...stat,
        value: formatCount(bookingRows.filter((booking) => booking.status === "Confirmed").length),
      };
    }

    if (stat.id === "revenue") {
      return {
        ...stat,
        value: formatUsd(bookingRows.reduce((sum, booking) => sum + parseUsd(booking.total), 0)),
      };
    }

    return stat;
  });

  const handleAddBooking = (values) => {
    setBookingRows((currentRows) => [
      {
        id: createBookingId(currentRows),
        customer: values.customer.trim(),
        email: values.email.trim(),
        initials: getInitials(values.customer),
        initialsClassName: "bg-primary-fixed text-on-primary-fixed-variant",
        tour: values.tour.trim(),
        subtitle: values.subtitle.trim() || "Manual reservation",
        travelDate: formatTravelDate(values.travelDate),
        total: formatUsd(values.total),
        status: values.status,
        statusTone: BOOKING_STATUS_TONES[values.status] ?? "pending",
      },
      ...currentRows,
    ]);
  };

  return (
    <div className="admin-page-shell">
      <HeroSection
        title={bookingsPage.title.replace(" | The Horizon Admin", "")}
        description={bookingsPage.description}
        actions={
          <>
            <Button variant="secondary">Export Report</Button>
            <Button icon="add" onClick={() => setIsCreateModalOpen(true)}>
              New Reservation
            </Button>
          </>
        }
      />

      <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {bookingStats.map((stat) => (
          <StatCard
            key={stat.id}
            className={stat.id === "pending" ? "border-l-4 border-tertiary-fixed" : stat.id === "confirmed" ? "border-l-4 border-green-500" : ""}
            label={stat.label}
            value={stat.value}
          >
            <p className={`mt-2 text-xs font-medium ${stat.metaClassName}`}>{stat.meta}</p>
          </StatCard>
        ))}
      </section>

      <section className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-container-low p-4">
        <div className="flex flex-1 flex-wrap items-center gap-4">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by ID, name or tour..."
            containerClassName="min-w-[280px] flex-1 max-w-md"
            className="bg-surface-container-lowest"
          />
          <div className="relative rounded-lg bg-surface-container-lowest px-4">
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="appearance-none bg-transparent py-2 pr-8 text-sm"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <Icon name="expand_more" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">Rows per page:</span>
          <select className="bg-transparent text-xs font-bold text-primary">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
      </section>

      <SectionCard
        contentClassName="p-0"
        footer={
          <div className="flex items-center justify-between bg-surface-container-low px-6 py-4">
            <p className="text-xs font-medium text-slate-500">
              Showing 1 to {visibleBookings.length} of {bookingRows.length} entries
            </p>
            <div className="flex gap-1">
              <IconButton icon="chevron_left" variant="subtle" className="h-8 w-8 rounded-lg p-0 text-slate-400" />
              <Button variant="solid" className="h-8 w-8 rounded-lg px-0 shadow-none">
                1
              </Button>
              <Button variant="secondary" className="h-8 w-8 rounded-lg px-0 text-on-surface shadow-none">
                2
              </Button>
              <Button variant="secondary" className="h-8 w-8 rounded-lg px-0 text-on-surface shadow-none">
                3
              </Button>
              <span className="flex h-8 w-8 items-center justify-center text-slate-400">...</span>
              <Button variant="secondary" className="h-8 w-8 rounded-lg px-0 text-on-surface shadow-none">
                256
              </Button>
              <IconButton icon="chevron_right" variant="subtle" className="h-8 w-8 rounded-lg p-0 text-slate-600" />
            </div>
          </div>
        }
      >
        <DataTable
          rows={visibleBookings}
          columns={[
            { key: "booking-id", label: "Booking ID", className: "text-xs font-bold uppercase tracking-wider text-on-surface-variant" },
            { key: "customer", label: "Customer Name", className: "text-xs font-bold uppercase tracking-wider text-on-surface-variant" },
            { key: "tour", label: "Tour Expedition", className: "text-xs font-bold uppercase tracking-wider text-on-surface-variant" },
            { key: "date", label: "Travel Date", className: "text-xs font-bold uppercase tracking-wider text-on-surface-variant" },
            { key: "total", label: "Total Price", className: "text-right text-xs font-bold uppercase tracking-wider text-on-surface-variant" },
            { key: "status", label: "Status", className: "text-center text-xs font-bold uppercase tracking-wider text-on-surface-variant" },
            { key: "actions", label: "Actions", className: "text-right text-xs font-bold uppercase tracking-wider text-on-surface-variant" },
          ]}
          headClassName="bg-surface-container-low"
          bodyClassName="divide-y divide-slate-100"
          renderRow={(booking) => (
            <tr key={booking.id} className="group transition-colors hover:bg-slate-50">
              <td className="px-6 py-5 font-mono text-xs font-bold text-blue-700">{booking.id}</td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={booking.avatar}
                    alt={booking.customer}
                    initials={booking.initials}
                    className="h-8 w-8 rounded-full"
                    fallbackClassName={booking.initialsClassName}
                  />
                  <div>
                    <p className="text-sm font-semibold text-on-surface">{booking.customer}</p>
                    <p className="text-[11px] text-slate-500">{booking.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <p className="text-sm font-medium text-on-surface">{booking.tour}</p>
                <p className="text-[11px] text-slate-400">{booking.subtitle}</p>
              </td>
              <td className="px-6 py-5 text-sm text-on-surface-variant">{booking.travelDate}</td>
              <td className="px-6 py-5 text-right text-sm font-bold text-on-surface">{booking.total}</td>
              <td className="px-6 py-5 text-center">
                <StatusBadge
                  label={booking.status}
                  tone={booking.statusTone}
                  className="normal-case tracking-normal"
                />
              </td>
              <td className="px-6 py-5">
                <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button variant="ghost" className="px-0 text-xs font-bold">
                    Xem chi tiet
                  </Button>
                  <Button variant="ghost" className="px-0 text-xs font-bold text-on-surface-variant hover:text-on-surface">
                    Cap nhat
                  </Button>
                </div>
              </td>
            </tr>
          )}
        />
      </SectionCard>

      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <article className="relative overflow-hidden rounded-2xl bg-primary-container/10 p-8 md:col-span-2">
          <div className="relative z-10 max-w-md">
            <h3 className="text-xl font-bold text-primary">{bookingsPage.insight.title}</h3>
            <p className="mt-2 text-sm text-on-secondary-container">{bookingsPage.insight.description}</p>
            <Button variant="ghost" className="mt-6 px-0 text-sm font-bold">
              {bookingsPage.insight.actionLabel}
            </Button>
          </div>
          <div
            className="absolute right-0 top-0 h-full w-1/3 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${bookingsPage.insight.image})` }}
          />
        </article>
        <article className="rounded-2xl border border-primary/5 bg-surface-container p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon name="support_agent" />
          </div>
          <h3 className="text-sm font-bold text-on-surface">Need Concierge Support?</h3>
          <p className="mb-4 mt-1 text-xs text-on-surface-variant">
            Chat with our destination experts for booking overrides.
          </p>
          <Button variant="secondary" className="w-full justify-center text-xs font-bold">
            Start Chat
          </Button>
        </article>
      </section>

      <AdminActionModal
        isOpen={isCreateModalOpen}
        title="Tao reservation moi"
        description="Popup nay cho phep bo sung dat cho thu cong ngay trong khu vuc quan ly booking."
        eyebrow="Bookings desk"
        icon="calendar_add_on"
        note="Reservation moi se xuat hien ngay dau bang, dong thoi cap nhat tong booking, pending, confirmed va doanh thu."
        submitLabel="Tao reservation"
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleAddBooking}
        initialValues={{ status: "Pending" }}
        features={[
          {
            icon: "group_add",
            title: "Nhan thong tin khach nhanh",
            description: "Them khach, email va tour dang quan tam chi trong mot popup gon.",
          },
          {
            icon: "credit_score",
            title: "Tinh tong tien tu dong",
            description: "Gia tri nhap vao se duoc dinh dang thanh USD de phu hop bang booking hien tai.",
          },
          {
            icon: "insights",
            title: "Thong ke tu dong doi",
            description: "The pending, confirmed va revenue se phan anh ngay du lieu moi vua tao.",
          },
        ]}
        fields={[
          {
            name: "customer",
            label: "Customer name",
            placeholder: "Vi du: Nguyen Lan Anh",
            required: true,
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            autoComplete: "email",
            placeholder: "guest@example.com",
            required: true,
          },
          {
            name: "tour",
            label: "Tour expedition",
            placeholder: "Vi du: Da Nang Beach Escape",
            required: true,
          },
          {
            name: "travelDate",
            label: "Travel date",
            type: "date",
            required: true,
          },
          {
            name: "total",
            label: "Total price",
            type: "number",
            min: "0",
            step: "50",
            placeholder: "1240",
            hint: "Nhap so tien goc, he thong se tu chuyen sang dinh dang USD.",
            required: true,
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            options: ["Pending", "Confirmed", "Cancelled"],
            required: true,
          },
          {
            name: "subtitle",
            label: "Reservation note",
            type: "textarea",
            placeholder: "Ghi chu ngan ve goi dich vu, uu dai, ghi chu noi bo...",
            span: 2,
          },
        ]}
      />
    </div>
  );
}

