import { FullFoodResponse } from "../../types/food";
import { LoadingStatus } from "../../types/types";
import { RootState } from "../store";
import { FoodState } from "./food-slice";

export const selectFoodState = (state: RootState): FoodState => state.food
export const selectFood = (state: RootState): Partial<FullFoodResponse> => selectFoodState(state).food
export const selectFoodErrorMessage = (state: RootState): string => selectFoodState(state).errorMessage

export const selectLoadingStatus = (state: RootState): LoadingStatus => selectFoodState(state).loadingState 
export const selectIsFoodLoading = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.LOADING
export const selectIsFoodLoaded = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.LOADED
export const selectFoodError = (state: RootState): boolean => selectFoodState(state).loadingState === LoadingStatus.ERROR