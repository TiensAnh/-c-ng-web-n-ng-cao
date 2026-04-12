import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import useScrollToTop from '../../shared/hooks/useScrollToTop';

function PublicLayout() {
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

export default PublicLayout;
