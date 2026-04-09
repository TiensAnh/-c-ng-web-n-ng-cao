<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookingHistory from './pages/BookingHistory';
import AdminBookingManagement from './pages/AdminBookingManagement';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tours" element={<ToursPage />} />
        <Route path="tours/:id" element={<TourDetailPage />} />
        <Route path="bookings/history" element={<BookingHistory />} />
        <Route path="admin/bookings" element={<AdminBookingManagement />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
=======
import AppRouter from './app/AppRouter';

function App() {
  return <AppRouter />;
>>>>>>> 8cf1a3989029571942876b8f0683261f93b85e40
}

export default App;
