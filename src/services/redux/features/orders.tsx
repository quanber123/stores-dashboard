import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['orders'],
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
    };
  },
});

export const { useGetOrdersQuery, useUpdateOrderMutation } = ordersApi;
