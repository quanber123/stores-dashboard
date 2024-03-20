import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['customers'],
  endpoints: (builder) => {
    return {
      getCustomers: builder.query({
        query: ({ page, type, search }) => ({
          url: `users/getAll?page=${page}&type=${type}&search=${search}`,
          method: 'GET',
        }),
        providesTags: (result) => providesList(result, 'customers'),
      }),
    };
  },
});

export const { useGetCustomersQuery } = usersApi;
