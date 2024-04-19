import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from '@/lib/features/authSlice';
import sourceSlice from '@/lib/features/sourceSlice';
import { baseApi } from '@/lib/baseQuery';

export const reducers = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authSlice,
  source: sourceSlice,
}

const reducer = combineReducers(reducers);

export const makeStore = () => {
  return configureStore({
    reducer: reducer,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];