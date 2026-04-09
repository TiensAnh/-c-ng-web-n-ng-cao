import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/variables.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/navbar.css';
import './styles/footer.css';
import './styles/components.css';
import './styles/home.css';
import './styles/tours.css';
import './styles/about.css';
import './styles/contact.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
