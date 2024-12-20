import { UserResponse } from "../../types/user";
import { RootState } from "../store";
import { UserState } from "./user-slice";

export const selectUserState = (state: RootState): UserState => state.user;
export const selectUserFromUserState = (state: RootState): UserResponse | undefined => selectUserState(state).user;