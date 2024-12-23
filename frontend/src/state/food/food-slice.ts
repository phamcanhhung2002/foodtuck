import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FullFoodResponse } from "../../types/food";
import { LoadingStatus } from "../../types/types"
import { resetFoodsState } from "../foods/foods-slice";
import { fetchFood } from "./food-thunk";

export interface FoodState {
  food: Partial<FullFoodResponse>
  loadingState: LoadingStatus;
  errorMessage: string;
}

export const initialState: FoodState = {
  food: {},
  errorMessage: "",
  loadingState: LoadingStatus.LOADING
}

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setFood(state, action: PayloadAction<FullFoodResponse>) {
      state.food = action.payload
      state.loadingState = LoadingStatus.LOADED
    },
    resetFoodState: () => initialState
  },
  extraReducers: (builder) => {
      builder.addCase(fetchFood.pending, (state) => {
        state.loadingState = LoadingStatus.LOADING
      })
      builder.addCase(fetchFood.fulfilled, (state, action) => {
        state.food = action.payload
        state.loadingState = LoadingStatus.LOADED
      })
      builder.addCase(fetchFood.rejected, (state, action) => {
        state.errorMessage = action.payload!
        state.loadingState = LoadingStatus.ERROR
      })
  },
})

export const { setFood, resetFoodState } = foodSlice.actions;

export default foodSlice.reducer;