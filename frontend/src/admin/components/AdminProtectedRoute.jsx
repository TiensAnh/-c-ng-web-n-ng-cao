import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { ROUTES } from '../utils/routes';
import '../styles/admin-auth.css';

export default function AdminProtectedRoute() {
  const location = useLocation();
  const { isAdminAuthenticated, isAdminAuthChecking } = useAdminAuth();

  if (isAdminAuthChecking) {
    return <div className="admin-auth-guard">Dang kiem tra phien admin...</div>;
  }

  if (!isAdminAuthenticated) {
    return <Navigate replace to={ROUTES.login} state={{ from: location }} />;
  }

  return <Outlet />;
}
