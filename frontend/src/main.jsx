import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './shared/styles/variables.css';
import './shared/styles/base.css';
import './public/styles/layout.css';
import './public/styles/navbar.css';
import './public/styles/footer.css';
import './shared/styles/components.css';
import './public/styles/home.css';
import './public/styles/tours.css';
import './public/styles/about.css';
import './public/styles/contact.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
