import { useState } from "react";
import Button from "../components/Button";
import FilterChips from "../components/FilterChips";
import HeroSection from "../components/HeroSection";
import Icon from "../components/Icon";
import ReviewCard from "../components/ReviewCard";
import StatCard from "../components/StatCard";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { reviewsPage } from "../services/adminService";

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState(reviewsPage.filterOptions[0]);

  useDocumentTitle("Reviews | The Horizon Admin");

  const visibleReviews = reviewsPage.rows.filter((review) => {
    if (activeFilter === "1-2 Stars") {
      return review.rating <= 2;
    }

    if (activeFilter === "Reported") {
      return review.reported;
    }

    return true;
  });

  return (
    <div className="admin-page-shell">
      <HeroSection
        title={reviewsPage.title}
        description="Pending approvals and community feedback management."
        actions={
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-secondary-container text-xs font-bold text-on-secondary-container">
                12
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-tertiary-fixed text-xs font-bold text-on-tertiary-fixed">
                45
              </div>
            </div>
            <span className="text-sm font-semibold text-slate-500">Pending reviews</span>
          </div>
        }
      />

      <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-4">
        {reviewsPage.stats.map((stat) => (
          <StatCard
            key={stat.id}
            className={stat.id === "needs-action" ? "border-l-4 border-tertiary-fixed bg-surface-container-low" : "bg-surface-container-low border-none"}
            label={stat.label}
            value={stat.value}
          >
            {stat.id === "avg" ? (
              <div className="mt-2 flex items-center gap-2 text-tertiary-fixed-dim">
                <Icon name="star" filled className="text-lg" />
              </div>
            ) : null}
          </StatCard>
        ))}
      </section>

      <FilterChips
        className="mb-8"
        options={reviewsPage.filterOptions}
        value={activeFilter}
        onChange={setActiveFilter}
      />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </section>

      <div className="mt-12 flex justify-center">
        <Button variant="secondary" className="rounded-full px-10 py-3 font-bold text-primary">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
}

