export const ROUTES = {
  dashboard: '/admin/dashboard',
  tours: '/admin/tours',
  bookings: '/admin/bookings',
  users: '/admin/users',
  reviews: '/admin/reviews',
  payments: '/admin/payments',
};

export const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", path: ROUTES.dashboard, icon: "dashboard" },
  { key: "tours", label: "Tours", path: ROUTES.tours, icon: "explore" },
  { key: "bookings", label: "Bookings", path: ROUTES.bookings, icon: "calendar_month" },
  { key: "users", label: "Users", path: ROUTES.users, icon: "group" },
  { key: "reviews", label: "Reviews", path: ROUTES.reviews, icon: "rate_review" },
  { key: "payments", label: "Payments", path: ROUTES.payments, icon: "payments" },
];
