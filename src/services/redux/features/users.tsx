import { getAuthToken } from '@/services/utils/getAuthToken';
import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const usersApi = createApi({
  reducerPath: 'usersApi',
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
  tagTypes: ['customers', 'admin'],
  endpoints: (builder) => {
    return {
      getCustomers: builder.query({
        query: ({ page, type, search }) => ({
          url: `users/getAll?page=${page}&type=${type}&search=${search}`,
          method: 'GET',
        }),
        providesTags: (result) => providesList(result, 'customers'),
      }),
      getToken: builder.query({
        query: (token) => ({
          url: 'admin',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      }),
      adminLogin: builder.mutation({
        query: (body) => ({
          url: 'admin',
          method: 'POST',
          body: body,
        }),
      }),
    };
  },
});

export const { useGetCustomersQuery, useGetTokenQuery, useAdminLoginMutation } =
  usersApi;
