import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useAdminAuth } from "../context/AdminAuthContext";
import { getLayoutContent } from "../services/adminService";

export default function AdminLayout() {
  const location = useLocation();
  const { admin } = useAdminAuth();
  const layoutContent = getLayoutContent(location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topbarSearch, setTopbarSearch] = useState("");

  useEffect(() => {
    setSidebarOpen(false);
    setTopbarSearch("");
  }, [location.pathname]);

  const normalizedAdminRole = admin?.role
    ? admin.role
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ")
    : null;

  const sidebarProfile = layoutContent.sidebarProfile
    ? {
        ...layoutContent.sidebarProfile,
        name: admin?.name || layoutContent.sidebarProfile.name,
        role: normalizedAdminRole || layoutContent.sidebarProfile.role,
        avatar: admin?.avatar || null,
      }
    : null;

  return (
    <div className="admin-shell">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        profile={sidebarProfile}
        subtitle={layoutContent.sidebarSubtitle}
      />
      <div className="admin-main">
        <Topbar
          breadcrumb={layoutContent.breadcrumb}
          onMenuClick={() => setSidebarOpen(true)}
          onSearchChange={setTopbarSearch}
          searchPlaceholder={layoutContent.topbarSearchPlaceholder}
          searchValue={topbarSearch}
        />
        <Outlet context={{ topbarSearch }} />
        <Footer />
      </div>
    </div>
  );
}
