import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/public/PublicLayout';
import HomePage from '../pages/public/HomePage';
import ToursPage from '../pages/public/ToursPage';
import AboutPage from '../pages/public/AboutPage';
import ContactPage from '../pages/public/ContactPage';
const AdminApp = lazy(() => import('../admin/AdminApp'));
const DashboardPage = lazy(() => import('../admin/pages/DashboardPage'));
const ToursAdminPage = lazy(() => import('../admin/pages/ToursPage'));
const BookingsPage = lazy(() => import('../admin/pages/BookingsPage'));
const UsersPage = lazy(() => import('../admin/pages/UsersPage'));
const ReviewsPage = lazy(() => import('../admin/pages/ReviewsPage'));
const PaymentsPage = lazy(() => import('../admin/pages/PaymentsPage'));

function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tours" element={<ToursPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route
        path="admin"
        element={(
          <Suspense fallback={null}>
            <AdminApp />
          </Suspense>
        )}
      >
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="tours" element={<ToursAdminPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="*" element={<Navigate replace to="dashboard" />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
