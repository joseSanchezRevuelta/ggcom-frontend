import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './router.jsx';
import './index.css';
import App from './components/App/App.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
