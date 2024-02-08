import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App/App.jsx';
import './index.css';
import Router from './router.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
  <Router />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
