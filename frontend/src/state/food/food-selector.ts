import { FoodResponse } from "../../types/food";
import { FoodsState } from "../foods/foods-slice";
import { RootState } from "../store";

export const selectFoodsState = (state: RootState): FoodsState => state.foods
export const selectFoods = (state: RootState): Array<FoodResponse> => selectFoodsState(state).foods