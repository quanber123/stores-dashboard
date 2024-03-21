import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
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
          body: body,
        }),
        invalidatesTags: ['categories'],
      }),
      updateCategory: builder.mutation({
        query: ({ id, body }) => ({
          url: `categories/${id}`,
          method: 'PUT',
          body: body,
        }),
        invalidatesTags: ['categories'],
      }),
      deleteCategory: builder.mutation({
        query: (id) => ({
          url: `categories/${id}`,
          method: 'DELETE',
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
          body: body,
        }),
        invalidatesTags: ['tags'],
      }),
      deleteTag: builder.mutation({
        query: (id) => ({
          url: `tags/${id}`,
          method: 'DELETE',
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
