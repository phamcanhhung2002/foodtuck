import { createAsyncThunk } from "@reduxjs/toolkit";
import { FoodResponse } from "../../types/food";
import RequestService from "../../utils/request-service";
import { FilterParamsType, FoodsSearchRequest, HeaderResponse } from "../../types/types";
import { FOODS, FOODS_SEARCH, FOODS_SEARCH_TEXT } from "../../constants/urlConstants";

export const fetchFoods = createAsyncThunk<HeaderResponse<FoodResponse>, number> (  
  "foods/fetchFoods",
  async (page) => {
    const response = await RequestService.get(`${FOODS}?page=${page}`);
    return {
      items: response.data,
      pagesCount: parseInt(response.headers["page-total-count"]),
      totalElements: parseInt(response.headers["page-total-elements"])
    }
  }
)

export const fetchFoodsByFilterParams = createAsyncThunk<HeaderResponse<FoodResponse>, FilterParamsType>(
  "foods/fetchFoodsByFilterParams",
  async (filter) => {
    const response = await RequestService.post(`${FOODS_SEARCH}?page=${filter.currentPage}&size=${filter.pageSize}`, filter)
    return {
      items: response.data,
      pagesCount: parseInt(response.headers["page-total-count"]),
      totalElements: parseInt(response.headers["page-total-elements"])
    }
  }
)

export const fetchFoodsByInputText = createAsyncThunk<HeaderResponse<FoodResponse>, FoodsSearchRequest>(
  "foods/fetchFoodsByInputText",
  async (data) => {
    const response = await RequestService.post(`${FOODS_SEARCH_TEXT}?page=${data.currentPage}&size=${data.pageSize}`, data)
    return {
      items: response.data,
      pagesCount: parseInt(response.headers["page-total-count"]),
      totalElements: parseInt(response.headers["page-total-elements"])
    }
  }
)