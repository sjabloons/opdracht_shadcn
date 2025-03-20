import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../types";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: ["Todo"],
    }),
    toggleTodo: builder.mutation<void, Todo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: { completed: !todo.completed },
      }),
      invalidatesTags: ["Todo"],
    }),
    removeTodo: builder.mutation<void, Todo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
    addTodo: builder.mutation<void, Todo>({
      query: (todo) => ({
        url: `/todos`,
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation<void, Todo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useToggleTodoMutation,
  useRemoveTodoMutation,
  useAddTodoMutation,
  useUpdateTodoMutation,
} = todoApi;

export default todoApi;
