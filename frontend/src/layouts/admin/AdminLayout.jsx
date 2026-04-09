import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="admin-shell">
      <main className="admin-page-shell">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
