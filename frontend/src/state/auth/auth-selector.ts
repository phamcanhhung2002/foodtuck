import { RootState } from "../store";
import { AuthState } from "./auth-slice";

export const selectAuthState = (state: RootState): AuthState => state.auth;
export const selectSuccessMessage = (state: RootState): string => selectAuthState(state).success;
export const selectErrorMessage = (state: RootState): string => selectAuthState(state).error;