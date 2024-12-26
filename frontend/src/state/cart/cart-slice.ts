import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatus } from '../../types/types';
import { FoodResponse } from '../../types/food';
import { fetchCart } from './cart-thunk';

export interface CartState {
    loadingState: LoadingStatus;
    totalPrice: number;
    cartItemsCount: number;
    foods: Array<FoodResponse>;
}

export const initialState: CartState = {
    loadingState: LoadingStatus.LOADING,
    totalPrice: 0,
    cartItemsCount: 0,
    foods: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    calculateCartPrice(state, action: PayloadAction<Array<FoodResponse>>) {
        state.totalPrice = calculatePrice(action.payload)
        state.loadingState = LoadingStatus.LOADED
    },
    removeFoodById: (state, action: PayloadAction<number>) => {
       const foods = state.foods.filter((food) => food.id !== action.payload);
       state.foods = foods;
       state.totalPrice = calculatePrice(foods)
       state.loadingState = LoadingStatus.LOADED
    },
    setCartItemsCount: (state, action: PayloadAction<number>) => {
        state.cartItemsCount = action.payload;
    },
    resetCartState: (state) => {
        state.loadingState = LoadingStatus.LOADING
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
        state.loadingState = LoadingStatus.LOADING;
    })
    builder.addCase(fetchCart.fulfilled, (state, action) => {
        state.totalPrice = calculatePrice(action.payload);
        state.cartItemsCount = action.payload.length;
        state.foods = action.payload;
        state.loadingState = LoadingStatus.LOADED
    })
    
  }
})

const calculatePrice = (foods: Array<FoodResponse>): number => {
    const foodsFromLocalStorage: Map<number, number> = new Map(JSON.parse(localStorage.getItem("foods") as string));
    let total = 0;

    foodsFromLocalStorage.forEach((value, key) => {
        const food = foods.find((food) => food.id === key);

        if (food) {
            total += food.price * value;
        }
    })

    return total;
}

// Action creators are generated for each case reducer function
export const { calculateCartPrice, removeFoodById, setCartItemsCount, resetCartState } = cartSlice.actions

export default cartSlice.reducer