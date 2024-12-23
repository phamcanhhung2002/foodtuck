import { createAsyncThunk } from "@reduxjs/toolkit";
import { FullFoodResponse } from "../../types/food";
import RequestService from "../../utils/request-service";
import { FOODS } from "../../constants/urlConstants";

export const fetchFood = createAsyncThunk<Partial<FullFoodResponse>, string, { rejectValue: string }>(
  "food/fetchFood",
  async (foodId, thunkApi) => {
    try {
      const response = await RequestService.get(`${FOODS}/${foodId}`);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)