import { useEffect } from 'react';
import AdminLayout from './layouts/AdminLayout';
import './styles/admin.css';

export default function AdminApp() {
  useEffect(() => {
    const definitions = [
      {
        key: 'admin-font-preconnect',
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        key: 'admin-font-preconnect-gstatic',
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: '',
      },
      {
        key: 'admin-fonts',
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
      },
      {
        key: 'admin-material-symbols',
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap',
      },
    ];

    definitions.forEach((definition) => {
      if (document.head.querySelector(`[data-admin-head="${definition.key}"]`)) {
        return;
      }

      const link = document.createElement('link');
      link.dataset.adminHead = definition.key;
      link.rel = definition.rel;
      link.href = definition.href;

      if (definition.crossOrigin !== undefined) {
        link.crossOrigin = definition.crossOrigin;
      }

      document.head.appendChild(link);
    });
  }, []);

  return <AdminLayout />;
}
