import { FoodResponse } from "./food";

export interface OrderRequest {
  foodsId?: any;
  firstName?: string;
  lastName?: string;
  city?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  postIndex?: string;
}

export interface OrderResponse {
  id: number;
  totalPrice: number;
  date: string; 
  firstName: string;
  lastName: string;
  city: string;
  address: string;
  email: string;
  phoneNumber: string;
  postIndex: string;
}

export interface OrderItemResponse {
  id: number;
  amount: number;
  quantity: number;
  food: FoodResponse
}

export interface OrderError {
  emailError: string;
  firstNameError: string;
  lastNameError: string;
  cityError: string;
  addressError: string;
  postIndexError: string;
  phoneNumberError: string;
}