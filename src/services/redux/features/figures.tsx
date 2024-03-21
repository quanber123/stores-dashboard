import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
const getAuthToken = () => {
  return localStorage.getItem('coza-store-dashboard-token');
};
export const figuresApi = createApi({
  reducerPath: 'figuresApi',
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
  tagTypes: ['figures', 'status'],
  endpoints: (builder) => {
    return {
      getStatus: builder.query({
        query: () => ({
          url: 'status-order',
          method: 'GET',
        }),
        providesTags: (result) => providesList(result, 'status'),
      }),
      getTotalFiguresCount: builder.query({
        query: () => ({
          url: 'figures_count',
          method: 'GET',
        }),
        providesTags: (result) => providesList(result, 'figures'),
      }),
      getTotalFiguresAmount: builder.query({
        query: () => ({
          url: 'figures_amount',
          method: 'GET',
        }),
        providesTags: (result) => providesList(result, 'figures'),
      }),
      getWeeklyFigures: builder.query({
        query: () => ({
          url: 'weekly_figures',
          method: 'GET',
        }),
        providesTags: (result) => providesList(result, 'figures'),
      }),
      getBestSelling: builder.query({
        query: () => ({
          url: 'best_selling',
          method: 'GET',
        }),
        providesTags: (result) => providesList(result, 'figures'),
      }),
    };
  },
});

export const {
  useGetStatusQuery,
  useGetTotalFiguresCountQuery,
  useGetTotalFiguresAmountQuery,
  useGetWeeklyFiguresQuery,
  useGetBestSellingQuery,
} = figuresApi;
