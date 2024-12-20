
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserData, UserResponse } from "../../types/user";
import RequestService from "../../utils/request-service";
import { ACCOUNT, AUTH_LOGIN, REGISTRATION_ACTIVATE } from "../../constants/urlConstants";
import { NavigateFunction } from "react-router-dom"
import { setUser } from "../user/user-slice";

export const login = createAsyncThunk<
    UserResponse,
    { userData: UserData, navigate: NavigateFunction },
    { rejectValue: string }
>("auth/login", async ({ userData, navigate }, thunkApi) => {
  try {
    const response = await RequestService.post(AUTH_LOGIN, userData);
    localStorage.setItem("token", response.data.token);
    navigate(ACCOUNT);
    thunkApi.dispatch(setUser(response.data.user));
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data);
  }
})

export const activateAccount = createAsyncThunk<string, string, { rejectValue: string}>(
  "auth/activateAccount",
  async (code, thunkApi) => {
    try {
      const response = await RequestService.get(`${REGISTRATION_ACTIVATE}/${code}`);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
)