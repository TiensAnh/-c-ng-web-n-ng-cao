import AdminLayout from './layouts/AdminLayout';
import useAdminHeadAssets from './hooks/useAdminHeadAssets';
import './styles/admin.css';

export default function AdminApp() {
  useAdminHeadAssets();

  return <AdminLayout />;
}
