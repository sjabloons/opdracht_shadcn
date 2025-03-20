import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "@/store/todoApi";
import { categorieApi } from "@/store/categorieApi";

const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    [categorieApi.reducerPath]: categorieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware, categorieApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
