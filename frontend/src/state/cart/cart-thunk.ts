import { createAsyncThunk } from "@reduxjs/toolkit";
import { FoodResponse } from "../../types/food";
import RequestService from "../../utils/request-service";
import { USERS_CART } from "../../constants/urlConstants";

export const fetchCart = createAsyncThunk<
  Array<FoodResponse>,
  Array<number>>("cart/fetchCart", 
  async (foodIds) => {
    const response = await RequestService.post(USERS_CART, foodIds);
    return response.data;
}) 