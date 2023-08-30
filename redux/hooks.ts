import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../utility/supabaseClient";

export const retoolApi = createApi({
  reducerPath: "retoolApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mernappbackend.onrender.com" }),
  tagTypes: ["Jokes"],
  endpoints: (builder) => ({
    getJokes: builder.query<any[], void>({
      queryFn: async () => {
        const {data, error} = await supabase
          .from('listings')
          .select('*')

        if (error) {
          throw { error };
        }

        return { data };
      },
      providesTags: ["Jokes"],
    }),
    createJoke: builder.mutation<void, Partial<any>>({
      query: (newJoke) => ({
        url: "jokes",
        method: 'POST',
        body: newJoke,
      }),
      invalidatesTags: ["Jokes"],
    }),
    deleteJoke: builder.mutation<any[], number | string | string[] | undefined>({
      query: (id) => ({
        url: `jokes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Jokes"],
    }),
    updateJoke: builder.mutation<any[], { id: number | string | string[] | undefined; values: Partial<any> }>({
      query: ({ id, values }) => ({
        url: `jokes/${id}`,
        method: 'PUT',
        body: values ,
      }),
      invalidatesTags: ["Jokes"],
    }),
  }),
});

export const { 
  useGetJokesQuery, 
  useDeleteJokeMutation,
  useUpdateJokeMutation,
  useCreateJokeMutation,
 } = retoolApi;