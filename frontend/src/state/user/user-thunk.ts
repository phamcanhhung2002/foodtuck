import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserResponse } from "../../types/user";
import RequestService from "../../utils/request-service";
import { USERS } from "../../constants/urlConstants";

export const fetchUserInfo = createAsyncThunk<UserResponse>("user/fetchUserInfo", async () => {
    const response = await RequestService.get(USERS, true);
    return response.data;
})