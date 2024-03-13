import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const figuresApi = createApi({
  reducerPath: 'figuresApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['figures', 'status'],
  endpoints: (builder) => {
    return {
      getStatus: builder.query({
        query: () => 'status-order',
        providesTags: (result) => providesList(result, 'status'),
      }),
      getTotalFiguresCount: builder.query({
        query: () => 'figures_count',
        providesTags: (result) => providesList(result, 'figures'),
      }),
      getTotalFiguresAmount: builder.query({
        query: () => 'figures_amount',
        providesTags: (result) => providesList(result, 'figures'),
      }),
      getWeeklyFigures: builder.query({
        query: () => 'weekly_figures',
        providesTags: (result) => providesList(result, 'figures'),
      }),
      getBestSelling: builder.query({
        query: () => 'best_selling',
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
