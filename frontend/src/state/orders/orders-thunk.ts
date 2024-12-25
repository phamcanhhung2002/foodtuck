import { createAsyncThunk } from "@reduxjs/toolkit";
import { HeaderResponse, PagingRequest } from "../../types/types";
import { OrderResponse } from "../../types/order";
import RequestService from "../../utils/request-service";
import { ORDER } from "../../constants/urlConstants";

export const fetchUserOrders = createAsyncThunk<HeaderResponse<OrderResponse>, PagingRequest>(
  "orders/fetchUserOrders",
  async ({ page, size }) => {
    const response = await RequestService.get(`${ORDER}?page=${page}&size=${size}`, true);
    return {
      items: response.data,
      pagesCount: parseInt(response.headers["page-total-count"]),
      totalElements: parseInt(response.headers["page-total-elements"])
    }
  }
)