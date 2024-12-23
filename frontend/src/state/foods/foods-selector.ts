import { FoodResponse } from "../../types/food";
import { LoadingStatus } from "../../types/types";
import { RootState } from "../store";
import { FoodsState } from "./foods-slice";

export const selectFoodsState = (state: RootState): FoodsState => state.foods;
export const selectFoods = (state: RootState): Array<FoodResponse> => selectFoodsState(state).foods
export const selectIsFoodsLoading = (state: RootState): boolean => selectFoodsState(state).loadingState === LoadingStatus.LOADING
export const selectTotalElements = (state: RootState): number => selectFoodsState(state).totalElements