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
        providesTags: (result) => providesList(result, 'coupons'),
      }),
      postCoupon: builder.mutation({
        query: (body) => ({
          url: 'coupons',
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['coupons', 'products'],
      }),
      publishedCoupons: builder.mutation({
        query: ({ id, published }) => ({
          url: `coupons_toggle_published/${id}`,
          method: 'PUT',
          body: {
            published: published,
          },
        }),
        invalidatesTags: ['products', 'coupons'],
      }),
      updateCoupons: builder.mutation({
        query: ({ id, body }) => ({
          url: `coupons/${id}`,
          method: 'PUT',
          body: {
            body,
          },
        }),
        invalidatesTags: ['products', 'coupons'],
      }),
      deleteCoupons: builder.mutation({
        query: (id) => ({
          url: `coupons/${id}`,
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
  usePublishedCouponsMutation,
  useUpdateCouponsMutation,
  useDeleteCouponsMutation,
} = productsApi;
