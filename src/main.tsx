import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './services/router/router.tsx';
import { Provider } from 'react-redux';
import { store } from './services/redux/store.ts';
import './index.css';
import AuthProvider from './context/AuthProvider.tsx';
import { I18nextProvider } from 'react-i18next';
import i18n from './services/i18n/i18n.ts';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </AuthProvider>
    </I18nextProvider>
  </React.StrictMode>
);
