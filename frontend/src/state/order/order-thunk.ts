import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderError, OrderItemResponse, OrderRequest, OrderResponse } from "../../types/order";
import { NavigateFunction } from "react-router-dom";
import RequestService from "../../utils/request-service";
import { ORDER_FINALIZE } from "../../constants/routeConstants";
import { ORDER } from "../../constants/urlConstants";

export const addOrder = createAsyncThunk<
  OrderResponse,
  { order: OrderRequest; navigate: NavigateFunction},
  { rejectValue: OrderError}
>("order/addOrder", async ({ order, navigate}, thunkApi) => {
  try {
    const response = await RequestService.post(ORDER, order);
    navigate(ORDER_FINALIZE)
    localStorage.removeItem("foods")
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data)
  }
})

export const fetchOrderById = createAsyncThunk<OrderResponse, string, { rejectValue: string }>(
  "order/fetchOrderById",
  async (orderId, thunkApi) => {
    try {
      const response = await RequestService.get(`${ORDER}/${orderId}`, true)
      return response.data
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
)

export const fetchOrderItemsByOrderId = createAsyncThunk<Array<OrderItemResponse>, string>(
  "order/fetchOrderItemsByOrderId",
  async (orderId) => {
    const response = await RequestService.get(`${ORDER}/${orderId}/items`, true)
    return response.data
  }
)