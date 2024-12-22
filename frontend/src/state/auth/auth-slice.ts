import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthErrors, LoadingStatus } from "../../types/types";
import { activateAccount, login, registration } from "./auth-thunk";

export interface AuthState {
  email: string;
  loadingState: LoadingStatus;
  success: string;
  error: string;
  errors: Partial<AuthErrors>
}

export const initialState: AuthState = {
  email: "",
  loadingState: LoadingStatus.LOADING,
  success: "",
  error: "",
  errors: {}
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoadingState(state, action: PayloadAction<LoadingStatus>) {
      state.loadingState = action.payload;
      state.errors = {};
    },
    resetAuthState: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload!;
    });
    builder.addCase(registration.pending, (state) => {
      state.loadingState = LoadingStatus.LOADING
    })
    builder.addCase(registration.fulfilled, (state) => {
      state.loadingState = LoadingStatus.LOADED
      state.errors = {}
    })
    builder.addCase(registration.rejected, (state, action) => {
      state.errors = action.payload!;
      state.loadingState = LoadingStatus.LOADED
    })
    builder.addCase(activateAccount.fulfilled, (state, action) => {
      state.success = action.payload;
    })
    builder.addCase(activateAccount.rejected, (state, action) => {
      state.error = action.payload!;
    })
  }
})

export const { setAuthLoadingState, resetAuthState } = authSlice.actions;
export default authSlice.reducer;