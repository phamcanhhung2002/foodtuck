import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserEditErrors, UserEditRequest, UserResponse } from "../../types/user";
import RequestService from "../../utils/request-service";
import { USERS } from "../../constants/urlConstants";

export const fetchUserInfo = createAsyncThunk<UserResponse>("user/fetchUserInfo", async () => {
    const response = await RequestService.get(USERS, true);
    return response.data;
})

export const updateUserInfo = createAsyncThunk<UserResponse, UserEditRequest, { rejectValue: UserEditErrors }>(
    "user/updateUserInfo",
    async (request, thunkApi) => {
        try {
            const response = await RequestService.put(USERS, request, true)
            return response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)