import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from '@/lib/features/authSlice';
import regionSlice from '@/lib/features/regionSlice';
import badutaImmunizationSlice from '@/lib/features/badutaImmunizationSlice';
import babyImmunizationSlice from '@/lib/features/babyImmunizationSlice';
import { baseApi } from '@/lib/baseQuery';

export const reducers = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authSlice,
  region: regionSlice,
  badutaImmunization: badutaImmunizationSlice,
  babyImmunization: babyImmunizationSlice,
}

const reducer = combineReducers(reducers);

export const makeStore = () => {
  return configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];