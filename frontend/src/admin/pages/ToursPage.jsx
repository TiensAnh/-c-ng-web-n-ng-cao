import { useState } from "react";
import { Link } from "react-router-dom";
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
import { toursPage } from "../services/adminService";
import { ROUTES } from "../utils/routes";

function formatCount(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

export default function ToursPage() {
  const [tourRows, setTourRows] = useState(toursPage.rows);
  const [selectedLocation, setSelectedLocation] = useState("All locations");
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const { query, setQuery, filteredItems } = useSearchFilter(
    tourRows,
    (tour) => `${tour.name} ${tour.id} ${tour.location} ${tour.status}`,
  );

  useDocumentTitle("Tours | The Horizon Admin");

  const locationOptions = ["All locations", ...new Set(tourRows.map((tour) => tour.location))];
  const statusOptions = ["All statuses", ...new Set(tourRows.map((tour) => tour.status))];

  const visibleTours = filteredItems.filter((tour) => {
    const matchesLocation = selectedLocation === "All locations" || tour.location === selectedLocation;
    const matchesStatus = selectedStatus === "All statuses" || tour.status === selectedStatus;
    return matchesLocation && matchesStatus;
  });

  const tourSummaryCards = toursPage.summaryCards.map((card) => {
    if (card.id === "total") {
      return { ...card, value: formatCount(tourRows.length) };
    }

    if (card.id === "active") {
      return {
        ...card,
        value: formatCount(tourRows.filter((tour) => tour.status === "Active").length),
      };
    }

    return card;
  });

  return (
    <div className="admin-page-shell">
      <HeroSection
        title={toursPage.title}
        description={toursPage.description}
        actions={
          <Button as={Link} icon="add" iconClassName="text-lg" size="lg" to={ROUTES.newTour}>
            Them Tour moi
          </Button>
        }
      />

      <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="rounded-2xl bg-surface-container-low p-2 lg:col-span-8">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Tim kiem tour theo ten hoac ma so..."
            className="rounded-xl bg-surface-container-lowest py-4 shadow-sm"
          />
        </div>
        <div className="flex gap-3 lg:col-span-4">
          <div className="relative flex-1 rounded-xl bg-surface-container-low px-4">
            <select
              value={selectedLocation}
              onChange={(event) => setSelectedLocation(event.target.value)}
              className="w-full appearance-none bg-transparent py-4 pr-8 text-sm font-medium text-slate-600"
            >
              {locationOptions.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <Icon name="expand_more" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <div className="relative flex-1 rounded-xl bg-surface-container-low px-4">
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="w-full appearance-none bg-transparent py-4 pr-8 text-sm font-medium text-slate-600"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <Icon name="expand_more" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </section>

      <SectionCard
        className="rounded-[2rem] border-none"
        contentClassName="p-0"
        footer={
          <div className="flex items-center justify-between bg-surface-container-low px-8 py-6">
            <p className="text-xs font-medium text-slate-500">
              Showing 1 to {visibleTours.length} of {tourRows.length} results
            </p>
            <div className="flex gap-2">
              <IconButton icon="chevron_left" variant="subtle" className="border border-primary/10 bg-surface-container-lowest text-slate-400" />
              <Button variant="solid" className="h-10 w-10 rounded-lg px-0 shadow-none">
                1
              </Button>
              <Button variant="secondary" className="h-10 w-10 rounded-lg px-0 shadow-none text-slate-600">
                2
              </Button>
              <Button variant="secondary" className="h-10 w-10 rounded-lg px-0 shadow-none text-slate-600">
                3
              </Button>
              <IconButton icon="chevron_right" variant="subtle" className="border border-primary/10 bg-surface-container-lowest text-slate-400" />
            </div>
          </div>
        }
      >
        <DataTable
          rows={visibleTours}
          columns={[
            { key: "image", label: "Image", className: "px-8 text-xs font-extrabold uppercase tracking-widest text-slate-500" },
            { key: "details", label: "Tour Details", className: "text-xs font-extrabold uppercase tracking-widest text-slate-500" },
            { key: "location", label: "Location", className: "text-xs font-extrabold uppercase tracking-widest text-slate-500" },
            { key: "duration", label: "Duration", className: "text-xs font-extrabold uppercase tracking-widest text-slate-500" },
            { key: "price", label: "Price", className: "text-xs font-extrabold uppercase tracking-widest text-slate-500" },
            { key: "status", label: "Status", className: "text-xs font-extrabold uppercase tracking-widest text-slate-500" },
            { key: "actions", label: "Actions", className: "px-8 text-right text-xs font-extrabold uppercase tracking-widest text-slate-500" },
          ]}
          headClassName="bg-surface-container-low"
          bodyClassName="divide-y divide-surface-container-low"
          renderRow={(tour) => (
            <tr key={tour.id} className="group transition-colors hover:bg-surface-container-low">
              <td className="px-8 py-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-xl shadow-md">
                  <img src={tour.image} alt={tour.name} className="h-full w-full object-cover" />
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="font-bold text-on-surface transition-colors group-hover:text-primary">{tour.name}</p>
                <p className="mt-1 text-xs text-slate-400">ID: {tour.id}</p>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1 text-slate-600">
                  <Icon name="location_on" className="text-sm" />
                  <span className="text-sm">{tour.location}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-slate-700">{tour.duration}</td>
              <td className="px-6 py-4 text-sm font-bold text-primary">{tour.price}</td>
              <td className="px-6 py-4">
                <StatusBadge
                  label={tour.status}
                  tone={tour.status === "Active" ? "success" : "draft"}
                  showDot
                  className="rounded-full"
                />
              </td>
              <td className="px-8 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <IconButton icon="edit" variant="clean" className="hover:bg-white" />
                  <IconButton icon="delete" variant="danger" />
                </div>
              </td>
            </tr>
          )}
        />
      </SectionCard>

      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
        {tourSummaryCards.map((card) => (
          <StatCard
            key={card.id}
            className={`${card.className} flex h-40 flex-col justify-between p-6`}
            icon={<Icon name={card.icon} />}
            iconPanelClassName="flex h-10 w-10 items-center justify-center rounded-xl"
            label={card.label}
            value={card.value}
          />
        ))}
        <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-container p-8 md:col-span-2">
          <div className="relative z-10">
            <p className="mb-1 font-medium text-white/80">{toursPage.tip.label}</p>
            <h3 className="max-w-xs text-xl font-bold leading-tight text-white">{toursPage.tip.title}</h3>
          </div>
          <Icon name="auto_awesome" className="absolute -bottom-4 -right-4 rotate-12 text-[96px] text-white/10" />
        </article>
      </section>
    </div>
  );
}
