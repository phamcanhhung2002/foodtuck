import { OrderError, OrderResponse } from "../../types/order"
import { LoadingStatus } from "../../types/types"
import { RootState } from "../store"
import { OrderState } from "./order-slice"

export const selectOrderState = (state: RootState): OrderState => state.order
export const selectOrder = (state: RootState): Partial<OrderResponse> => selectOrderState(state).order;
export const selectOrderErrors = (state: RootState): Partial<OrderError> => selectOrderState(state).errors

export const selectLoadingStatus = (state: RootState): LoadingStatus => selectOrderState(state).loadingState
export const selectIsOrderLoading = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.LOADING