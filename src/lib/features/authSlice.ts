import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { AuthState } from "@/models/auth";
import { authApi } from "@/lib/services/auth";

const initialState: AuthState = {
  error: {
    title: "",
    type: "",
    detail: "",
    instance: "",
    errors: null,
    status: null,
  },
  user: undefined,
  token: "",
  refreshToken: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuthError: (state, action: PayloadAction<AuthState>) => {
      state.error = action.payload.error;
    },
    setAfterRefreshToken: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
        state.user = payload
      })
  }
});

export const { setAfterRefreshToken, addAuthError } = authSlice.actions;

export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
