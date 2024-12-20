import { FullFoodResponse } from "../../types/food";
import { LoadingStatus } from "../../types/types"

export interface FoodState {
  food: Partial<FullFoodResponse>
  loadingState: LoadingStatus;
}