import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import App from '../../App';
import ProtectedRoute from '@/auth/ProtectedRoute';
const LoginViews = lazy(() => import('@/views/(default)/LoginViews'));
const DashBoardViews = lazy(() => import('@/views/DashboardViews.tsx'));
const CatalogViews = lazy(() => import('@/views/CatalogViews.tsx'));
const CustomersViews = lazy(() => import('@/views/CustomersViews.tsx'));
const OrdersViews = lazy(() => import('@/views/OrdersViews.tsx'));
const SettingsViews = lazy(() => import('@/views/SettingsViews.tsx'));
const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />,
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashBoardViews />,
      },
      {
        path: 'catalog',
        element: <CatalogViews />,
      },
      {
        path: 'customers',
        element: <CustomersViews />,
      },
      {
        path: 'orders',
        element: <OrdersViews />,
      },
      {
        path: 'settings',
        element: <SettingsViews />,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginViews />,
  },
];
const router = createBrowserRouter(routes, {
  basename: '/',
  future: {
    v7_normalizeFormMethod: true,
  },
});

export default router;
