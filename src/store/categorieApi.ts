import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "../types";
export const categorieApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://heliotrope-same-femur.glitch.me/",
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),
  }),
});
export default categorieApi;
export const { useGetCategoriesQuery } = categorieApi;
