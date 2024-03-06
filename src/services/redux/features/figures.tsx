import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const figuresApi = createApi({
  reducerPath: 'labelApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['figures_count', 'figures_amount'],
  endpoints: (builder) => {
    return {
      getTotalFiguresCount: builder.query({
        query: () => 'figures_count',
        providesTags: (result) => providesList(result, 'figures_count'),
      }),
      getTotalFiguresAmount: builder.query({
        query: () => 'figures_amount',
        providesTags: (result) => providesList(result, 'figures_amount'),
      }),
    };
  },
});

export const { useGetTotalFiguresCountQuery, useGetTotalFiguresAmountQuery } =
  figuresApi;
