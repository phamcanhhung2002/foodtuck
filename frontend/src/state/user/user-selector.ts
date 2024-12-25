import { LoadingStatus } from "../../types/types";
import { UserEditErrors, UserResponse } from "../../types/user";
import { RootState } from "../store";
import { UserState } from "./user-slice";

export const selectUserState = (state: RootState): UserState => state.user;
export const selectUserFromUserState = (state: RootState): UserResponse | undefined => selectUserState(state).user;
export const selectUserEditErrors = (state: RootState): Partial<UserEditErrors> => selectUserState(state).userEditErrors;
export const selectIsUserLoading = (state: RootState): boolean => selectUserState(state).loadingState === LoadingStatus.LOADING;