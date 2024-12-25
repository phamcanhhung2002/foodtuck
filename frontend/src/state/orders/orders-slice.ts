import { createSlice } from "@reduxjs/toolkit";
import { OrderResponse } from "../../types/order";
import { LoadingStatus } from "../../types/types";
import { fetchUserOrders } from "./orders-thunk";

export interface OrdersState {
  orders: Array<OrderResponse>;
  pagesCount: number;
  totalElements: number;
  loadingState: LoadingStatus;
}

export const initialState: OrdersState = {
  orders: [],
  pagesCount: 1,
  totalElements: 0,
  loadingState: LoadingStatus.LOADING
}

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrders: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserOrders.pending, (state) => {
      state.loadingState = LoadingStatus.LOADING
    });
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload.items;
      state.pagesCount = action.payload.pagesCount;
      state.totalElements = action.payload.totalElements;
      state.loadingState = LoadingStatus.LOADED
    })
  }
})

export const { resetOrders } = ordersSlice.actions;

export default ordersSlice.reducer