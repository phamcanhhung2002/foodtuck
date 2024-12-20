import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserEditErrors, UserResponse } from "../../types/user";
import { LoadingStatus } from "../../types/types";
import { fetchUserInfo } from "./user-thunk";

export interface UserState {
  user?: UserResponse;
  loadingState: LoadingStatus;
  successMessage: string;
  userEditErrors: Partial<UserEditErrors>;
}

export const initialState: UserState = {
  user: undefined,
  loadingState: LoadingStatus.LOADING,
  successMessage: "",
  userEditErrors: {},
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserResponse>) {
      state.user = action.payload;
      state.loadingState = LoadingStatus.LOADED;
    },
    resetInputForm(state) {
      state.successMessage = "";
      state.userEditErrors = {};
    },
    logoutSuccess(state) {
      state.user = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.loadingState = LoadingStatus.LOADING
    })
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.user = action.payload
      state.loadingState = LoadingStatus.LOADED
    })
  },
});

export const { setUser, resetInputForm, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
