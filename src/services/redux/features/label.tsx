import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
const token = window.localStorage.getItem('coza-store-dashboard-token');
export const labelApi = createApi({
  reducerPath: 'labelApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['categories', 'tags'],
  endpoints: (builder) => {
    return {
      getCategories: builder.query({
        query: () => 'categories',
        providesTags: (result) => providesList(result, 'categories'),
      }),
      postCategory: builder.mutation({
        query: (body) => ({
          url: 'categories',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: body,
        }),
        invalidatesTags: ['categories'],
      }),
      updateCategory: builder.mutation({
        query: ({ id, body }) => ({
          url: `categories/${id}`,
          method: 'PUT',
          body: body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ['categories'],
      }),
      deleteCategory: builder.mutation({
        query: (id) => ({
          url: `categories/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ['categories'],
      }),
      getTags: builder.query({
        query: () => 'tags',
        providesTags: (result) => providesList(result, 'tags'),
      }),
      postTag: builder.mutation({
        query: (body) => ({
          url: 'tags',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: body,
        }),
        invalidatesTags: ['tags'],
      }),
      updateTag: builder.mutation({
        query: ({ id, body }) => ({
          url: `tags/${id}`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: body,
        }),
        invalidatesTags: ['tags'],
      }),
      deleteTag: builder.mutation({
        query: (id) => ({
          url: `tags/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ['tags'],
      }),
    };
  },
});

export const {
  useGetCategoriesQuery,
  usePostCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetTagsQuery,
  usePostTagMutation,
  useDeleteTagMutation,
} = labelApi;
