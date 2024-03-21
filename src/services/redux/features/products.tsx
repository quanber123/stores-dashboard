import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
const getAuthToken = () => {
  return localStorage.getItem('coza-store-dashboard-token');
};
export const productsApi = createApi({
  reducerPath: 'productsApi',
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
  tagTypes: ['banners', 'products', 'coupons'],
  endpoints: (builder) => {
    return {
      getBanners: builder.query({
        query: () => `banners`,
        providesTags: (result) => providesList(result, 'banners'),
      }),
      postBanner: builder.mutation({
        query: (body) => ({
          url: 'banners',
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['banners'],
      }),
      updateBanner: builder.mutation({
        query: ({ id, body }) => ({
          url: `banners/${id}`,
          method: 'PUT',
          body: body,
        }),
        invalidatesTags: ['banners'],
      }),
      deleteBanner: builder.mutation({
        query: (id) => ({
          url: `banners/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['banners'],
      }),
      getProducts: builder.query({
        query: (query) => `products?${query}`,
        providesTags: (result) => providesList(result, 'products'),
      }),
      publishedProducts: builder.mutation({
        query: ({ id, published }) => ({
          url: `products_toggle_published/${id}`,
          method: 'PUT',
          body: {
            published: published,
          },
        }),
        invalidatesTags: ['products'],
      }),
      postProduct: builder.mutation({
        query: (body) => ({
          url: 'products',
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['products'],
      }),
      updateProduct: builder.mutation({
        query: ({ id, body }) => ({
          url: `products/${id}`,
          method: 'PUT',
          body: body,
        }),
        invalidatesTags: ['products'],
      }),
      deleteProduct: builder.mutation({
        query: (id) => ({
          url: `products/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['products'],
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
  useGetBannersQuery,
  usePostBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useGetProductsQuery,
  usePublishedProductsMutation,
  usePostProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCouponsQuery,
  usePostCouponMutation,
  usePublishedCouponsMutation,
  useUpdateCouponsMutation,
  useDeleteCouponsMutation,
} = productsApi;
