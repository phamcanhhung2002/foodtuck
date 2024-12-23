import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FoodResponse } from "../../types/food";
import { LoadingStatus } from "../../types/types";
import { fetchFoods, fetchFoodsByFilterParams, fetchFoodsByInputText } from "./foods-thunk";

export interface FoodsState {
  foods: Array<FoodResponse>
  pagesCount: number;
  totalElements: number;
  loadingState: LoadingStatus
}

export const initialState: FoodsState = {
  foods: [],
  pagesCount: 1,
  totalElements: 0,
  loadingState: LoadingStatus.LOADING
}

export const foodsSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    setFoods(state, action: PayloadAction<Array<FoodResponse>>) {
      state.foods = action.payload;
      state.loadingState = LoadingStatus.LOADED
    },
    removeFoodById(state, action: PayloadAction<number>) {
      state.foods = state.foods.filter((food) => food.id !== action.payload)
      state.loadingState = LoadingStatus.LOADED
    },
    resetFoodsState: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFoods.pending, (state) => {
      state.loadingState = LoadingStatus.LOADING
    })
    builder.addCase(fetchFoods.fulfilled, (state, action) => {
      state.foods = action.payload.items;
      state.pagesCount = action.payload.pagesCount;
      state.totalElements = action.payload.totalElements
      state.loadingState = LoadingStatus.LOADED
    })
    builder.addCase(fetchFoodsByFilterParams.pending, (state) => {
      state.loadingState = LoadingStatus.LOADING
    })
    builder.addCase(fetchFoodsByFilterParams.fulfilled, (state, action) => {
      state.foods = action.payload.items;
      state.pagesCount = action.payload.pagesCount
      state.totalElements = action.payload.totalElements;
      state.loadingState = LoadingStatus.LOADED
    })
    builder.addCase(fetchFoodsByInputText.pending, (state) => {
      state.loadingState = LoadingStatus.LOADING
    })
    builder.addCase(fetchFoodsByInputText.fulfilled, (state, action) => {
      state.foods = action.payload.items
      state.pagesCount = action.payload.pagesCount
      state.totalElements = action.payload.totalElements
      state.loadingState = LoadingStatus.LOADED
    })
  }
})

export const { setFoods, removeFoodById, resetFoodsState } = foodsSlice.actions;

export default foodsSlice.reducer;