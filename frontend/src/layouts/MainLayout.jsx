import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import useScrollToTop from '../hooks/useScrollToTop';

function MainLayout() {
  useScrollToTop();

  return (
    <div className="site-shell">
      <Navbar />
      <main className="page-shell">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
