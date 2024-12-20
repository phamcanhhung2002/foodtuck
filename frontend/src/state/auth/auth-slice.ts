import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthErrors, LoadingStatus } from "../../types/types";
import { activateAccount, login } from "./auth-thunk";

export interface AuthState {
  email: string;
  isRegistered: boolean;
  loadingState: LoadingStatus;
  success: string;
  error: string;
  errors: Partial<AuthErrors>
}

export const initialState: AuthState = {
  email: "",
  isRegistered: false,
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