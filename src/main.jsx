import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './router.jsx';
import './index.css';
import App from './components/App/App.jsx';
import { store } from './store.js';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Router />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
