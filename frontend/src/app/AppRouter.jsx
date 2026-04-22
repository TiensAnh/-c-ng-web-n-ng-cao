import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from '../public/layouts/PublicLayout';
import HomePage from '../public/pages/HomePage';
import ToursPage from '../public/pages/ToursPage';
import TourDetailPage from '../public/pages/TourDetailPage';
import AboutPage from '../public/pages/AboutPage';
import ContactPage from '../public/pages/ContactPage';
import MyBookingsPage from '../public/pages/MyBookingsPage';
import AdminProtectedRoute from '../admin/components/AdminProtectedRoute';

const AdminApp = lazy(() => import('../admin/AdminApp'));
const AdminAuthPage = lazy(() => import('../admin/pages/AdminAuthPage'));
const DashboardPage = lazy(() => import('../admin/pages/DashboardPage'));
const ToursAdminPage = lazy(() => import('../admin/pages/ToursPage'));
const TourCreatePage = lazy(() => import('../admin/pages/TourCreatePage'));
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
        <Route path="tours/:tourId" element={<TourDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="my-bookings" element={<MyBookingsPage />} />
      </Route>

      <Route
        path="admin/login"
        element={(
          <Suspense fallback={null}>
            <AdminAuthPage mode="login" />
          </Suspense>
        )}
      />

      <Route
        path="admin/register"
        element={(
          <Suspense fallback={null}>
            <AdminAuthPage mode="register" />
          </Suspense>
        )}
      />

      <Route element={<AdminProtectedRoute />}>
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
        <Route path="tours/new" element={<TourCreatePage />} />
        <Route path="tours/:tourId/edit" element={<TourCreatePage />} />
        <Route path="tours" element={<ToursAdminPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="*" element={<Navigate replace to="dashboard" />} />
      </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
