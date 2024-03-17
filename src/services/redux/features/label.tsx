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
      getTags: builder.query({
        query: () => 'tags',
        providesTags: (result) => providesList(result, 'tags'),
      }),
    };
  },
});

export const {
  useGetCategoriesQuery,
  usePostCategoryMutation,
  useGetTagsQuery,
} = labelApi;
