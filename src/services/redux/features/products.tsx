import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['products', 'coupons'],
  endpoints: (builder) => {
    return {
      getProducts: builder.query({
        query: (query) => `products?${query}`,
        providesTags: (result) => providesList(result, 'products'),
      }),
      getCoupons: builder.query({
        query: (query) => `coupons?${query}`,
        providesTags: ['products', 'coupons'],
      }),
      postCoupon: builder.mutation({
        query: (body) => ({
          url: 'coupons',
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['coupons', 'products'],
      }),
      updateCoupons: builder.mutation({
        query: (id) => ({
          url: `sales/${id}`,
          method: 'PUT',
        }),
        invalidatesTags: ['products', 'coupons'],
      }),
      deleteCoupons: builder.mutation({
        query: (id) => ({
          url: `sales/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['products', 'coupons'],
      }),
    };
  },
});

export const {
  useGetProductsQuery,
  useGetCouponsQuery,
  usePostCouponMutation,
  useUpdateCouponsMutation,
  useDeleteCouponsMutation,
} = productsApi;
