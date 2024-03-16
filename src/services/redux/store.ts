import { figuresApi } from './features/figures';
import { ordersApi } from './features/orders';
import { usersApi } from './features/users';
import { configureStore } from '@reduxjs/toolkit';
import statusReducer from './slice/statusSlice';
import { productsApi } from './features/products';
import { labelApi } from './features/label';
export const store = configureStore({
  reducer: {
    status: statusReducer,
    [figuresApi.reducerPath]: figuresApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [labelApi.reducerPath]: labelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      figuresApi.middleware,
      ordersApi.middleware,
      usersApi.middleware,
      productsApi.middleware,
      labelApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
