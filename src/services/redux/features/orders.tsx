import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
const getAuthToken = () => {
  return localStorage.getItem('coza-store-dashboard-token');
};
export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${end_point}`,
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['orders', 'orders_user'],
  endpoints: (builder) => {
    return {
      getOrders: builder.query({
        query: (query) => `orders?${query}`,
        providesTags: (result) => providesList(result, 'orders'),
      }),
      updateOrder: builder.mutation({
        query: ({ orderId, status, userId }) => ({
          url: `user_orders/${orderId}`,
          method: 'PUT',
          body: {
            status: status,
            userId: userId,
          },
        }),
        invalidatesTags: ['orders'],
      }),
      getAllOrdersByUserId: builder.query({
        query: ({ id, page }) => ({
          url: `orders/users/${id}?page=${page}`,
          method: 'GET',
        }),
        providesTags: (result) => providesList(result, 'orders'),
      }),
      getOrderByCode: builder.query({
        query: (code) => ({
          url: `orders/${code}`,
          method: 'GET',
        }),
        providesTags: (result) => providesList(result, 'orders'),
      }),
    };
  },
});

export const {
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useGetAllOrdersByUserIdQuery,
  useGetOrderByCodeQuery,
} = ordersApi;
