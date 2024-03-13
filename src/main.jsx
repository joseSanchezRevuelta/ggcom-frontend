import React from 'react';
import Router from './router.jsx';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store.js';
import App from './components/App/App.jsx';
import './index.css';

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
