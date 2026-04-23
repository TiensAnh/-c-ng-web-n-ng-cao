import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import FilterChips from "../components/FilterChips";
import HeroSection from "../components/HeroSection";
import Icon from "../components/Icon";
import ReviewCard from "../components/ReviewCard";
import StatCard from "../components/StatCard";
import useDocumentTitle from "../hooks/useDocumentTitle";
import SearchInput from "../components/SearchInput";
import { useAdminAuth } from "../context/AdminAuthContext";
import {
  getAdminReviewsRequest,
  updateAdminReviewStatusRequest,
} from "../services/reviewsApiService";

export default function ReviewsPage() {
  const { adminToken } = useAdminAuth();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isUpdatingId, setIsUpdatingId] = useState(null);

  useDocumentTitle("Reviews | ADN Travel Admin");

  useEffect(() => {
    let isMounted = true;

    const loadReviews = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const response = await getAdminReviewsRequest(adminToken, {
          status: activeFilter === "LOW_RATING" ? "ALL" : activeFilter,
          search: searchQuery.trim(),
        });

        if (!isMounted) {
          return;
        }

        setReviews(response.reviews || []);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setReviews([]);
        setLoadError(error.message || "Khong the tai reviews luc nay.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (adminToken) {
      loadReviews();
    }

    return () => {
      isMounted = false;
    };
  }, [activeFilter, adminToken, searchQuery]);

  const visibleReviews = useMemo(() => reviews.filter((review) => {
    if (activeFilter === "LOW_RATING") {
      return review.rating <= 2;
    }

    return true;
  }), [activeFilter, reviews]);

  const reviewStats = [
    { id: "total", label: "Total Reviews", value: `${reviews.length}` },
    {
      id: "avg",
      label: "Avg Rating",
      value: reviews.length
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : "0.0",
    },
    {
      id: "needs-action",
      label: "Low Rating",
      value: `${reviews.filter((review) => review.rating <= 2).length}`,
    },
    {
      id: "approved",
      label: "Visible",
      value: `${reviews.filter((review) => review.status === "VISIBLE").length}`,
    },
  ];

  const handleToggleStatus = async (reviewId, nextStatus) => {
    setIsUpdatingId(reviewId);
    setLoadError("");

    try {
      await updateAdminReviewStatusRequest(reviewId, nextStatus, adminToken);
      setReviews((currentReviews) => currentReviews.map((review) => (
        review.id === reviewId
          ? { ...review, status: nextStatus }
          : review
      )));
    } catch (error) {
      setLoadError(error.message || "Khong the cap nhat review luc nay.");
    } finally {
      setIsUpdatingId(null);
    }
  };

  return (
    <div className="admin-page-shell">
      <HeroSection
        title="Review Moderation"
        description="Theo doi danh gia thuc te tu nguoi dung sau khi booking da hoan thanh."
        actions={
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-secondary-container text-xs font-bold text-on-secondary-container">
                {reviews.filter((review) => review.status === "VISIBLE").length}
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-tertiary-fixed text-xs font-bold text-on-tertiary-fixed">
                {reviews.filter((review) => review.rating <= 2).length}
              </div>
            </div>
            <span className="text-sm font-semibold text-slate-500">Live reviews</span>
          </div>
        }
      />

      {loadError ? (
        <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm text-rose-600">
          {loadError}
        </div>
      ) : null}

      <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-4">
        {reviewStats.map((stat) => (
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

      <section className="mb-6 flex flex-wrap items-center gap-4 rounded-xl bg-surface-container-low p-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by user, email, tour or comment..."
          containerClassName="min-w-[280px] flex-1 max-w-xl"
          className="bg-surface-container-lowest"
        />
      </section>

      <FilterChips
        className="mb-8"
        options={["ALL", "VISIBLE", "HIDDEN", "LOW_RATING"]}
        value={activeFilter}
        onChange={setActiveFilter}
      />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {visibleReviews.length ? visibleReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            isUpdating={isUpdatingId === review.id}
            onToggleStatus={handleToggleStatus}
          />
        )) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 px-6 py-10 text-center text-sm text-slate-500 lg:col-span-2">
            {isLoading ? "Dang tai reviews..." : "Chua co review nao phu hop voi bo loc hien tai."}
          </div>
        )}
      </section>

      <div className="mt-12 flex justify-center">
        <Button variant="secondary" className="rounded-full px-10 py-3 font-bold text-primary" disabled>
          {visibleReviews.length} Reviews
        </Button>
      </div>
    </div>
  );
}

