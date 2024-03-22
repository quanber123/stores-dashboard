import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import App from '../../App';
import ProtectedRoute from '@/auth/ProtectedRoute';
const LoginViews = lazy(() => import('@/views/(default)/LoginViews'));
const DashBoardViews = lazy(() => import('@/views/(logged-in)/DashboardViews'));
const CouponsViews = lazy(() => import('@/views/(logged-in)/CouponsViews'));
const BannerViews = lazy(() => import('@/views/(logged-in)/BannerViews'));
const ProductsViews = lazy(() => import('@/views/(logged-in)/ProductsViews'));
const CategoriesViews = lazy(
  () => import('@/views/(logged-in)/CategoriesViews')
);
const TagsViews = lazy(() => import('@/views/(logged-in)/TagsViews'));
const CustomersViews = lazy(() => import('@/views/(logged-in)/CustomersViews'));
const CustomerOrdersViews = lazy(
  () => import('@/views/(logged-in)/CustomerOrdersViews')
);
const OrdersViews = lazy(() => import('@/views/(logged-in)/OrdersViews'));
const OrderDetailsViews = lazy(
  () => import('@/views/(logged-in)/OrderDetailsViews')
);
const SettingsViews = lazy(() => import('@/views/(logged-in)/SettingsViews'));
const NotFoundViews = lazy(() => import('@/views/(default)/NotFoundViews'));
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
        path: 'banners',
        element: <BannerViews />,
      },
      {
        path: 'products',
        element: <ProductsViews />,
      },
      {
        path: 'categories',
        element: <CategoriesViews />,
      },
      {
        path: 'tags',
        element: <TagsViews />,
      },
      {
        path: 'coupons',
        element: <CouponsViews />,
      },
      {
        path: 'customers',
        children: [
          {
            index: true,
            element: <CustomersViews />,
          },
          {
            path: ':id',
            element: <CustomerOrdersViews />,
          },
        ],
      },
      {
        path: 'orders',
        children: [
          {
            index: true,
            element: <OrdersViews />,
          },
          {
            path: ':code',
            element: <OrderDetailsViews />,
          },
        ],
      },
      {
        path: 'settings',
        element: <SettingsViews />,
      },
      {
        path: '*',
        element: <NotFoundViews />,
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
