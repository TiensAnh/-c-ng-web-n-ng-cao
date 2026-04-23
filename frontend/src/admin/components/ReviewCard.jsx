import Avatar from "./Avatar";
import Button from "./Button";
import Icon from "./Icon";

export default function ReviewCard({ isUpdating = false, onToggleStatus, review }) {
  const nextStatus = review.status === "VISIBLE" ? "HIDDEN" : "VISIBLE";

  return (
    <article className="review-card">
      {review.reported ? (
        <div className="absolute right-0 top-0 rounded-bl-xl bg-tertiary-fixed px-4 py-1 text-[10px] font-bold uppercase tracking-tight text-on-tertiary-fixed">
          Reported
        </div>
      ) : null}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <Avatar
            src={review.avatar}
            alt={review.name}
            className="h-12 w-12 rounded-xl"
            initials={review.name}
          />
          <div>
            <h4 className="font-semibold text-on-surface">{review.name}</h4>
            <p className="text-xs font-medium text-slate-500">{review.date}</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, index) => (
            <Icon
              key={`${review.id}-star-${index + 1}`}
              name="star"
              filled={index < review.rating}
              className={index < review.rating ? "text-sm text-tertiary-fixed-dim" : "text-sm text-outline-variant/40"}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <span className="inline-block rounded bg-surface-container-low px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
          {review.tour}
        </span>
        <span className="ml-2 inline-block rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          BK-{review.bookingId}
        </span>
        <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{review.content}</p>
      </div>
      <div className="flex gap-3 border-t border-slate-50 pt-4">
        <Button
          variant={review.status === "VISIBLE" ? "secondary" : "primary"}
          className="flex-1 text-xs font-bold"
          disabled={isUpdating}
          onClick={() => onToggleStatus?.(review.id, nextStatus)}
        >
          {isUpdating ? "Dang cap nhat..." : review.status === "VISIBLE" ? "Hide" : "Show"}
        </Button>
        <Button variant="outline" className="px-6 text-xs font-bold" disabled>
          {review.status}
        </Button>
      </div>
    </article>
  );
}
