import { figuresApi } from './features/figures';
import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({
  reducer: {
    [figuresApi.reducerPath]: figuresApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(figuresApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
