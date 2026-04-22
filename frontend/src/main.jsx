import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import App from './App';
import { AuthProvider } from './shared/context/AuthContext';
import './shared/styles/variables.css';
import './shared/styles/base.css';
import './public/styles/layout.css';
import './public/styles/navbar.css';
import './public/styles/footer.css';
import './shared/styles/components.css';
import './shared/styles/tour-experience.css';
import './public/styles/home.css';
import './public/styles/tours.css';
import './public/styles/about.css';
import './public/styles/contact.css';
import './public/styles/account.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AdminAuthProvider>
    </AuthProvider>
  </React.StrictMode>,
);
