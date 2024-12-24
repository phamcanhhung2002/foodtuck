import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderError, OrderItemResponse, OrderResponse } from "../../types/order";
import { LoadingStatus } from "../../types/types";
import { addOrder } from "./order-thunk";

export interface OrderState {
  order: Partial<OrderResponse>,
  orderItems: Array<OrderItemResponse>,
  errors: Partial<OrderError>,
  errorMessage: string
  loadingState: LoadingStatus
}

export const initialState: OrderState = {
  order: {},
  orderItems: [],
  errors: {},
  errorMessage: "",
  loadingState: LoadingStatus.LOADING
}

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderLoadingState(state, action: PayloadAction<LoadingStatus>) {
      state.loadingState = action.payload
    },
    resetOrderState: () => initialState
  },
  extraReducers(builder) {
      builder.addCase(addOrder.pending, (state) => {
        state.loadingState = LoadingStatus.LOADING
      })
      builder.addCase(addOrder.fulfilled, (state, action) => {
        state.order = action.payload
        state.loadingState = LoadingStatus.LOADED
      })
      builder.addCase(addOrder.rejected, (state, action) => {
        state.errors = action.payload!
        state.loadingState = LoadingStatus.ERROR
      })
  },
})

export const { setOrderLoadingState, resetOrderState } = orderSlice.actions

export default orderSlice.reducer;