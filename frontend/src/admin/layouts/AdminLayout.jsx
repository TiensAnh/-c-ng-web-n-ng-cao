import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { getLayoutContent } from "../services/adminService";

export default function AdminLayout() {
  const location = useLocation();
  const layoutContent = getLayoutContent(location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topbarSearch, setTopbarSearch] = useState("");

  useEffect(() => {
    setSidebarOpen(false);
    setTopbarSearch("");
  }, [location.pathname]);

  return (
    <div className="admin-shell">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        profile={layoutContent.sidebarProfile}
        subtitle={layoutContent.sidebarSubtitle}
      />
      <div className="admin-main">
        <Topbar
          breadcrumb={layoutContent.breadcrumb}
          onMenuClick={() => setSidebarOpen(true)}
          onSearchChange={setTopbarSearch}
          profile={layoutContent.topbarProfile}
          searchPlaceholder={layoutContent.topbarSearchPlaceholder}
          searchValue={topbarSearch}
        />
        <Outlet context={{ topbarSearch }} />
        <Footer />
      </div>
    </div>
  );
}
